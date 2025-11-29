import AsyncStorage from "@react-native-async-storage/async-storage";

enum StorageKeys {
    FAVORITE_VEHICLES = 'favoriteVehicles'
}

export async function addVehicleToFavorite(vehicleId: string): Promise<boolean> {
    try {

        const isFavorite = await isVehicleFavorite(vehicleId);

        if (isFavorite) {
            await removeVehicleFromFavorite(vehicleId);
            return false;
        }

        const favoriteVehicles = await AsyncStorage.getItem(StorageKeys.FAVORITE_VEHICLES);

        let favoriteVehiclesList: Record<string, boolean> = {};
        if (favoriteVehicles) {
            favoriteVehiclesList = JSON.parse(favoriteVehicles);
        }
        favoriteVehiclesList[vehicleId] = true;

        await AsyncStorage.setItem(StorageKeys.FAVORITE_VEHICLES, JSON.stringify(favoriteVehiclesList));
        return true;
    } catch (error) {
        console.error("Error adding vehicle to favorites:", error);
        return false;
    }
}

export default async function removeVehicleFromFavorite(vehicleId: string): Promise<boolean> {
    try {

        const favoriteVehicles = await AsyncStorage.getItem(StorageKeys.FAVORITE_VEHICLES);

        if (!favoriteVehicles)
            return false;

        const favoriteVehiclesList = JSON.parse(favoriteVehicles) as Record<string, boolean>;
        delete favoriteVehiclesList[vehicleId];
        await AsyncStorage.setItem(StorageKeys.FAVORITE_VEHICLES, JSON.stringify(favoriteVehiclesList));
        return true;

    } catch (error) {
        console.error("Error removing vehicle from favorites:", error);
        return false;
    }
}

export async function getListOfFavoriteVehicles(): Promise<string[]> {
    try {
        const favoriteVehicles = await AsyncStorage.getItem(StorageKeys.FAVORITE_VEHICLES);
        if (!favoriteVehicles)
            return [];
        
        const favoriteVehiclesList = JSON.parse(favoriteVehicles) as Record<string, boolean>;
        return Object.keys(favoriteVehiclesList).filter(id => favoriteVehiclesList[id]);
    } catch (error) {
        console.error("Error retrieving favorite vehicles:", error);
        return [];
    }
}

export async function isVehicleFavorite(vehicleId: string): Promise<boolean> {
    try {
        const favoriteVehicles = await AsyncStorage.getItem(StorageKeys.FAVORITE_VEHICLES);
        if (!favoriteVehicles)
            return false;

        const favoriteVehiclesList = JSON.parse(favoriteVehicles) as Record<string, boolean>;
        return !!favoriteVehiclesList[vehicleId];
    } catch (error) {
        console.error("Error checking if vehicle is favorite:", error);
        return false;
    }
}

export async function initializeFavoriteVehicles(vehicleIds: string[]): Promise<void> {
    try {
        
        const favoriteVehicleList = new Map();

        vehicleIds.forEach(id => {
            favoriteVehicleList.set(id, true);
        });

        const favoriteVehiclesList = Object.fromEntries(favoriteVehicleList);

        console.log('Storing initial favorite vehicles:', favoriteVehiclesList);

        await AsyncStorage.setItem(StorageKeys.FAVORITE_VEHICLES, JSON.stringify(favoriteVehiclesList));
    } catch (error) {
        console.error("Error initializing favorite vehicles:", error);
    }
}