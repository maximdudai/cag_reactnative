import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { defaultStyles } from "./styles/main";

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

type ButtonProps = {
    content: string;
    onPress: () => void;
    isDisabled?: boolean;
    type?: ButtonType;
}

export default function Button({
    content,
    onPress,
    isDisabled = false,
    type = ButtonType.PRIMARY
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            style={style({ 
                isPrimary: type === ButtonType.PRIMARY,
                isSecondary: type === ButtonType.SECONDARY 
            }).button}
        >
            <Text style={style({ 
                isPrimary: type === ButtonType.PRIMARY,
                isSecondary: type === ButtonType.SECONDARY 
            }).text}>{content}</Text>
        </TouchableOpacity>
    )
}

type StyleProps = {
    isPrimary: boolean;
    isSecondary: boolean;
}
const style = ({
    isPrimary,
    isSecondary
}: StyleProps) => StyleSheet.create({
    button: {
        backgroundColor: isPrimary ? defaultStyles.PRIMARY_COLOR : '#ffffff',
        borderWidth: isSecondary ? 1 : 0,
        borderColor: defaultStyles.PRIMARY_COLOR,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: isPrimary ? '#ffffff' : defaultStyles.PRIMARY_COLOR,
        fontSize: 16,
    }
})