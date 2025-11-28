import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import calculateDaysAndHours from "../tools/date";
import { defaultStyles } from "./styles/main";

type ItemProps = {
    auctionDateTime: string;
    imageUrl?: string;
    onPressItem?: () => void;
    isFavorite?: boolean;
}

const PLACEHOLEDER_IMAGE = "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088037.jpg";

export default function Item({
    auctionDateTime,
    onPressItem,
    imageUrl = PLACEHOLEDER_IMAGE,
    isFavorite
}: ItemProps) {

    const { days, hours } = calculateDaysAndHours(auctionDateTime);

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={onPressItem} style={style.itemContainer}>
                <Image source={{ uri: imageUrl }} style={style.itemImage} />
                <View style={style.itemDetails}>
                    <Text style={style.itemText}>Bid starts in</Text>
                    <Text style={style.itemText}>Days: {days}</Text>
                    <Text style={style.itemText}>Hours: {hours}</Text>
                    {
                        isFavorite &&
                        <Text style={style.favoriteBadge}>
                            favorite
                        </Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: defaultStyles.MEDIUM_MARGIN,
        backgroundColor: '#484848',
        borderRadius: 8
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: defaultStyles.MEDIUM_MARGIN,
    },
    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 8
    },
    itemText: {
        fontSize: 16,
        color: 'white',
        marginTop: defaultStyles.SMALL_MARGIN
    },
    itemDetails: {
        position: 'relative',
        width: '100%',
    },
    favoriteBadge: {
        position: 'absolute',
        bottom: 0,
        right: 165,
        padding: 4,
        backgroundColor: '#FFD700',
        borderBottomRightRadius: 8,
        fontSize: defaultStyles.FONT_SIZE_SMALL,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});