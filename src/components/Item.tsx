import { Image, Text, View } from "react-native";
import calculateDaysAndHours from "../tools/date";

type ItemProps = {
    auctionDateTime: string;
    imageUrl?: string;
}

const PLACEHOLEDER_IMAGE = "https://via.placeholder.com/150";

export default function Item({
    auctionDateTime,
    imageUrl = PLACEHOLEDER_IMAGE
}: ItemProps) {

    const { days, hours } = calculateDaysAndHours(auctionDateTime);

    return (
        <View>
            <Image source={{ uri: imageUrl }} style={style.itemImage} />
            <Text>{days} days and {hours} hours</Text>
        </View>
    )
}

const style = {
    itemImage: {
        width: 150,
        height: 150
    }
}