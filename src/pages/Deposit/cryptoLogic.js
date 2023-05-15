import { useContext, useEffect, useReducer } from 'react'
import ApiContext from '../../context/ApiContext'
import { message } from 'antd'
import { coinIcons } from '../../assets/icons'
import constants from '../../common/constants'

const initialState = {
    coins: [],
    isShow: false
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_COIN_LIST":
            return { ...state, coins: payload }
        case "SET_IS_SHOW":
            return { ...state, isShow: payload }

        default:
            return state
    }
}

function CryptoLogic() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { _getCoinList, _getTransferNetwork, coinList, coinNetwork } = useContext(ApiContext)

    useEffect(() => {
        _getCoinList();
    }, [])


    useEffect(() => {
        coinList.length > 0 && mergeWithIcons()
    }, [coinList])


    const mergeWithIcons = () => {
        let tempArray = [...coinList]
        tempArray.map(item => {
            const symbol = item.symbol
            const isExist = coinIcons.some(ci => ci.asset === symbol)
            if (isExist) {
                let found = coinIcons.find(ci => ci.asset === symbol)
                item.image = found.image
            } else {
                const woynex = coinIcons.find(ci => ci.asset === 'WOYNEX')
                item.image = woynex.image
            }
        })

        let sortedData = tempArray.sort((a, b) =>
            a.symbol > b.symbol ? 1 : -1
        );

        dispatch({ type: "SET_COIN_LIST", payload: sortedData })
    }


    const handleChange = (value) => {
        const browserUrl = window.location.origin;
        if (browserUrl === "http://localhost:3000") {
            window.history.pushState({}, null, browserUrl + "/deposit/" + value);
        } else {
            window.history.pushState({}, null, constants.WoynexUrl + "/deposit/" + value);
        }
        _getTransferNetwork({ symbol: value })
    };

    async function copyToClipboard(info) {
        await navigator.clipboard.writeText(info);
        message.success("Copied");
    }

    const setIsShow = () => {
        dispatch({ type: "SET_IS_SHOW", payload: !state.isShow })
    }


    return {
        state,
        coinNetwork,
        handleChange,
        copyToClipboard,
        setIsShow,
    }
}

export default CryptoLogic
