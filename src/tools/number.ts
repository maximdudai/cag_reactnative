
/*
    * Formats a number as currency in Euro format.
    * @param amount - The amount to format.
    * @param currencySymbol - The currency symbol to use (default is '€').
    * @returns The formatted currency string.
    */
export function formatCurrency(amount: number, currencySymbol: string = '€'): string {
    return `${currencySymbol}${amount.toLocaleString('en-IE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}