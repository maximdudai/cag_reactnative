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
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        marginVertical: 6,
        marginHorizontal: defaultStyles.MEDIUM_MARGIN,
        overflow: 'hidden',
        height: 110,
    },
    itemImage: {
        width: 120,
        height: '100%',
        backgroundColor: '#1a1a1a',
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
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        flex: 1,
    },
    favoriteIcon: {
        fontSize: 18,
        color: '#FFD700',
        marginLeft: 8,
    },
    detailText: {
        fontSize: 13,
        color: '#aaa',
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeDisplay: {
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    timeValue: {
        fontSize: 13,
        fontWeight: '600',
        color: defaultStyles.PRIMARY_COLOR,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
    },
});