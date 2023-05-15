import { createContext, useState, useReducer } from 'react'


const DataContext = createContext();


const initialExchangeState = {
    price: 0,
    total: 0,
    amount: 0,

    marketPrice: 0,
    estimatedAmount: 0,
    marketTotal: 0,

    pair: { quote: "USDT", asset: "BTC" }
}

function exchangeReducer(state, { type, payload }) {
    switch (type) {
        case 'SET_PRICE':
            return { ...state, price: payload };
        case 'SET_AMOUNT':
            return { ...state, amount: payload };
        case 'SET_BOTH':
            return { ...state, total: payload.total, amount: payload.amount };
        case 'SET_TOTAL':
            return { ...state, total: payload };
        case 'SET_EST_AMOUNT':
            return { ...state, estimatedAmount: payload };
        case 'SET_MARKET_TOTAL':
            return { ...state, marketTotal: payload };
        case 'SET_MARKET_ALL':
            return { ...state, marketPrice: payload.marketPrice, estimatedAmount: payload.amount, marketTotal: payload.marketTotal };
        case 'SET_QUOTE_ASSET':
            return { ...state, pair: payload };
        default:
            return state
    }
}


export const DataProvider = ({ children }) => {
    const [pair, setPair] = useState('BTCUSDT')
    const [market, setMarket] = useState({})

    const [buyPrice, setBuyPrice] = useState(0)
    const [sellPrice, setSellPrice] = useState(0)
    const [vip, setVip] = useState("-")
    const [zeroBalanceChecked, setZeroBalanceChecked] = useState(false);
    const [isHiding, setIsHiding] = useState(false);


    const [exchangeState, dispatch] = useReducer(exchangeReducer, initialExchangeState);

    const setTotalAndPrice = (row) => {
        const total = parseFloat(row.price) * parseFloat(exchangeState.amount)
        dispatch({ type: "SET_PRICE", payload: row.price })
        dispatch({ type: "SET_TOTAL", payload: total })


        const marketTotal = (row.price * row.quantity).toFixed(2)
        dispatch({ type: "SET_MARKET_ALL", payload: { marketPrice: row.price, amount: row.quantity, marketTotal } })
    }


    const initialState = {
        pair,
        setPair,
        market,
        setMarket,
        buyPrice,
        setBuyPrice,
        sellPrice,
        setSellPrice,
        vip,
        setVip,
        zeroBalanceChecked,
        setZeroBalanceChecked,
        isHiding,
        setIsHiding,
        exchangeState,
        dispatch,
        setTotalAndPrice,
    }



    return (
        <DataContext.Provider value={initialState}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext