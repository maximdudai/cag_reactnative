import { createContext, useState } from "react";

import vehicleMockData from "../data/vehicles.json";

export const VehicleDataContext = createContext([] as any);

export default function VehicleDataProvider({
    children
}: { children: React.ReactNode }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vehicleData, setVehicleData] = useState<any>(vehicleMockData);

    
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