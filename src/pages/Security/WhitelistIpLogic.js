import { useReducer, useContext, useEffect } from 'react'
import ApiContext from '../../context/ApiContext'
import { Context as AuthContext } from '../../context/AuthContext'
import _ from "lodash";



const initialState = {
    isIpModalOpen: false,
    isIpActivated: false,
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_IP_MODAL":
            return { ...state, isIpModalOpen: payload }

        case "SET_IP_ACTIVATED":
            return { ...state, isIpActivated: payload }

        default:
            return state;
    }
}

function WhitelistIpLogic() {
    const { user, _fetchWhitelistIps, wlIps, setWlIps, loading, _deleteWhitelistIP, _saveWhitelistIp } = useContext(ApiContext);
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const [logicState, dispatch] = useReducer(reducer, initialState)



    const setIpModal = (payload) => {
        dispatch({ type: "SET_IP_MODAL", payload })
    }

    const setIpActivated = (payload) => {
        dispatch({ type: "SET_IP_ACTIVATED", payload })
    }



    const handleTableChange = (pagination, filters, sorter) => {
        const orderedList = _.orderBy(wlIps, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
        setWlIps(orderedList);
    };


    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            const payload = {
                Criteria: { tenantId: user?.tenantId },
            };
            _fetchWhitelistIps(payload);
        }
    }, [user]);




    return {
        logicState,
        setIpModal,
        setIpActivated,
        isLoggedIn,
        loading,
        wlIps,
        _deleteWhitelistIP,
        handleTableChange,
        _saveWhitelistIp,
    }
}

export default WhitelistIpLogic
