export type ModalContentProps = {
    makeOptions: string[];
    modelOptions: string[];
    startingBidRangeOptions: { min?: number; max?: number };
    onlyFavourites: boolean;
    onSelectMakeFilter?: (value: string) => void;
    onSelectModelFilter?: (value: string) => void;
    onToggleOnlyFavourites?: () => void;
    handleCloseFilterModal?: () => void;
}
export type ModalFooterProps = {
    onApplyFilters: () => void;
    onClearFilters: () => void;
}