import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Item from "../../components/Item";
import Skeleton from "../../components/skeleton";
import { VehicleDataContext } from "../../context/DataContext";
import { AppRoutes, MainRouteProps } from "../../root/routes";

export default function MainPage() {
    const {
        isLoading,
        vehicleData,
        setIsLoading,
    } = useContext(VehicleDataContext);
    const navigation = useNavigation<MainRouteProps>();
    const [isRefreshing, setIsRefreshing] = useState(false);


    const handlePressItem = useCallback((vehicleId: string) => {
        navigation.navigate(AppRoutes.DETAILS, {
            vehicleId: vehicleId
        });
    }, [navigation]);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setIsLoading(true);
        
        // Simulate a refresh action
        setTimeout(() => {
            setIsRefreshing(false);
            setIsLoading(false);
        }, 2000);
    }, [setIsLoading]);

    if (isLoading) {
        return (
            <>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} />
                ))}
            </>
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
                    isFavorite={item.favourite}
                />
            }
            keyboardDismissMode="on-drag"
            ListEmptyComponent={
                <View>
                    <Text>No vehicles available</Text>
                </View>
            }
            showsVerticalScrollIndicator={false}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
        />
    )
}