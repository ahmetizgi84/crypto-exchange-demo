import { useReducer } from 'react'


const initialState = {
    show: false,
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_MODAL_STATE":

            return { ...state, show: payload }
        default:
            return state
    }
}


function GeneralSecurityLogic() {
    const [logicState, dispatch] = useReducer(reducer, initialState)



    const setModalState = (state) => {
        dispatch({ type: "SET_MODAL_STATE", payload: state })
    }

    return {
        logicState,
        setModalState
    }
}

export default GeneralSecurityLogic
