import { createContext, useEffect, useState } from "react";
import { getListOfFavoriteVehicles, initializeFavoriteVehicles } from "../tools/storage";
import { Vehicle } from "../types/Vehicle";

export const VehicleDataContext = createContext([] as any);

export default function VehicleDataProvider({
    children
}: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
    const [favoriteVehicles, setFavoriteVehicles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const vehicleMockData = await import("../data/vehicles.json");
                const data = vehicleMockData.default || vehicleMockData;

                const vehicleDataWithIds = data.map((vehicle: Vehicle, index: number) => ({
                    ...vehicle,
                    id: `vehicle-${index}`
                }));

                const storedFavorites = await getListOfFavoriteVehicles();

                const defaultFavorites = vehicleDataWithIds
                    .filter((vehicle: any) => vehicle.favourite)
                    .map((veh: any) => veh.id);

                const updatedList = Array.from(new Set([...storedFavorites, ...defaultFavorites]));

                setFavoriteVehicles(updatedList);
                await initializeFavoriteVehicles(updatedList);

                const finalData = vehicleDataWithIds.map((veh: Vehicle) => ({
                    ...veh,
                    favourite: updatedList.includes(veh.id || '')
                }));

                setVehicleData(finalData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load vehicle data');
                console.error('Error loading vehicle data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const updateVehicleData = (vehicle: Vehicle) => {
        setVehicleData((prevData) =>
            prevData.map((veh) => veh.id === vehicle.id ? vehicle : veh)
        );
    };

    return (
        <VehicleDataContext.Provider
            value={{
                isLoading,
                vehicleData,
                favoriteVehicles,
                error,
                setVehicleData,
                setIsLoading,
                setFavoriteVehicles,
                updateVehicleData
            }}
        >
            {children}
        </VehicleDataContext.Provider>
    );
}