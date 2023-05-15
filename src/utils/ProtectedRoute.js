import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context as AuthContext } from '../context/AuthContext'


export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { state: { isLoggedIn } } = useContext(AuthContext)
    return (
        <Route {...rest} render={
            (props) => {
                if (isLoggedIn) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: { from: props.location }
                        }
                    } />
                }
            }
        }

        />
    )
}


export const PreventRoute = ({ component: Component, ...rest }) => {
    const { state: { isLoggedIn, googleAuth, smsAuth } } = useContext(AuthContext)


    let directedPath = '/'
    if (googleAuth || smsAuth) {
        directedPath = "/2fa"
    }

    return (
        <Route {...rest} render={
            (props) => {
                if (!isLoggedIn) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: directedPath,
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        }

        />
    )
}



