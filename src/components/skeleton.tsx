import { View, StyleSheet, Animated } from "react-native";
import { defaultStyles } from "./styles/main";
import { useEffect, useRef } from "react";

export default function Skeleton() {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <View style={style.container}>
            <View style={style.itemContainer}>
                <Animated.View style={[style.itemImage, { opacity }]} />
                <View style={style.itemDetails}>
                    <Animated.View style={[style.textLine, { opacity }]} />
                    <Animated.View style={[style.textLine, style.mediumLine, { opacity }]} />
                    <Animated.View style={[style.textLine, style.shortLine, { opacity }]} />
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: defaultStyles.MEDIUM_MARGIN,
        backgroundColor: '#484848',
        borderRadius: 8,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: defaultStyles.MEDIUM_MARGIN,
    },
    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#606060',
    },
    itemDetails: {
        width: '100%',
        justifyContent: 'center',
    },
    textLine: {
        height: 16,
        backgroundColor: '#606060',
        borderRadius: 4,
        marginTop: defaultStyles.SMALL_MARGIN,
        width: '50%',
    },
    mediumLine: {
        width: '40%',
    },
    shortLine: {
        width: '30%',
    },
});