import { FlatList, Text, View } from "react-native";
import Item from "../../components/Item";
import { VehicleDataContext } from "../../context/DataContext";
import React, { useCallback, useContext } from "react";

export default function MainPage() {
    const {
        isLoading,
        vehicleData
    } = useContext(VehicleDataContext);

    console.log("Vehicle Data:", vehicleData);

    

    const handlePressItem = useCallback(() => {
        console.log("Item pressed");
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
                    auctionDateTime={item.auctionDateTime}
                    imageUrl={item.imageUrl}
                    onPressItem={handlePressItem}
                />
            }
            keyboardDismissMode="on-drag"
        />
    )
}