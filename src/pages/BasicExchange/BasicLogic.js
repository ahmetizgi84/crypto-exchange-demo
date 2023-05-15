import { useReducer, useContext } from 'react'
import { Context as AuthContext } from "../../context/AuthContext"
import DataContext from '../../context/DataContext';

const initialState = {
    value: "limit"
}

function reducer(state, { type, payload }) {
    switch (type) {
        case 'SET_MARKET':
            return { value: payload };
        case 'SET_LIMIT':
            return { value: payload };
        case 'SET_CHOOSED_MARKET':
            return { choosed: payload };
        default:
            return state
    }
}

function BasicLogic() {
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const { exchangeState, dispatch: exchangeDispatch } = useContext(DataContext)
    const [state, dispatch] = useReducer(reducer, initialState);


    const changeBtnState = (actionObj) => {
        dispatch(actionObj);
    }

    /** LIMIT */

    const handleAmountChange = (amount) => {
        if (amount === "") {
            const total = exchangeState.price * 0
            exchangeDispatch({ type: "SET_BOTH", payload: { total, amount: 0 } })
        } else {
            const total = (exchangeState.price * amount).toFixed(4)
            exchangeDispatch({ type: "SET_BOTH", payload: { total, amount } })
        }
    }

    const handlePriceChange = (price) => {
        if (price === "") {
            const total = 0 * exchangeState.amount
            exchangeDispatch({ type: "SET_TOTAL", payload: total })
        } else {
            const total = (parseFloat(price) * exchangeState.amount).toFixed(4)
            exchangeDispatch({ type: "SET_TOTAL", payload: total })
        }
        exchangeDispatch({ type: "SET_PRICE", payload: price })
    }

    const handleLimitTotalChange = (total) => {
        if (total === "") {
            const amount = 0 / exchangeState.price
            exchangeDispatch({ type: "SET_AMOUNT", payload: amount })
        } else {
            const amount = (parseFloat(total) / exchangeState.price).toFixed(4)
            exchangeDispatch({ type: "SET_AMOUNT", payload: amount })
        }
        exchangeDispatch({ type: "SET_TOTAL", payload: total })
    }

    /** MARKET */

    const handleTotalPriceChange = (totalPrice) => {
        if (totalPrice === "") {
            const estimatedAmount = 0 / exchangeState.marketPrice
            exchangeDispatch({ type: "SET_EST_AMOUNT", payload: estimatedAmount })
        } else {
            const estimatedAmount = (parseFloat(totalPrice) / exchangeState.marketPrice).toFixed(4)
            exchangeDispatch({ type: "SET_EST_AMOUNT", payload: estimatedAmount })
        }
        exchangeDispatch({ type: "SET_MARKET_TOTAL", payload: totalPrice })
    }


    return { state, changeBtnState, isLoggedIn, exchangeState, handleAmountChange, handleTotalPriceChange, handlePriceChange, handleLimitTotalChange }
}



export {
    BasicLogic,
}
