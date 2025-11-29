import { useRoute } from "@react-navigation/native";
import { DetailsRouteProp } from "../../root/routes";
import { Text, View } from "react-native";

export default function Details() {
    const route = useRoute<DetailsRouteProp>();
    const { vehicle } = route.params;


    return (
        <View>
            <Text>{vehicle.id}</Text>
            <Text>{vehicle.make} {vehicle.model}</Text>
            <Text>Engine Size: {vehicle.engineSize}</Text>
            <Text>Fuel: {vehicle.fuel}</Text>
            <Text>Year: {vehicle.year}</Text>
            <Text>Mileage: {vehicle.mileage}</Text>
            <Text>Auction Date & Time: {vehicle.auctionDateTime}</Text>
            <Text>Starting Bid: ${vehicle.startingBid}</Text>
            <Text>Favourite: {vehicle.favourite ? 'Yes' : 'No'}</Text>
            {vehicle.imageUrl && <Text>Image URL: {vehicle.imageUrl}</Text>}
        </View>
    );
}