import logo from '../assets/images/WoynExLogoYatay.png'
import cardLogo from '../assets/images/CardLogo.png'
import front from '../assets/images/Front.png'
import back from '../assets/images/Back.png'
import selfie from '../assets/images/Selfie.png'
import playStore from '../assets/images/playStore.png'
import appStore from '../assets/images/appStore.png'


export const BinanceIntegrationApiUrl = process.env.REACT_APP_BINANCEINTEGRATION_API_URL;
export const WoynexBackOfficeApiUrl = process.env.REACT_APP_WOYNEX_BACKOFFICE_API_URL;
export const ExchangeApiUrl = process.env.REACT_APP_EXCHANGE_API_URL;


export const WoynexSocketUrl = process.env.REACT_APP_WOYNEX_WEBSOCKET_URL;
export const WoynexUrl = process.env.REACT_APP_WOYNEX_URL;

export const MarketPairsSocketUrl = process.env.REACT_APP_MARKETPAIRS_SOCKET_URL;
export const OrderbookSocketUrl = process.env.REACT_APP_ORDERBOOK_SOCKET_URL;
export const RecentTradesSocketUrl = process.env.REACT_APP_RECENTTRADES_SOCKET_URL;


export const LoginUrl = process.env.REACT_APP_LOGIN_URL;
export const RegisterUrl = process.env.REACT_APP_REGISTER_URL;
export const OpenOrdersUrl = process.env.REACT_APP_OPEN_ORDERS_URL;
export const OrderHistoryUrl = process.env.REACT_APP_ORDER_HISTORY_URL;
export const CancelAnOpenOrderUrl = process.env.REACT_APP_CANCEL_AN_OPEN_ORDER_URL;
export const GetUserUrl = process.env.REACT_APP_GET_USER_URL;
export const UpdateUserUrl = process.env.REACT_APP_UPDATE_USER_URL;
export const UpdatePasswordUrl = process.env.REACT_APP_UPDATE_PASSWORD_URL;
export const GetTierList = process.env.REACT_APP_GET_TIER_LIST_URL;
export const WhiteListAddressUrl = process.env.REACT_APP_WHITELIST_ADDRESS_URL;
export const WhiteListInsertAddressUrl = process.env.REACT_APP_INSERT_WHITELIST_ADDRESS_URL;
export const WhiteListIpUrl = process.env.REACT_APP_WHITELIST_IP_URL;
export const WhiteListInsertIpUrl = process.env.REACT_APP_INSERT_WHITELIST_IP_URL;
export const CoinUrl = process.env.REACT_APP_GET_COIN_URL;
export const GetCoinNetworkList = process.env.REACT_APP_GET_COIN_NETWORK_LIST_URL;
export const GetCoinTransferNetworkList = process.env.REACT_APP_GET_COIN_TRANSFER_NETWORK_LIST_URL;
export const GetNetworkAddressRegex = process.env.REACT_APP_GET_TRANSFER_NETWORK_ADDRESS_REGEX_URL;
export const VerifyUser = process.env.REACT_APP_VERIFY_USER_URL;


export const CoinPairUrl = process.env.REACT_APP_GET_COIN_PAIR_URL;
export const OrderBookListUrl = process.env.REACT_APP_ORDERBOOK_LIST_URL;
export const UserListUrl = process.env.REACT_APP_USER_LIST_URL;
export const UserFavoriteListUrl = process.env.REACT_APP_USER_FAVORITE_LIST_URL;
export const AddUserPairFavorite = process.env.REACT_APP_ADD_USER_PAIR_FAVORITE_URL
export const BankAccountList = process.env.REACT_APP_GET_BANK_ACCOUNT_LİST_URL
export const AddNewBankAccount = process.env.REACT_APP_ADD_NEW_BANK_ACCOUNT_URL
export const SendEmailResetPassword = process.env.REACT_APP_SEND_EMAIL_RESET_PASSWORD_URL
export const GetForgotPasswordEmail = process.env.REACT_APP_GET_FORGOT_PASSWORD_EMAIL_URL
export const GetCommissionLevelList = process.env.REACT_APP_GET_COMMISSION_LEVEL_LIST_URL
export const GetCommissionLevelListPage = process.env.REACT_APP_GET_COMMISSION_LEVEL_LIST__PAGE_URL
export const UpdateBankAccount = process.env.REACT_APP_UPDATE_BANK_ACCOUNT_URL
export const DeleteBankAccount = process.env.REACT_APP_DELETE_BANK_ACCOUNT_URL
export const GetCoreParameters = process.env.REACT_APP_GET_CORE_PARAMETERS_URL
export const GetAccountInfo = process.env.REACT_APP_GET_ACCOUNT_INFO_URL
export const GetAccountList = process.env.REACT_APP_GET_ACCOUNT_LIST_URL
export const GetTierLimitList = process.env.REACT_APP_GET_TIER_LIMIT_LIST_URL
export const GetTransferNetwork = process.env.REACT_APP_GET_TRANSFER_NETWORK_URL
export const GetUserLoginActivity = process.env.REACT_APP_GET_USER_LOGIN_ACTIVITY_URL
export const GetFiatTransaction = process.env.REACT_APP_GET_FIAT_TRANSACTION_URL
export const GetUserReferralList = process.env.REACT_APP_GET_USER_REFERRAIL_LIST_URL
export const DeleteWhitelistIP = process.env.REACT_APP_DELETE_WHITE_LIST_IP_URL
export const GetBaseAssetAvailableBalance = process.env.REACT_APP_BASE_ASSET_AVAILABLE_BALANCE_URL


export const BinanceNewOrderUrl = process.env.REACT_APP_NEWORDER_URL;


// const logo = require('../assets/images/WoynExLogoYatay.png')


const constants = {
    BinanceIntegrationApiUrl, 
    WoynexSocketUrl, 
    WoynexUrl,
    WoynexBackOfficeApiUrl,
    ExchangeApiUrl,
    
    LoginUrl,
    RegisterUrl,
    OpenOrdersUrl,
    OrderHistoryUrl,
    CancelAnOpenOrderUrl,
    GetUserUrl,
    UpdateUserUrl,
    UpdatePasswordUrl,
    GetTierList,
    MarketPairsSocketUrl,
    OrderbookSocketUrl,
    RecentTradesSocketUrl,
    WhiteListAddressUrl,
    WhiteListInsertAddressUrl,
    WhiteListInsertIpUrl,
    WhiteListIpUrl,
    CoinUrl,
    GetCoinNetworkList,
    GetCoinTransferNetworkList,
    GetNetworkAddressRegex,
    VerifyUser,
    CoinPairUrl,
    BinanceNewOrderUrl,
    OrderBookListUrl,
    UserListUrl,
    UserFavoriteListUrl,
    AddUserPairFavorite,
    BankAccountList,
    AddNewBankAccount,
    SendEmailResetPassword,
    GetForgotPasswordEmail,
    GetCommissionLevelList,
    GetCommissionLevelListPage,
    UpdateBankAccount,
    DeleteBankAccount,
    GetCoreParameters,
    GetAccountInfo,
    GetAccountList,
    GetTierLimitList,
    GetTransferNetwork,
    GetUserLoginActivity,
    GetFiatTransaction,
    GetUserReferralList,
    DeleteWhitelistIP,
    GetBaseAssetAvailableBalance,
    


    logo,
    front,
    back,
    selfie,
    cardLogo,
    playStore,
    appStore,
}

export default constants