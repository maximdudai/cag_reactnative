import { StyleSheet, Switch } from "react-native";
import { defaultStyles } from "./styles/main";

type ToggleProps = {
    isActive?: boolean;
    onToggle?: () => void;
}

export default function Toggle({
    isActive = false,
    onToggle
}: ToggleProps) {
    return (
        <Switch
            value={isActive}
            onValueChange={onToggle}
            style={styles.toggleButton}
            thumbColor='#ffffff'
            trackColor={{ 
                false: '#767577', 
                true: defaultStyles.PRIMARY_COLOR 
            }}
        />
    )
}
const styles = StyleSheet.create({
    toggleButton: {
        marginRight: 20,
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
});