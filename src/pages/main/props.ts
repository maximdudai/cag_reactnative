
export enum FilterFields {
    MAKE = 'make',
    MODEL = 'model',
    STARTING_BID_RANGE = 'startingBidRange',
    ONLY_FAVOURITES = 'onlyFavourites'
}

export type ModalContentProps = {
    makeOptions: string[];
    modelOptions: string[];
    startingBidRangeOptions: { min?: number | null; max?: number | null };
    onlyFavourites: boolean;
    onChangeFilters?: (field: FilterFields, value: any) => void;
    handleCloseFilterModal?: () => void;

}
export type ModalFooterProps = {
    onApplyFilters: () => void;
    onClearFilters: () => void;
}