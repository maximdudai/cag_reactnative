import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import calculateDaysAndHours from "../tools/date";
import { defaultStyles } from "./styles/main";
import { Vehicle } from "../types/Vehicle";
import { formatCurrency } from "../tools/number";


const PLACEHOLEDER_IMAGE = "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088037.jpg";

export default function Item({
    vehicleData,
    onPressItem,
}: {
    vehicleData: Vehicle,
    onPressItem: () => void,
}) {

    const { days, hours } = calculateDaysAndHours(vehicleData.auctionDateTime);
    const startingBidPrice = formatCurrency(vehicleData.startingBid);

    return (
        <TouchableOpacity onPress={onPressItem} style={style.container}>
            <Image source={{ uri: vehicleData.imageUrl || PLACEHOLEDER_IMAGE }} style={style.itemImage} />
            
            <View style={style.contentContainer}>
                <View style={style.titleRow}>
                    <Text style={style.vehicleTitle} numberOfLines={1}>
                        {vehicleData.make} {vehicleData.model}
                    </Text>
                    {vehicleData.favourite && (
                        <Text style={style.favoriteIcon}>★</Text>
                    )}
                </View>

                <Text style={style.detailText}>{vehicleData.year} - {vehicleData.fuel} - {vehicleData.engineSize}</Text>
                <Text style={style.detailText}>{vehicleData.mileage.toLocaleString()} mi</Text>

                <View style={style.bottomRow}>
                    <View style={style.timeDisplay}>
                        <Text style={style.timeValue}>{days}d : {hours}h</Text>
                    </View>
                    <Text style={style.priceText}>{startingBidPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: defaultStyles.BACKGROUND_DARK,
        borderRadius: defaultStyles.BORDER_RADIUS_MEDIUM,
        marginVertical: 6,
        marginHorizontal: defaultStyles.MEDIUM_MARGIN,
        overflow: 'hidden',
        height: 110,
    },
    itemImage: {
        width: 120,
        height: '100%',
        backgroundColor: defaultStyles.BACKGROUND_DARKER,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vehicleTitle: {
        fontSize: defaultStyles.FONT_SIZE_MEDIUM,
        fontWeight: '600',
        color: defaultStyles.TEXT_PRIMARY,
        flex: 1,
    },
    favoriteIcon: {
        fontSize: 18,
        color: defaultStyles.ACCENT_GOLD,
        marginLeft: defaultStyles.SMALL_MARGIN,
    },
    detailText: {
        fontSize: 13,
        color: defaultStyles.TEXT_SECONDARY,
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeDisplay: {
        backgroundColor: defaultStyles.BACKGROUND_DARKER,
        paddingHorizontal: defaultStyles.SMALL_MARGIN,
        paddingVertical: 4,
        borderRadius: defaultStyles.BORDER_RADIUS_SMALL,
    },
    timeValue: {
        fontSize: 13,
        fontWeight: '600',
        color: defaultStyles.PRIMARY_COLOR,
    },
    priceText: {
        fontSize: defaultStyles.FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
        color: defaultStyles.ACCENT_GOLD,
    },
});