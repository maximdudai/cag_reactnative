import { FlatList, Text, View } from "react-native";
import Item from "../../components/Item";
import { VehicleDataContext } from "../../context/DataContext";
import React, { useCallback, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes, MainRouteProps } from "../../root/routes";
import { Vehicle } from "../../types/Vehicle";

export default function MainPage() {
    const {
        isLoading,
        vehicleData
    } = useContext(VehicleDataContext);

    const navigation = useNavigation<MainRouteProps>();


    const handlePressItem = useCallback((vehicle: Vehicle) => {
        navigation.navigate(AppRoutes.DETAILS, {
            vehicle: vehicle
        });
    }, [navigation]);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <FlatList
            data={vehicleData}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <Item
                    auctionDateTime={item.auctionDateTime}
                    imageUrl={item.imageUrl}
                    onPressItem={() => handlePressItem(item)}
                />
            }
            keyboardDismissMode="on-drag"
        />
    )
}