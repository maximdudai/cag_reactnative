import { createContext, useEffect, useMemo, useState } from "react";
import vehicleMockData from "../data/vehicles.json";
import { getListOfFavoriteVehicles, initializeFavoriteVehicles } from "../tools/storage";
import { Vehicle } from "../types/Vehicle";

export const VehicleDataContext = createContext([] as any);

export default function VehicleDataProvider({
    children
}: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
    const [favoriteVehicles, setFavoriteVehicles] = useState<string[]>([]);

    const vehicleDataWithIds = useMemo(() =>
        vehicleMockData.map((vehicle, index) => ({
            ...vehicle,
            id: `vehicle-${index}`
        })),
        []
    );

    useEffect(() => {
        setIsLoading(true);
        setVehicleData(vehicleDataWithIds);

        const initializeFavorites = async () => {
            const storedFavorites = await getListOfFavoriteVehicles();

            const defaultFavorites = vehicleDataWithIds
                .filter(vehicle => vehicle.favourite)
                .map(veh => veh.id);

            const updatedList = Array.from(new Set([...storedFavorites, ...defaultFavorites]));

            setFavoriteVehicles(updatedList);
            await initializeFavoriteVehicles(updatedList);

            // Update vehicle data to reflect favorite status
            setVehicleData(prevData =>
                prevData.map(veh => ({
                    ...veh,
                    favourite: updatedList.includes(veh.id || '')
                }))
            );
            const randomBetweenTwoAndFive = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
            setTimeout(() => setIsLoading(false), randomBetweenTwoAndFive * 1000);
        };

        initializeFavorites();
    }, [vehicleDataWithIds]);

    const updateVehicleData = (vehicle: Vehicle) => {
        setVehicleData((prevData) =>
            prevData.map((veh) => veh.id === vehicle.id ? vehicle : veh)
        );
    }

    return (
        <VehicleDataContext.Provider
            value={{
                isLoading,
                vehicleData,
                favoriteVehicles,
                setVehicleData,
                setIsLoading,
                setFavoriteVehicles,
                updateVehicleData
            }}
        >
            {children}
        </VehicleDataContext.Provider>
    )
}