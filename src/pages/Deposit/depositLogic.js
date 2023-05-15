import { useReducer } from 'react'
import { message } from "antd";

const initialState = {
    initialAccount: 0
}


const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_INITIAL_ACCOUNT":
            return { ...state, initialAccount: payload }

        default:
            return state;
    }

}

function DepositLogic() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setInitialAccount = (id) => {
        dispatch({ type: "SET_INITIAL_ACCOUNT", payload: id })
    }

    async function copyToClipboard(info) {
        await navigator.clipboard.writeText(info);
        message.success("Copied");
    }

    return {
        state, setInitialAccount, copyToClipboard
    }
}

export default DepositLogic
