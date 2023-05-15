import React, { useEffect, useContext, useState, Suspense } from 'react'
import { Context as AuthContext } from '../context/AuthContext'
import ApiContext from '../context/ApiContext';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ProtectedRoute, PreventRoute } from '../utils/ProtectedRoute';
import { Gatherer } from '../components';

//import { AuthenticatedRoutes, UnauthenticatedRoutes } from '../routes';
import Layout from '../components/Layout';
import Exchange from './exchange';


/**
 * BEFORE LAZY LOAD
 * 4.9 / 5.2 MB transferred
 * 30.0 / 31.0 MB resources
 * Finish: 15.25 s
 * Load: 11.84 s
 * DomContentLoaded: 6.35 s
 */

/**
 * AFTER LAZY LOAD
 * 4.6 / 4.9 MB transferred
 * 27.8 / 28.8 MB resources
 * Finish: 13.41 s
 * Load: 11.90 s
 * DomContentLoaded: 6.41 s
 */

const Landing = React.lazy(() => import('./Landing/landing'));
const BasicExchange = React.lazy(() => import('./BasicExchange/basic-exchange'));
const Login = React.lazy(() => import('./Login/login'));
const Signup = React.lazy(() => import('./Signup/signup'));
const Profile = React.lazy(() => import('./Profile/profile'));
const FastBuySell = React.lazy(() => import('./FastBuySell/fastBuySell'));
const Reset = React.lazy(() => import('./Reset/reset'));
const About = React.lazy(() => import('./AboutUs/About'));
const Privacy = React.lazy(() => import('./AboutUs/Privacy'));
const TermsAndConditions = React.lazy(() => import('./TermsAndConditions/terms-and-conditions'));
const NotFound = React.lazy(() => import('./notfound'));
const IdVerify = React.lazy(() => import('./id-verify'));
const AddressVerify = React.lazy(() => import('./address-verify'));
const UserVerification = React.lazy(() => import('./user-verification'));
const ResetPassword = React.lazy(() => import('./reset-password'));
const VipLevel = React.lazy(() => import('./VipLevel/vip-level'));
const Withdraw = React.lazy(() => import('./Withdraw/withdraw'));
const Deposit = React.lazy(() => import('./Deposit/deposit'));
const Wallet = React.lazy(() => import('./Wallet/wallet'));
const Security = React.lazy(() => import('./Security/security'));
const BankAccounts = React.lazy(() => import('./BankAccounts/bankAccounts'));
const TradeHistory = React.lazy(() => import('./TradeHistory/tradeHistory'));
const Notifications = React.lazy(() => import('./Notifications/notifications'));
const Referral = React.lazy(() => import('./Referral/referral'));
const CompanyInfo = React.lazy(() => import('./CompanyInfo/companyInfo'));
const SubAccounts = React.lazy(() => import('./SubAccounts/subAccounts'));
const AddNewUser = React.lazy(() => import('./AddNewUser/addNewUser'));
const ChangeEmail = React.lazy(() => import('./ChangeEmail/changeEmail'));
const ChangePhone = React.lazy(() => import('./ChangePhone/changePhone'));

const PhoneVerification = React.lazy(() => import('./SecurityVerification/phoneVerification'));
const GoogleVerification = React.lazy(() => import('./SecurityVerification/googleVerification'));
const ResetVerification = React.lazy(() => import('./SecurityVerification/resetVerification'));
const SecurityVerification = React.lazy(() => import('./SecurityVerification/security-verification'));


const SmsAuthentication = React.lazy(() => import('./SmsAuthentication/sms-authentication'));
const SmsAuthenticationEnabled = React.lazy(() => import('./SmsAuthentication/sms-authentication-enabled'));
const GoogleAuthenticator = React.lazy(() => import('./GoogleAuthenticator/google-authenticator'));
const DisableAccount = React.lazy(() => import('./DisableAccount/disable-account'));

const NewsDetails = React.lazy(() => import('./news-details'));


