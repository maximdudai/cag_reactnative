
import { Modal as RNModal, StyleSheet, View } from 'react-native';

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    content: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Modal({
    isVisible,
    onClose,
    content,
    footer
}: ModalProps) {

    return (
        <RNModal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}

        >
            <View
                style={style.modalContainer}
            >
                <View
                    style={style.modalContent}
                >
                    {content}
                    {
                        footer && (
                            <View>
                                {footer}
                            </View>
                        )
                    }
                </View>
            </View>
        </RNModal>
    )
}

const style = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'relative',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        height: 'auto',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})