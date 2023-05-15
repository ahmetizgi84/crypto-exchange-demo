import { useContext } from 'react'
import { Context as AuthContext } from '../../context/AuthContext'

import GoogleVerification from './googleVerification'
import SmsVerification from './phoneVerification'

function SecurityVerification() {
    const { state: { smsAuth, googleAuth } } = useContext(AuthContext)

    return (
        <>
            <SmsVerification />
            {/* {
                smsAuth && !googleAuth && <SmsVerification change={false} />
            }

            {
                !smsAuth && googleAuth && <GoogleVerification change={false} />
            }

            {
                smsAuth && googleAuth && <SmsVerification change={true} />
            } */}

        </>
    )
}

export default SecurityVerification
