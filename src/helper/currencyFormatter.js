

// localize us
const usOptions = {
    significantDigits: 4,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbol: '$',
}


// localize tr
const defaultOptions = {
    significantDigits: 4,
    thousandsSeparator: '.',
    decimalSeparator: ',',
    symbol: '',
    // symbol: '₺',
}


// const options = {
//     significantDigits: market?.baseAssetPrecision,
//     thousandsSeparator: '.',
//     decimalSeparator: ',',
//     symbol: '',
//     // symbol: '₺',
// }

export const currencyFormatter = (value, options) => {

    if (typeof value !== 'number') value = 0.0
    options = { ...defaultOptions, ...options }
    value = value.toFixed(options.significantDigits)

    const [currency, decimal] = value.split('.')
    return `${options.symbol} ${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}${options.decimalSeparator}${decimal}`
}

