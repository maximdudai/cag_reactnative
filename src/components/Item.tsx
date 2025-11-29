import { Image, Text, TouchableOpacity, View } from "react-native";
import calculateDaysAndHours from "../tools/date";

type ItemProps = {
    auctionDateTime: string;
    imageUrl?: string;
    onPressItem?: () => void;
}

const PLACEHOLEDER_IMAGE = "https://placehold.co/150x150?text=Placeholder+Image&font=roboto";

export default function Item({
    auctionDateTime,
    onPressItem,
    imageUrl = PLACEHOLEDER_IMAGE
}: ItemProps) {

    const { days, hours } = calculateDaysAndHours(auctionDateTime);

    return (
        <View style={style.itemContainer}>
            <TouchableOpacity onPress={onPressItem}>
                <Image source={{ uri: imageUrl }} style={style.itemImage} />
                <Text style={style.itemText}>{days} days and {hours} hours</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = {
    itemContainer: {
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        margin: 16,
        backgroundColor: '#484848',
        padding: 16,
        borderRadius: 8
    },
    itemImage: {
        width: 150,
        height: 150,
    },
    itemText: {
        fontSize: 16,
        color: 'white',
        marginTop: 8
    }
}