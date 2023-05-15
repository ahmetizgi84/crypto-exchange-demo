import { useContext, useEffect, useReducer } from 'react'
import ApiContext from '../../context/ApiContext'

const initialState = {
    withdrawalAmount: 0
}


const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_WITHDRAWAL_AMOUNT":
            return { ...state, withdrawalAmount: payload }

        default:
            return state;
    }

}


function WithdrawLogic() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { _getBankAccountList, bankAccounts } = useContext(ApiContext)


    useEffect(() => {
        _getBankAccountList({})
    }, [])



    const setWithdrawalAmount = (totalBalance) => {
        dispatch({ type: "SET_WITHDRAWAL_AMOUNT", payload: totalBalance })
    }



    return { bankAccounts, state, setWithdrawalAmount }
}

export default WithdrawLogic
