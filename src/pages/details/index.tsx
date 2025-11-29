import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DetailsRouteProp } from "../../root/routes";
import { formatCurrency } from "../../tools/number";

const IMAGE_URL = 'https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088037.jpg';

export default function Details() {
    const route = useRoute<DetailsRouteProp>();
    const { vehicle } = route.params;
    const vehicleStartingBid = formatCurrency(vehicle.startingBid);

    const detailSections = [
        { title: 'Favourite', value: vehicle.favourite ? 'Yes' : 'No' },
        { title: 'Vehicle Make', value: vehicle.make },
        { title: 'Vehicle Model', value: vehicle.model },
        { title: 'Engine Size', value: vehicle.engineSize },
        { title: 'Fuel Type', value: vehicle.fuel },
        { title: 'Year', value: vehicle.year },
        { title: 'Mileage', value: vehicle.mileage },
        { title: 'Auction Date and Time', value: vehicle.auctionDateTime },
        { title: 'Starting Bid', value: vehicleStartingBid },
        { 
            title: 'Vehicle Description', 
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' 
        },
        { 
            title: 'Vehicle History', 
            value: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' 
        },
        { 
            title: 'Condition Report', 
            value: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.' 
        },
        { 
            title: 'Additional Features', 
            value: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.' 
        },
        { 
            title: 'Seller Notes', 
            value: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.' 
        },
    ];

    return (
        <View>
            <ScrollView>
                <View style={style.container}>
                    <Image
                        source={{ uri: vehicle.imageUrl || IMAGE_URL }}
                        style={style.vehicleBanner}
                    />
                    <View style={style.vehicleInformation}>
                        {detailSections.map((section, index) => (
                            <View key={index} style={style.vehicleInformationItem}>
                                <Text style={style.itemTitle}>{section.title}</Text>
                                <Text style={style.itemDescription}>{section.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={style.floatButton}>
                <Text>
                    {
                        vehicle.favourite ? 'Unfollow' : 'Follow'
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    vehicleBanner: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    vehicleInformation: {
        marginTop: 16,
    },
    vehicleInformationItem: {
        backgroundColor: '#484848',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    itemDescription: {
        fontSize: 14,
        color: 'white',
        marginTop: 4,
    },
    floatButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#FFA500',
        padding: 16,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    }
})