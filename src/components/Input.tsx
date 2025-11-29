import { Text, TextInput } from "react-native";

type InputProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

export default function Input({
    label,
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default'
}: InputProps) {

    return (
        <>
            {
                label &&
                <Text>
                    {label}
                </Text>
            }
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </>
    );
}