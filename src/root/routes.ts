import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Vehicle } from "../types/Vehicle";

export enum AppRoutes {
    HOME = 'Home',
    DETAILS = 'Details',
}

export type RootStackParamList = {
    [AppRoutes.HOME]: undefined;
    [AppRoutes.DETAILS]: {
        vehicle: Vehicle
    };
};

export type MainRouteProps = NativeStackNavigationProp<RootStackParamList, AppRoutes.HOME>;
export type DetailsRouteProp = RouteProp<RootStackParamList, AppRoutes.DETAILS>;