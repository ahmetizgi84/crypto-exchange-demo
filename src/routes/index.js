import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import { Gatherer, Layout } from '../components';

import Exchange from '../pages/exchange';


const BasicExchange = React.lazy(() => import('../pages/BasicExchange/basic-exchange'));
const Login = React.lazy(() => import('../pages/Login/login'));
const Signup = React.lazy(() => import('../pages/Signup/signup'));
const Profile = React.lazy(() => import('../pages/Profile/profile'));
const FastBuySell = React.lazy(() => import('../pages/FastBuySell/fastBuySell'));
const Reset = React.lazy(() => import('../pages/Reset/reset'));
const About = React.lazy(() => import('./AboutUs/About'));
const Privacy = React.lazy(() => import('./AboutUs/Privacy'));
const TermsAndConditions = React.lazy(() => import('../pages/TermsAndConditions/terms-and-conditions'));
const NotFound = React.lazy(() => import('../pages/notfound'));
const IdVerify = React.lazy(() => import('../pages/id-verify'));
const AddressVerify = React.lazy(() => import('../pages/address-verify'));
const UserVerification = React.lazy(() => import('../pages/user-verification'));
const ResetPassword = React.lazy(() => import('../pages/reset-password'));
const VipLevel = React.lazy(() => import('../pages/VipLevel/vip-level'));
const Withdraw = React.lazy(() => import('../pages/Withdraw/withdraw'));
const Deposit = React.lazy(() => import('../pages/Deposit/deposit'));
const Wallet = React.lazy(() => import('../pages/Wallet/wallet'));
const Security = React.lazy(() => import('../pages/Security/security'));
const BankAccounts = React.lazy(() => import('../pages/BankAccounts/bankAccounts'));
const TradeHistory = React.lazy(() => import('../pages/TradeHistory/tradeHistory'));
const Notifications = React.lazy(() => import('../pages/Notifications/notifications'));
const Referral = React.lazy(() => import('../pages/Referral/referral'));
const CompanyInfo = React.lazy(() => import('../pages/CompanyInfo/companyInfo'));
const SubAccounts = React.lazy(() => import('../pages/SubAccounts/subAccounts'));
const AddNewUser = React.lazy(() => import('../pages/AddNewUser/addNewUser'));
const ChangeEmail = React.lazy(() => import('../pages/ChangeEmail/changeEmail'));
const ChangePhone = React.lazy(() => import('../pages/ChangePhone/changePhone'));

const PhoneVerification = React.lazy(() => import('../pages/SecurityVerification/phoneVerification'));
const GoogleVerification = React.lazy(() => import('../pages/SecurityVerification/googleVerification'));
const ResetVerification = React.lazy(() => import('../pages/SecurityVerification/resetVerification'));
const SecurityVerification = React.lazy(() => import('../pages/SecurityVerification/security-verification'));


const SmsAuthentication = React.lazy(() => import('../pages/SmsAuthentication/sms-authentication'));
const SmsAuthenticationEnabled = React.lazy(() => import('../pages/SmsAuthentication/sms-authentication-enabled'));
const GoogleAuthenticator = React.lazy(() => import('../pages/GoogleAuthenticator/google-authenticator'));
const DisableAccount = React.lazy(() => import('../pages/DisableAccount/disable-account'));

const NewsDetails = React.lazy(() => import('../pages/news-details'));



const link = "/pro/BTCUSDT_BTC_USDT"
const basicLink = "/basic/BTCUSDT_BTC_USDT"


function UnauthenticatedRoutes() {
    return (
        <Layout>
            <Suspense fallback={<Gatherer />}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to={link} />
                    )} />
                    <Route path="/basic" render={() => (
                        <Redirect to={basicLink} />
                    )} />
                    <Route path="/pro/:slug" component={Exchange} />
                    <Route path="/basic/:slug" component={BasicExchange} />
                    <Route path="/fast/:slug" component={FastBuySell} />

                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/reset" component={Reset} />
                    
                    <Route path="/aboutUs/about" component={About} />
                    <Route path="/terms-and-conditions" component={TermsAndConditions} />
                    <Route path="/userVerification/:token" component={UserVerification} />
                    <Route path="/resetPassword/:token" component={ResetPassword} />
                    <Route path="/fee/vip-level" component={VipLevel} />
                    <Route path="/news-details" component={NewsDetails} />
                    <Route path="*" component={NotFound} />

                </Switch>
            </Suspense>
        </Layout>
    )
}

function AuthenticatedRoutes() {
    return (
        <Layout>
            <Suspense fallback={<Gatherer />}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to={link} />
                    )} />
                    <Route path="/basic" render={() => (
                        <Redirect to={basicLink} />
                    )} />
                    <Route path="/pro/:slug" component={Exchange} />
                    <Route path="/basic/:slug" component={BasicExchange} />
                    <Route path="/fast/:slug" component={FastBuySell} />
                    <Route path="/profile/dashboard" component={Profile} />
                    <Route path="/profile/wallet" component={Wallet} />
                    <Route path="/profile/security" component={Security} />
                    <Route path="/profile/bank-accounts" component={BankAccounts} />
                    <Route path="/profile/trade-history" component={TradeHistory} />
                    <Route path="/profile/notifications" component={Notifications} />
                    <Route path="/profile/referral" component={Referral} />
                    <Route path="/profile/company-info" component={CompanyInfo} />
                    <Route path="/profile/sub-accounts" component={SubAccounts} />
                    <Route path="/profile/new-user" component={AddNewUser} />

                    <Route path="/security/change-email-authenticator" component={ChangeEmail} />
                    <Route path="/security/change-sms-authenticator" component={ChangePhone} />
                    <Route path="/security/activate-sms-otp" component={SmsAuthentication} />
                    <Route path="/security/sms-otp-enabled" component={SmsAuthenticationEnabled} />
                    <Route path="/security/enable-google-authenticator" component={GoogleAuthenticator} />
                    <Route path="/security/disable-account" component={DisableAccount} />


                    <Route path="/2fa" component={SecurityVerification} />
                    {/* <Route path="/security-verification-phone" component={PhoneVerification} />
                        <Route path="/security-verification-google" component={GoogleVerification} /> */}
                    <Route path="/security-verification-reset" component={ResetVerification} />


                    <Route path="/withdraw" component={Withdraw} />
                    <Route path="/deposit/:asset" component={Deposit} />
                    <Route path="/id-verify" component={IdVerify} />
                    <Route path="/address-verify" component={AddressVerify} />

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
    )
}


export {
    AuthenticatedRoutes,
    UnauthenticatedRoutes
}