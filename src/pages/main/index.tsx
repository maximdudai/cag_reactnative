import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Button, { ButtonType } from "../../components/Button";
import Item from "../../components/Item";
import Modal from "../../components/Modal";
import Skeleton from "../../components/Skeleton";
import Toggle from "../../components/Toggle";
import { VehicleDataContext } from "../../context/DataContext";
import { AppRoutes, MainRouteProps } from "../../root/routes";
import filterVehicleList from "../../tools/filter";
import { Vehicle } from "../../types/Vehicle";
import { FilterFields, ModalContentProps, ModalFooterProps } from "./props";
import { pickerStyle, styles } from "./styles";
import Input from "../../components/Input";


export default function MainPage() {
    const {
        isLoading,
        vehicleData: originalVehicleData,
        favoriteVehicles,
        setIsLoading,
    } = useContext(VehicleDataContext);
    const navigation = useNavigation<MainRouteProps>();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [filteredVehicleData, setFilteredVehicleData] = useState(originalVehicleData);

    const [filterList, setFilterList] = useState({
        make: '',
        model: '',
        startingBidRange: {
            min: null as number | null,
            max: null as number | null
        },
        onlyFavourites: false
    })


    const handlePressItem = useCallback((vehicleId: string) => {
        navigation.navigate(AppRoutes.DETAILS, {
            vehicleId: vehicleId
        });
    }, [navigation]);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setIsLoading(true);

        // Simulate a refresh action
        setTimeout(() => {
            setIsRefreshing(false);
            setIsLoading(false);
        }, 2000);
    }, [setIsLoading]);

    const handleFilterModal = useCallback(() => {
        // Placeholder for filter modal logic
        setIsFilterModalVisible(true);
    }, []);

    const uniqueVehicleMakes = useMemo<string[]>(() => (
        Array.from(new Set(originalVehicleData?.map((vehicle: Vehicle) => vehicle.make)))
    ), [originalVehicleData]);

    const uniqueVehicleModels = useMemo<string[]>(() => {
        if (!filterList.make) return [];

        return Array.from(new Set(
            originalVehicleData
                ?.filter((vehicle: Vehicle) => vehicle.make === filterList.make)
                .map((vehicle: Vehicle) => vehicle.model)
        ));
    }, [originalVehicleData, filterList.make]);

    useEffect(() => {
        const getFilteredVehicleList = filterVehicleList({
            vehicleData: originalVehicleData,
            filterList,
            favoriteVehicles
        })

        setFilteredVehicleData(getFilteredVehicleList);
    }, [filterList, originalVehicleData, favoriteVehicles]);

    const handleChangeFilters = useCallback((field: FilterFields, value: any) => {
        setFilterList(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
    }, []);

    const handleApplyFilterList = useCallback(() => {
        setIsLoading(true);
        const getFilteredVehicleList = filterVehicleList({
            vehicleData: originalVehicleData,
            filterList,
            favoriteVehicles
        })
        setFilteredVehicleData(getFilteredVehicleList);
        setIsFilterModalVisible(false);

        // Simulate loading time
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [originalVehicleData, filterList, favoriteVehicles, setIsLoading]);

    const handleClearFilters = useCallback(() => {
        setFilterList({
            make: '',
            model: '',
            startingBidRange: {
                min: null,
                max: null
            },
            onlyFavourites: false
        });
    }, []);

    if (isLoading) {
        return (
            <>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} />
                ))}
            </>
        )
    }
    return (
        <>
            <View
                style={styles({}).filterButtonContainer}
            >
                <Button
                    content="Filter Vehicles"
                    onPress={handleFilterModal}
                    type={ButtonType.SECONDARY}
                />
            </View>
            <FlatList
                data={filteredVehicleData}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Item
                        key={`${item.model}-${item.mileage}-${item.id}`}
                        vehicleData={item}
                        onPressItem={() => handlePressItem(item.id)}
                    />
                }
                keyboardDismissMode="on-drag"
                ListEmptyComponent={
                    <View style={styles({}).listEmptyComponent}>
                        <Text>No vehicles available</Text>
                        <Text>Please adjust your filters or try again later.</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                maxToRenderPerBatch={7}
            />
            {
                isFilterModalVisible &&
                <Modal
                    isVisible={isFilterModalVisible}
                    onClose={() => setIsFilterModalVisible(false)}
                    content={
                        <ModalContent
                            makeOptions={uniqueVehicleMakes}
                            modelOptions={uniqueVehicleModels}
                            startingBidRangeOptions={filterList.startingBidRange || { min: 0, max: 0 }}
                            onlyFavourites={filterList.onlyFavourites}
                            onChangeFilters={(field, value) => handleChangeFilters(field, value)}
                            handleCloseFilterModal={() => setIsFilterModalVisible(false)}
                        />
                    }
                    footer={
                        <ModalFooter
                            onApplyFilters={handleApplyFilterList}
                            onClearFilters={handleClearFilters}
                        />
                    }
                />
            }
        </>
    )
}