function Router() {
  const [loading, setLoading] = useState(true)
  const { _persistLoggedIn, _logoutAndClearStorage, state: { userData, isLoggedIn } } = useContext(AuthContext)
  const { _getCurrentUserData, _getTierList, user, _getUserPairFavoriteList, setFavorites } = useContext(ApiContext)


  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const existingUser = JSON.parse(loggedInUser)
      const today = new Date();
      const endDate = new Date(existingUser.expiry)

      const minutes = parseInt((endDate.getTime() - today.getTime()) / (1000 * 60) % 60);

      if (minutes > 0) {
        _persistLoggedIn(existingUser)
      } else {
        _logoutAndClearStorage();
      }
      console.log("remainig minutes of session:", minutes)
    }

  }, [])


  useEffect(() => {
    if (Object.keys(userData).length) {
      const payload = {
        email: userData?.email,
        userId: userData?.userId
      }
      _getCurrentUserData(payload)
      _getTierList();
    }
  }, [userData])

  useEffect(() => {
    if (Object.keys(user).length) {
      const payload = {
        criteria: {
          tenantId: user?.tenantId
        }
      }
      _getUserPairFavoriteList(payload)
    } else {
      const localfavoriteData = localStorage.getItem('favoriteData')
      const getfavoriteData = localfavoriteData ? JSON.parse(localfavoriteData) : {}
      if (Object.keys(getfavoriteData).length > 0) {
        setFavorites(getfavoriteData)
      }
    }
    setLoading(false)
  }, [user])






  if (loading) {
    return <Gatherer />
  }
  const link = "/pro/BTCUSDT_BTC_USDT"
  const basicLink = "/basic/BTCUSDT_BTC_USDT"


  //return isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />


  return (
    <>
      <Layout>
        <Suspense fallback={<Gatherer />}>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to={link} />
            )} />
            <Route exact path="/basic" render={() => (
              <Redirect to={basicLink} />
            )} />
            <Route path="/landing" component={Landing} />
            <Route exact path="/pro/:slug" component={Exchange} />
            <Route path="/basic/:slug" component={BasicExchange} />
            <Route path="/fast/:slug" component={FastBuySell} />
            <ProtectedRoute path="/profile/dashboard" component={Profile} />
            <ProtectedRoute path="/profile/wallet" component={Wallet} />
            <ProtectedRoute path="/profile/security" component={Security} />
            <ProtectedRoute path="/profile/bank-accounts" component={BankAccounts} />
            <ProtectedRoute path="/profile/trade-history" component={TradeHistory} />
            <ProtectedRoute path="/profile/notifications" component={Notifications} />
            <ProtectedRoute path="/profile/referral" component={Referral} />
            <ProtectedRoute path="/profile/company-info" component={CompanyInfo} />
            <ProtectedRoute path="/profile/sub-accounts" component={SubAccounts} />
            <ProtectedRoute path="/profile/new-user" component={AddNewUser} />

            <ProtectedRoute path="/security/change-email-authenticator" component={ChangeEmail} />
            <ProtectedRoute path="/security/change-sms-authenticator" component={ChangePhone} />
            <ProtectedRoute path="/security/activate-sms-otp" component={SmsAuthentication} />
            <ProtectedRoute path="/security/sms-otp-enabled" component={SmsAuthenticationEnabled} />
            <ProtectedRoute path="/security/enable-google-authenticator" component={GoogleAuthenticator} />
            <ProtectedRoute path="/security/disable-account" component={DisableAccount} />


            <ProtectedRoute path="/2fa" component={SecurityVerification} />
            {/* <ProtectedRoute path="/security-verification-phone" component={PhoneVerification} />
            <ProtectedRoute path="/security-verification-google" component={GoogleVerification} /> *************/}
            <ProtectedRoute path="/security-verification-reset" component={ResetVerification} />


            <ProtectedRoute path="/withdraw" component={Withdraw} />
            <ProtectedRoute path="/deposit/:asset" component={Deposit} />
            <ProtectedRoute path="/id-verify" component={IdVerify} />
            <ProtectedRoute path="/address-verify" component={AddressVerify} />


            <PreventRoute path="/login" component={Login} />
            <PreventRoute path="/signup" component={Signup} />
            <PreventRoute path="/reset" component={Reset} />

            <Route path="/aboutUs/about" component={About} />
            <Route path="/aboutUs/privacy" component={Privacy} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} />
            <Route path="/userVerification/:token" component={UserVerification} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route path="/fee/vip-level" component={VipLevel} />

            <Route path="/news-details" component={NewsDetails} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  )

}


export default Router