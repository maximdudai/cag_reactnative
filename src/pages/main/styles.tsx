import { StyleSheet } from 'react-native';
import { defaultStyles } from '../../components/styles/main';

export const styles = ({

}) => StyleSheet.create({
    listEmptyComponent: {
        alignItems: 'center',
        marginTop: 50,
    },
    filterButtonContainer: {
        padding: defaultStyles.LARGE_MARGIN,
    },
    modalContainer: {
        display: 'flex',
        gap: defaultStyles.MEDIUM_MARGIN,
    },
    modalBody: {
        marginVertical: defaultStyles.MEDIUM_MARGIN,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10
    },
    filterContainer: {
        marginBottom: defaultStyles.LARGE_MARGIN,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: defaultStyles.SMALL_MARGIN,
        borderRadius: 5,
    },
    filterLabel: {
        fontSize: defaultStyles.FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
    },
    inlineStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export const pickerStyle = {
    inputAndroid: {
        fontSize: defaultStyles.FONT_SIZE_SMALL,
        borderWidth: 1,
        borderColor: 'gray',
        color: 'black',
    },
    inputAndroidContainer: {
        // Add container styles here
    },
    iconContainer: {
        top: 20,
        right: 10,
        color: defaultStyles.PRIMARY_COLOR,
    },
    placeholder: {
        color: 'gray',
    },
};
