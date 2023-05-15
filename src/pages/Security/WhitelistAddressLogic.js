import { useReducer, useEffect, useContext } from 'react'
import ApiContext from '../../context/ApiContext';
import { Context as AuthContext } from '../../context/AuthContext'

const initialState = {
    isWhitelistAddressModalOpen: false,
    isUniversalAddressChecked: true,
    optionOriginAddressType: "ADDRESS_ORIGIN_EXCHANGE_OPTION",
    show: false,
}


const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_UNIVERSAL_ADDRESS":
            return { ...state, isUniversalAddressChecked: payload }
        case "SET_WHITELIST_ADDRESS_MODAL":
            return { ...state, isWhitelistAddressModalOpen: payload }
        case "CHECKBOX_CHANGER":
            return { ...state, isUniversalAddressChecked: payload }
        case "SET_ORIGIN_ADDRESS_TYPE":
            return { ...state, optionOriginAddressType: payload }
        case "SET_SHOW":
            return { ...state, show: payload }



        default:
            return state
    }
}

function WhitelistAddressLogic() {
    const [logicState, dispatch] = useReducer(reducer, initialState)
    const { isUniversalAddressChecked } = logicState
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const {
        _getTransferNetwork,
        _getCoreParameters,
        setCoinNetwork,
    } = useContext(ApiContext);




    const setUniversalAddress = (state) => {
        dispatch({ type: "SET_LABEL", payload: state })
    }

    const setWhitelistAddressModal = (state) => {
        dispatch({ type: "SET_WHITELIST_ADDRESS_MODAL", payload: state })
        setUniversalAddress(false)
    }

    const setShow = (state) => {
        dispatch({ type: "SET_SHOW", payload: state })
    }

    const setOriginAddressType = (e) => {
        const type = e.target.value
        dispatch({ type: "SET_ORIGIN_ADDRESS_TYPE", payload: type })
        const payload = {
            keyCode: type,
            status: 1,
        };
        _getCoreParameters(payload)
    }


    const getTransferNetworkByAsset = (asset) => {
        const payload = {
            symbol: asset,
            isUniversal: false,
        };
        _getTransferNetwork(payload);
    }


    const handleCheckBoxOnChange = () => {
        dispatch({ type: "CHECKBOX_CHANGER", payload: !isUniversalAddressChecked })
    };

    useEffect(() => {
        if (isUniversalAddressChecked) {
            const payload = {
                isUniversal: isUniversalAddressChecked,
            };
            _getTransferNetwork(payload);
        } else {
            setCoinNetwork([])
        }
    }, [isUniversalAddressChecked])





    return {
        logicState,
        isLoggedIn,
        setUniversalAddress,
        setWhitelistAddressModal,
        handleCheckBoxOnChange,
        setOriginAddressType,
        getTransferNetworkByAsset,
        setShow,
    }
}

export default WhitelistAddressLogic