const ModalContent = memo(({
    makeOptions,
    modelOptions,
    startingBidRangeOptions,
    onlyFavourites,
    onChangeFilters,
    handleCloseFilterModal
}: ModalContentProps) => {

    return (
        <View style={styles({}).modalContainer}>
            <View
                style={styles({}).modalHeader}
            >
                <Text>Filter List</Text>
                <Button
                    content="Close"
                    onPress={() => handleCloseFilterModal && handleCloseFilterModal()}
                    type={ButtonType.SECONDARY}
                />
            </View>
            <ScrollView
                style={styles({}).modalBody}
            >
                <View style={[
                    styles({}).filterContainer,
                    styles({}).inlineStyle
                ]}>
                    <Text style={styles({}).filterLabel}>Only Favourites</Text>
                    <Toggle
                        isActive={onlyFavourites}
                        onToggle={() => onChangeFilters && onChangeFilters(FilterFields.ONLY_FAVOURITES, !onlyFavourites)}
                    />
                </View>
                <View style={styles({}).filterContainer}>
                    <Text style={styles({}).filterLabel}>Filter by Starting Bid Range</Text>
                    <Input 
                        label="Minimum Bid"
                        keyboardType="numeric"
                        value={startingBidRangeOptions.min?.toString() ?? ''}
                        onChangeText={(text) => onChangeFilters && onChangeFilters(FilterFields.STARTING_BID_RANGE, {
                            ...startingBidRangeOptions,
                            min: text ? parseFloat(text) : null
                        })}
                    />
                    <Input 
                        label="Maximum Bid"
                        keyboardType="numeric"
                        value={startingBidRangeOptions.max?.toString() ?? ''}
                        onChangeText={(text) => onChangeFilters && onChangeFilters(FilterFields.STARTING_BID_RANGE, {
                            ...startingBidRangeOptions,
                            max: text ? parseFloat(text) : null
                        })}
                    />
                </View>
                <View style={styles({}).filterContainer}>
                    <Text style={styles({}).filterLabel}>Filter by Make</Text>
                    <RNPickerSelect
                        onValueChange={(value) => onChangeFilters && onChangeFilters(FilterFields.MAKE, value)}
                        items={makeOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        fixAndroidTouchableBug={true}
                        placeholder={{ label: "Select a vehicle make...", value: null }}
                        style={pickerStyle}
                    />
                </View>
                <View style={styles({}).filterContainer}>
                    <Text style={styles({}).filterLabel}>Filter by Model</Text>
                    <RNPickerSelect
                        onValueChange={(value) => onChangeFilters && onChangeFilters(FilterFields.MODEL, value)}
                        items={modelOptions.filter(option => option != null).map(option => ({
                            label: option,
                            value: option
                        }))}
                        fixAndroidTouchableBug={true}
                        placeholder={{ label: "Select a vehicle model...", value: null }}
                        disabled={modelOptions.length === 0}
                        style={pickerStyle}
                    />
                </View>
            </ScrollView>
        </View>
    )
});


const ModalFooter = memo(({
    onApplyFilters,
    onClearFilters
}: ModalFooterProps) => {
    return (
        <View
            style={styles({}).modalFooter}
        >
            <Button
                content="Apply Filters"
                onPress={onApplyFilters}
                type={ButtonType.PRIMARY}
            />
            <Button
                content="Clear Filters"
                onPress={onClearFilters}
                type={ButtonType.SECONDARY}
            />
        </View>
    )
});