import { useReducer, useContext, useEffect } from 'react'
import MarketPairsSocketContext from "../../context/MarketPairsSocketContext";
import ApiContext from '../../context/ApiContext';
import DataContext from '../../context/DataContext';
import { urlParser } from '../../utils/urlParser';
import constants from '../../common/constants';

const initialState = {
    choosed: {},
    initialCoin: {},
}

function reducer(state, { type, payload }) {
    switch (type) {
        case 'SET_CHOOSED_MARKET':
            return { ...state, choosed: payload };
        case 'SET_INITIAL_COIN':
            return { ...state, initialCoin: payload };
        default:
            return state
    }
}

function CoinBarLogic() {
    const { pair, asset, quote } = urlParser(window.location.href);
    const { data } = useContext(MarketPairsSocketContext);
    const { coinList, _getCoinList } = useContext(ApiContext)
    const { dispatch: exchangeDispatch } = useContext(DataContext)
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        _getCoinList();
    }, [])

    useEffect(() => {
        //console.log("coinList: ", coinList)
        if (coinList.length > 0) {
            const defaultCoin = coinList.find(coin => coin.symbol === asset) || {}
            dispatch({ type: "SET_INITIAL_COIN", payload: defaultCoin })
        }
    }, [coinList])

    useEffect(() => {
        const foundMarket = data?.find((mrkt) => mrkt.symbol === pair) || {};
        dispatch({ type: "SET_CHOOSED_MARKET", payload: foundMarket })
        exchangeDispatch({ type: "SET_QUOTE_ASSET", payload: { asset, quote } })
    }, [data]);




    function handleSelectChange(value) {
        console.log(value)
        const symbol = value + "USDT"
        exchangeDispatch({ type: "SET_QUOTE_ASSET", payload: { asset: value, quote } })

        const defaultCoin = coinList.find(coin => coin.symbol === value) || {}
        dispatch({ type: "SET_INITIAL_COIN", payload: defaultCoin })

        const browserUrl = window.location.origin
        if (browserUrl === "http://localhost:3000") {
            window.history.pushState({}, null,
                browserUrl +
                "/basic/" +
                symbol + // BTCUSDT
                "_" +
                value + //BTC
                "_" +
                "USDT" // USDT
            );
        } else {
            window.history.pushState({}, null,
                constants.WoynexUrl +
                "/pro/" +
                symbol +
                "_" +
                value +
                "_" +
                "USDT"
            );
        }

    }




    let className = "gray";

    if (state.choosed?.priceChangePercent > 0) {
        className = "green";
    } else if (state.choosed?.priceChangePercent < 0) {
        className = "red";
    } else {
        className = "gray";
    }

    let defaultOptions = {
        significantDigits: 5,
        thousandsSeparator: ".",
        decimalSeparator: ",",
        symbol: "",
    };

    if (pair === "SHIBUSDT" || pair === "HOTUSDT") {
        defaultOptions = {
            significantDigits: 8,
            thousandsSeparator: ".",
            decimalSeparator: ",",
            symbol: "",
        };
    }


    return { state, defaultOptions, className, coinList, handleSelectChange, quote, asset }
}



export {
    CoinBarLogic,
}
