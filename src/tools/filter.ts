import { Vehicle } from "../types/Vehicle";

type FilterFields = {
    make?: string;
    model?: string;
    startingBidRange?: {
        min?: number | null;
        max?: number | null;
    };
    onlyFavourites?: boolean;
}

type FilterTypes = {
    vehicleData: Vehicle[];
    filterList: FilterFields;
    favoriteVehicles: string[];
}

export default function filterVehicleList({
    vehicleData,
    filterList,
    favoriteVehicles
}: FilterTypes): Vehicle[] {
    return vehicleData.filter((vehicle: Vehicle) => {
        const matchesMake = filterList.make ? vehicle.make === filterList.make : true;
        
        const matchesModel = filterList.model ? vehicle.model === filterList.model : true;
        
        const matchesStartingBidMin = filterList.startingBidRange?.min != null
            ? vehicle.startingBid >= filterList.startingBidRange.min
            : true;
        const matchesStartingBidMax = filterList.startingBidRange?.max != null
            ? vehicle.startingBid <= filterList.startingBidRange.max
            : true;
        
        const matchesFavourite = filterList.onlyFavourites
            ? favoriteVehicles.includes(vehicle.id || '')
            : true;
        
        return matchesMake && matchesModel && matchesStartingBidMin && matchesStartingBidMax && matchesFavourite;
    });
}