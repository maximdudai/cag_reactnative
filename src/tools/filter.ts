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
    const hasFilters = 
        filterList.make ||
        filterList.model ||
        filterList.startingBidRange?.min != null ||
        filterList.startingBidRange?.max != null ||
        filterList.onlyFavourites;

    if (!hasFilters) {
        return vehicleData;
    }

    const shouldFilterMake = !!filterList.make;
    const shouldFilterModel = !!filterList.model;
    const shouldFilterMinBid = filterList.startingBidRange?.min != null;
    const shouldFilterMaxBid = filterList.startingBidRange?.max != null;
    const shouldFilterFavourites = !!filterList.onlyFavourites;

    const favoritesSet = shouldFilterFavourites 
        ? new Set(favoriteVehicles) 
        : null;

    return vehicleData.filter((vehicle: Vehicle) => {
        if (shouldFilterMake && vehicle.make !== filterList.make) {
            return false;
        }
        
        if (shouldFilterModel && vehicle.model !== filterList.model) {
            return false;
        }
        
        if (shouldFilterMinBid && vehicle.startingBid < filterList.startingBidRange!.min!) {
            return false;
        }
        
        if (shouldFilterMaxBid && vehicle.startingBid > filterList.startingBidRange!.max!) {
            return false;
        }
        
        if (shouldFilterFavourites && !favoritesSet!.has(vehicle.id ?? '')) {
            return false;
        }
        
        return true;
    });
}