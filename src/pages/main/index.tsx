import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { FlatList, Text, View } from "react-native";
import Item from "../../components/Item";
import { VehicleDataContext } from "../../context/DataContext";
import { AppRoutes, MainRouteProps } from "../../root/routes";

export default function MainPage() {
    const {
        isLoading,
        vehicleData
    } = useContext(VehicleDataContext);

    const navigation = useNavigation<MainRouteProps>();


    const handlePressItem = useCallback((vehicleId: string) => {
        navigation.navigate(AppRoutes.DETAILS, {
            vehicleId: vehicleId
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
                    key={`${item.model}-${item.mileage}-${item.id}`}
                    auctionDateTime={item.auctionDateTime}
                    imageUrl={item.imageUrl}
                    onPressItem={() => handlePressItem(item.id)}
                />
            }
            keyboardDismissMode="on-drag"
        />
    )
}