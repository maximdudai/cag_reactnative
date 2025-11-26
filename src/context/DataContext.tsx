import { createContext, useEffect, useState } from "react";

export const VehicleDataContext = createContext([] as any);

export default function VehicleDataProvider({
    children
}: { children: React.ReactNode }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vehicleData, setVehicleData] = useState<any>(null);

    useEffect(() => {

        const loadJSONFile = async() => {
            setIsLoading(true);
            const vehiclesMockData = '../data/vehicles.json';

            fetch(vehiclesMockData)
                .then((response) => response.json())
                .then((data) => {
                    setVehicleData(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error loading vehicle data:", error);
                    setIsLoading(false);
                });
        }

        loadJSONFile();

        return () => {
            setVehicleData(null);
        }
    }, []);

    return (
        <VehicleDataContext.Provider 
            value={{ 
                isLoading,
                vehicleData
            }}
        >
            {children}
        </VehicleDataContext.Provider>
    )
}