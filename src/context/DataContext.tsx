import { createContext, useState, useMemo, useEffect } from "react";
import vehicleMockData from "../data/vehicles.json";

export const VehicleDataContext = createContext([] as any);

export default function VehicleDataProvider({
    children
}: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vehicleData, setVehicleData] = useState({});
    
    const vehicleDataWithIds = useMemo(() => 
        vehicleMockData.map((vehicle, index) => ({
            ...vehicle,
            id: `vehicle-${index}`
        })),
        []
    );
    
    useEffect(() => {
        setVehicleData(vehicleDataWithIds);
    }, [vehicleDataWithIds]);

    return (
        <VehicleDataContext.Provider 
            value={{ 
                isLoading,
                vehicleData,
                setVehicleData,
                setIsLoading
            }}
        >
            {children}
        </VehicleDataContext.Provider>
    )
}