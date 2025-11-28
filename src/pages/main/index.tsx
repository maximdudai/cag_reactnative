import { FlatList, Text, View } from "react-native";
import Item from "../../components/Item";
import { VehicleDataContext } from "../../context/DataContext";
import React, { useCallback, useContext } from "react";

export default function MainPage() {
    const {
        isLoading,
        vehicleData
    } = useContext(VehicleDataContext);


    const handlePressItem = useCallback((item: any) => {
        console.log("Item pressed", item);
    }, []);

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
                    key={item.id}
                    auctionDateTime={item.auctionDateTime}
                    imageUrl={item.imageUrl}
                    onPressItem={() => handlePressItem(item)}
                    isFavorite={item.favourite}
                />
            }
            keyboardDismissMode="on-drag"
        />
    )
}