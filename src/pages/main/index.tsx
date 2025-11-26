import { FlatList, Text, View } from "react-native";
import Item from "../../components/Item";
import { VehicleDataContext } from "../../context/DataContext";
import React, { useContext } from "react";

export default function MainPage() {

    const {
        isLoading,
        vehicleData
    } = useContext(VehicleDataContext);

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
                <Item auctionDateTime={item.auctionDateTime} imageUrl={item.imageUrl} />
            }
            keyboardDismissMode="on-drag"
        />
    )
}