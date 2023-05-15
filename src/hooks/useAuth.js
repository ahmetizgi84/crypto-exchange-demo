import { useContext } from 'react'
import { Context as AuthContext } from '../context/AuthContext'

function UseAuth() {
    const { state: { isLoggedIn } } = useContext(AuthContext)



    return isLoggedIn
}

export default UseAuth
