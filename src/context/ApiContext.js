import { createContext, useState, useContext, useCallback } from 'react'
import { Context as AuthContext } from './AuthContext'
import DataContext from './DataContext'
import { useHistory } from 'react-router-dom'
import binanceIntegrationApi from '../api/binanceIntegrationApi'
import backOfficeApi from '../api/woynexApi'
import exchangeApi from '../api/exchangeApi'
import constants from '../common/constants';
import { makeToast } from '../utils/makeToast';
import useAuth from '../hooks/useAuth'



const ApiContext = createContext();

/**
 * 
 * @TODO 
 * 1. if user is not logged in, manage api requests based on "isLoggedIn" state 
 * 2. gather methods which make similar jobs in seperate folders to maintain api call structure 
 */


export const ApiProvider = ({ children }) => {
    const { _logoutHandler } = useContext(AuthContext)
    const isLoggedIn = useAuth();
    const { pair } = useContext(DataContext)
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    const [openOrders, setOpenOrders] = useState([])
    const [orderHistory, setOrderHistory] = useState([])
    const [orderHistoryAll, setOrderHistoryAll] = useState([])

    const [user, setUser] = useState({})
    const [tierList, setTierList] = useState([])
    const [coinList, setCoinList] = useState([])
    const [networkList, setNetworkList] = useState([])
    const [addressRegex, setAddressRegex] = useState("")

    const [status, setStatus] = useState(true);
    const [subAccounts, setSubAccounts] = useState([])

    const [favorites, setFavorites] = useState([])
    const [currencyCodes, setCurrencyCodes] = useState([])
    const [pairList, setPairList] = useState([])
    const [originAddressList, setOriginAddressList] = useState([])


    const [commissionLevelList, setCommissionLevelList] = useState([]);
    const [commissionLevelListPage, setCommissionLevelListPage] = useState([]);

    const [bankAccounts, setBankAccounts] = useState([])
    const [tradeHistory, setTradeHistory] = useState([])

    const [myBalances, setMyBalances] = useState([])
    const [balances, setBalances] = useState([]);
    const [accountList, setAccountList] = useState([])

    const [tierLimitList, setTierLimitList] = useState([])

    const [wlIps, setWlIps] = useState([]);
    const [wlAddresses, setWlAddresses] = useState([]);


    const [coinNetwork, setCoinNetwork] = useState([]);

    const [userLoginActivity, setUserLoginActiviy] = useState([])
    const [fiatTransaction, setFiatTransaction] = useState([])

    const [userReferralList, setUserReferralList] = useState([])
    const [baseAvailableBalance, setBaseAvailableBalance] = useState(0);
    const [quoteAvailableBalance, setQuoteAvailableBalance] = useState(0)
    const [orderHistoryList, setOrderHistoryList] = useState([])

    /**
     *
     * Açık emirleri apiden çeken fonksiyon:
     * HistoryOrder komponenti içinde useEffect ile çağırılıyor.
     */


    const _fetchOpenOrders = async (params) => {
        if (isLoggedIn) {
            setLoading(true)
            try {
                const { data: { data } } = await binanceIntegrationApi.post(constants.OpenOrdersUrl, params)
                setOpenOrders(data)
                setLoading(false)
            } catch (error) {
                console.log("An error has been occured while fetching open orders data in _fetchOpenOrders(ApiContext): ", error.response)
                setLoading(false)
            }
        }
    }

    /**
     *
     * Geçmiş Orderları apiden çeken fonksiyon
     * HistoryOrder komponenti içinde useEffect ile çağırılıyor.
     *
     */
    const _fetchOrderHistory = async (params) => {
        if (isLoggedIn) {
            setLoading(true)
            try {
                const { data: { data } } = await binanceIntegrationApi.post(constants.OrderHistoryUrl, params)
                //console.log("orderhistory data: ", data)
                setOrderHistory(data)
                setLoading(false)
            } catch (error) {
                console.log("An error has been occured in _fetchOrderHistory(ApiContext): ", error.response)
                setLoading(false)
            }
        }
    }
    /**
     *
     * Geçmiş Tüm Orderları apiden çeken fonksiyon
     * HistoryOrder komponenti içinde useEffect ile çağırılıyor.
     /**
    * @TODO
    *Api tamamlandıktan sonra setOrderHistoryList state buradan kalkacak ve historyOrder comp. filtre kullanılacak
    */

    const _getOrderHistory = async (payload) => {
        if (isLoggedIn) {
            setLoading(true)
            try {
                const { data } = await exchangeApi.post(constants.OrderBookListUrl, payload)
                //console.log("orderhistory data: ", data.data.list)
                if (data.success) {
                    setOrderHistoryAll(data.data.list)
                    setOrderHistoryList(data.data.list)
                    setLoading(false)
                }
            } catch (error) {
                console.log("An error has been occured in _getOrderHistory (ApiContext): ", error.response)
                setLoading(false)
            }
        }
    }

    /**
     *
     * MarketTrade komponenti içinde Satış işlemini gerçekleştirmeye yarayan fn
     */
    const _onSubmitSell = async (params) => {
        setLoading(true)
        try {
            const { data } = await binanceIntegrationApi.post(constants.BinanceNewOrderUrl, params)
            //console.log("new sell data: ", data)
            if (data.success) {
                _fetchOpenOrders({ symbol: pair })
                makeToast('success', 'Satış talebi oluşturuldu.')
            } else {
                data?.errors?.map(error => {
                    makeToast('warn', error.message)
                    // if (error.code === '-1013') {
                    //     makeToast('warn', error.message) // Minimum tutar 0.00001'in katları olmalıdır.
                    // }
                    // if (error.code === '-2010') {
                    //     makeToast('warn', error.message) // Yeterli bakiye yok
                    // }
                })
            }
            setLoading(false)
        } catch (error) {
            console.log("An error has been occured in _onSubmitSell(ApiContext):", error.response)
            setLoading(false)
        }
    }

    /**
        *
        * MarketTrade komponenti içinde Alış işlemini gerçekleştirmeye yarayan fn
        */
    const _onSubmitBuy = async (params) => {
        setLoading(true)
        try {
            const { data } = await binanceIntegrationApi.post(constants.BinanceNewOrderUrl, params)
            //console.log("new order data: ", data)
            if (data.success) {
                _fetchOpenOrders({ symbol: pair })
                makeToast('success', 'Alış talebi oluşturuldu.')
            } else {
                data?.errors?.map(error => {
                    makeToast('warn', error.message)
                })
            }
            setLoading(false)
        } catch (error) {
            console.log("An error has been occured in _onSubmitBuy(ApiContext):", error.response)
            setLoading(false)
        }
    }

    /**
        *
        * HistoryOrder komponenti içinde Satış/Alış taleplerini iptal etmeye yarayan fn
        */
    const _cancelAnOpenOrder = async (params) => {
        setLoading(true)
        try {
            const { data } = await binanceIntegrationApi.post(constants.CancelAnOpenOrderUrl, params)
            //console.log("cancel order: ", data)
            if (data.success) {
                _fetchOpenOrders({ symbol: pair })
                makeToast('success', 'Successful')
            }
            setLoading(false)
        } catch (error) {
            console.log("An error has been occured in _cancelAnOpenOrder(ApiContext): ", error.response)
            setLoading(false)
        }
    }

    /**
     *
     * fetching whole user data
     */
    const _getCurrentUserData = async (payload) => {
        try {
            const { data: { data } } = await backOfficeApi.post(constants.GetUserUrl, payload)
            //console.log("response.data: ", data)
            setUser({ ...data })
        } catch (error) {
            console.log("error occured while fetching user data: ", error.response)
        }
    }

    /**
     *
     * Updating user information
     * which is coming from /User/Get
     */
    const _updateUser = async (payload) => {
        try {
            const { data } = await backOfficeApi.post(constants.UpdateUserUrl, payload)
            if (data.success) {
                makeToast("success", "Updated Successfully")
                const params = {
                    email: payload?.email,
                    userId: payload?.userId
                }
                _getCurrentUserData(params)
            }
        } catch (error) {
            console.log("error occured while update __updateUser(ApiContext): ", error.response)
            makeToast("error", "Update Failed!")
        }
    }

    const _updatePassword = async (payload) => {
        try {
            const { data } = await backOfficeApi.post(constants.UpdatePasswordUrl, payload)
            if (data.success) {
                makeToast("success", "Updated Successfully")
                setTimeout(() => {
                    _logoutHandler(history);
                }, 3000)
            }
        } catch (error) {
            if (error.response.data.Errors.length > 0) {
                makeToast("error", error.response.data.Errors[0].Message)
            }
        }
    }


    const _getTierList = async () => {
        const payload = {
            id: 0
        }
        try {
            const { data } = await exchangeApi.post(constants.GetTierList, payload)  // /TierSetting/List
            if (data.success) {
                //console.log("data: ", data.data.list)
                setTierList(data.data.list)
            }
        } catch (error) {
            console.log("An error has been in _getTierList(ApiContext): ", error.response)
        }
    }

    const _getCoinList = useCallback(async () => {
        if (isLoggedIn) {
            const payload = {
                criteria: { status: 1 },
            };
            try {
                const { data } = await exchangeApi.post(constants.CoinUrl, payload)
                if (data.success) {
                    setCoinList(data.data.list)
                    return true;
                } else {
                    makeToast('error', data.errors[0].message)
                    setLoading(false)
                    return false
                }
            } catch (error) {
                console.log("An error has been in _getCoinList(ApiContext): ", error.response)
            }
        }
    }, [])

    const _getCoinNetworkList = async (payload) => {
        try {
            const { data } = await exchangeApi.post(constants.GetCoinNetworkList, payload) // /CoinNetwork/List
            if (data.success) {
                setNetworkList(data.data.list)
            }
        } catch (error) {
            console.log("An error has been in _getCoinNetworkList(ApiContext): ", error.response)
        }
    }

    const _getCoinTransferNetworkList = async (payload) => {
        try {
            const { data } = await exchangeApi.post(constants.GetCoinTransferNetworkList, payload)  // /TransferNetwork/List
            if (data.success) {
                setNetworkList(data.data.list)
            }
        } catch (error) {
            console.log("An error has been in _getCoinNetworkList(ApiContext): ", error.response)
        }
    }

    const _getNetworkAddressRegex = async (payload) => {
        try {
            const { data } = await exchangeApi.post(constants.GetNetworkAddressRegex, payload) // /TransferNetwork/GetNetworkAddressRegexByNetworkCode
            if (data.success) {
                setAddressRegex(data.data)
            }
        } catch (error) {
            console.log("An error has been in _getNetworkAddressRegex (ApiContext): ", error.response)
        }
    }

    const _verifyUser = async (payload) => {
        try {
            const { data } = await backOfficeApi.post(constants.VerifyUser, payload) // /User/VerifyUser
            //console.log("response data: ", data)
            if (data.success) {
                setStatus(true)
            }
        } catch (error) {
            console.log("An error has been in _verifyUser(ApiContext): ", error.response)
            setStatus(false)
        }
    }

    const _getSubAccounts = async (payload) => {
        try {
            const { data } = await backOfficeApi.post(constants.UserListUrl, payload)
            //console.log("_getSubAccounts data: ", data)
            if (data.success) {
                setSubAccounts(data.data.list)
            }
        } catch (error) {
            console.log("An error has been in _getSubAccounts(ApiContext): ", error.response)
        }
    }

    const _getUserPairFavoriteList = async (payload) => {
        if (isLoggedIn) {
            try {
                const { data } = await exchangeApi.post(constants.UserFavoriteListUrl, payload)
                //console.log("_getUserPairFavoriteList data: ", data)
                if (data.success) {
                    setFavorites(data.data.list)
                    localStorage.setItem('favoriteData', JSON.stringify(data.data.list))
                }
            } catch (error) {
                console.log("An error has been in _getUserPairFavoriteList(ApiContext): ", error.response)
            }
        }
    }

    const _addUserPairFavorite = async (payload) => {
        try {
            const { data } = await exchangeApi.post(constants.AddUserPairFavorite, payload)
            //console.log("_addUserPairFavorite data: ", data)
            if (data.success) {
                const params = {
                    criteria: {
                        tenantId: user?.tenantId
                    }
                }
                _getUserPairFavoriteList(params)
            }
        } catch (error) {
            console.log("An error has been in _addUserPairFavorite(ApiContext): ", error.response)
        }
    }

    const _sendEmailToResetPassword = async (values) => {
        try {
            const { data } = await backOfficeApi.post(constants.SendEmailResetPassword, values)     //'/Auth/ForgotPassword'
            if (data.success) {
                makeToast('success', "Reset link has been successfully sent...")
                console.log("kkö")
            }
        } catch (error) {
            console.log("An error occured in _sendEmailToResetPassword: ", error.response)
            makeToast('error', "Email that you've entered is not available. Please try another one.")
        }
    }

    const _getForgotPasswordEmail = async (payload) => {
        try {
            const { data } = await backOfficeApi.post(constants.GetForgotPasswordEmail, payload)    //"/Auth/GetForgotPasswordEmail"
            //console.log("response data: ", data)
            if (data.success) {
                setStatus(true)
            }
        } catch (error) {
            console.log("An error has been in _getForgotPasswordEmail(ApiContext): ", error.response)
            setStatus(false)
        }
    }

    const _getCurrencyCodes = async () => {
        try {
            const payload = {
                criteria: {
                    coinType: 1 //fiat currency
                }
            }
            const { data } = await exchangeApi.post(constants.CoinUrl, payload)
            if (data.success) {
                setCurrencyCodes(data.data.list)
            }
        } catch (error) {
            console.log("An error has been in _getCurrencyCodes(ApiContext): ", error.response)
            setStatus(false)
        }
    }

    const _getPairList = async () => {
        try {
            const payload = {
                criteria: {
                    status: 1
                }
            }

            const { data } = await exchangeApi.post(constants.CoinPairUrl, payload)
            if (data.success) {
                setPairList(data.data.list)
            }
        } catch (error) {
            console.log("An error has been in _getPairList(ApiContext): ", error.response)
        }
    }

    // Fetching Commission Levels
    const _getCommissionLevelList = async () => {
        try {
            const { data } = await exchangeApi.post(constants.GetCommissionLevelList, {});      // "/CommissionLevel/List"
            //console.log("data: ", data);
            if (data.success) {
                setCommissionLevelList(data.data.list);
            }
        } catch (error) {
            console.log("Error occured in _getCommissionLevelList(ApiContext)", error.response);
        }
    };

    // Fetching Commission Levels
    const _getCommissionLevelListPage = async () => {
        try {
            const { data } = await exchangeApi.post(constants.GetCommissionLevelListPage, {});         //"/CommissionLevel/ListPage"
            //console.log("data: ", data);
            if (data.success) {
                setCommissionLevelListPage(data.data.list);
            }
        } catch (error) {
            console.log("Error occured in _getCommissionLevelListPage(ApiContext)", error.response);
        }
    };

    // get all bank accounts list which were added by user 
    const _getBankAccountList = async (payload) => {
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.BankAccountList, payload);
            if (data.success) {
                setBankAccounts(data.data.list);
                setLoading(false)
            }
        } catch (error) {
            console.log("Error occured in _getBankAccountList(ApiContext)", error.response);
            setLoading(false)
        }
    };

    // insert a new bank account
    const _addNewBankAccount = async (payload) => {
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.AddNewBankAccount, payload);
            if (data.success) {
                makeToast('success', 'Successful')
                _getBankAccountList({});
                setLoading(false)
                return true;
            } else {
                makeToast('error', data.errors[0].message)
                setLoading(false)
                return false
            }
        } catch (error) {
            console.log("Error occured in _addNewBankAccount(ApiContext)", error.response);
            setLoading(false)
            return false
        }
    };

    //update bank account
    const _updateBankAccount = async (payload) => {
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.UpdateBankAccount, payload);   //"/BankAccount/Update"
            if (data.success) {
                makeToast('success', 'Successful')
                _getBankAccountList({});
                setLoading(false)
                return true;
            } else {
                makeToast('error', data.errors[0].message)
                setLoading(false)
                return false
            }
        } catch (error) {
            console.log("Error occured in _updateBankAccount(ApiContext)", error.response);
            setLoading(false)
            return false
        }
    };

    // delete a bank account
    const _deleteBankAccount = async (id) => {
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.DeleteBankAccount, { id: id });        // "/BankAccount/Delete"
            //console.log("data", data);
            if (data.success) {
                makeToast("success", data.message);
                _getBankAccountList({});
                setLoading(false)
            } else {
                makeToast("error", "Error");
                setLoading(false)
            }
        } catch (error) {
            console.log("Error occured in deleteBankAccount(ApiContext): ", error.response);
            setLoading(false)
        }
    };

    const _getCoreParameters = async (payload) => {
        try {
            const { data } = await backOfficeApi.post(constants.GetCoreParameters, payload)  // "/Parameter/GetByKey"
            const addressOrigin = data.data.map(param => ({
                value: param.value,
                name: param.translations.tr || param.translations.en
            }))
            setOriginAddressList(addressOrigin);
        } catch (error) {
            console.log("error occured while fetching core parameters in _getCoreParameters(ApiContext): ", error.response)
        }
    }

    // fetching whole coin list which have balance amount or zero balance
    const _getAccountInfo = async () => {
        try {
            const { data } = await exchangeApi.post(constants.GetAccountInfo)       // '/GeneralAccount/GetAccountInfo'
            //console.log(data.data.balances)
            if (data.success) {
                //const myBalances = data.data.balances.filter(balance => balance.total > 0)
                setMyBalances(data.data.balances)
                setBalances(data.data.balances)
            }
        } catch (error) {
            console.log("Error occured in _getAccountInfo(ApiContext): ", error.response)
        }
    }

    // in order to get coin addresses, total and available balances which I have in my wallet
    const _getAccountList = async () => {
        try {
            const { data } = await exchangeApi.post(constants.GetAccountList, {})     // '/Account/List'
            //console.log("response: ", data)
            if (data.success) {
                setAccountList(data.data.list)
            }

        } catch (error) {
            console.log("Error occured in _getAccountList(ApiContext): ", error.response)
        }
    }

    // in order to get coin addresses which I have in my wallet
    const _getCurrentPrice = async (symbol = 'BTCUSDT') => {
        try {
            const { data } = await exchangeApi.post(`/Binance/GetPrice?Symbol=${symbol}`)
            //console.log("response: ", data)
            if (data.success) {
                return data.data.price
            }

        } catch (error) {
            console.log("Error occured in _getCurrentPrice(ApiContext): ", error.response)
        }
    }

    // tierlimits showing in wallet TransactionLimits component
    const _getTierLimitList = async () => {
        try {
            const { data } = await exchangeApi.post(constants.GetTierLimitList, {})       //'/TierLimit/List'
            //console.log("response: ", data)
            if (data.success) {
                setTierLimitList(data.data.list)
            }

        } catch (error) {
            console.log("Error occured in _getTierLimitList(ApiContext): ", error.response)
        }
    }
    //trade history data
    const _getTradeHistory = async (payload) => {
        console.log(payload)
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.OrderBookListUrl, payload)      //"/OrderBook/list"
            if (data.success) {
                setTradeHistory(data.data.list)
                setLoading(false)
            }
        } catch (error) {
            console.log("An error has been occured in _getTradeHistory (ApiContext): ", error.response)
            setLoading(false)
        }
    }

    // fetching whitelist ip's of user
    const _fetchWhitelistIps = async (payload) => {
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.WhiteListIpUrl, payload);
            console.log("response: ", data)
            if (data.success) {
                const { data: { list } } = data;
                setWlIps(list);
                setLoading(false)
            }
        } catch (error) {
            console.log("An error has been occured in _fetchWhitelistIps(ApiContext): ", error.response);
            setLoading(false)
        }
    };

    const _saveWhitelistIp = async (payload) => {
        setLoading(true)
        try {
            const { data } = await exchangeApi.post(constants.WhiteListInsertIpUrl, payload);
            //console.log('data', data)
            if (data.success) {
                setWlIps([...wlIps, data.data]);
                makeToast('success', 'Successful.')
                setLoading(false)
            }
        } catch (error) {
            console.log("An error has been occured in _saveWhitelistIp(ApiContext):", error.response);
            setLoading(false)
        }
    }


    const _fetchWhitelistAddresses = async (payload) => {
        try {
            const { data } = await exchangeApi.post(constants.WhiteListAddressUrl, payload);
            if (data.success) {
                const {
                    data: { list },
                } = data;
                setWlAddresses(list);
            }
        } catch (error) {
            console.log("An error has been occured in _fetchWhitelistAddresses(ApiContext):", error.response);
        }
    };

    // in order to get coin's transfer network
    const _getTransferNetwork = async (payload) => {
        try {
            //console.log("pay", payload)
            const { data } = await exchangeApi.post(constants.GetTransferNetwork, payload);   //'/TransferNetwork/GetTransferNetworkBySymbol'
            if (data.success) {
                setCoinNetwork(data.data);
            }
        } catch (error) {
            console.log("An error occured in _getTransferNetwork(ApiContext): ", error.response);
        }
    };

    // in order to get user's login Activity
    const _getUserLoginActivity = async () => {

        try {
            const { data } = await backOfficeApi.post(constants.GetUserLoginActivity, {});    // '/UserLoginActivity/List'
            if (data.success) {
                setUserLoginActiviy(data.data.list);
            }
        } catch (error) {
            console.log("An error occured in _getUserLoginActivity(ApiContext): ", error.response);
        }
    };



    const _getFiatTransaction = async payload => {
        try {
            const { data } = await exchangeApi.post(constants.GetFiatTransaction, payload)     // '/FiatTransaction/List'
            if (data.success) {
                setFiatTransaction(data.data.list)
            }

        } catch (error) {
            console.log("Error occured in _getFiatTransaction(ApiContext): ", error.response)
        }
    }

    const _getUserReferralList = async payload => {
        try {
            const { data } = await exchangeApi.post(constants.GetUserReferralList, payload)         // '/UserReferral/List'
            if (data.success) {
                setUserReferralList(data.data.list)
            }

        } catch (error) {
            console.log("Error occured in _getUserReferralList(ApiContext): ", error.response)
        }
    }


    const _deleteWhitelistIP = async id => {
        try {
            const { data } = await exchangeApi.post(constants.DeleteWhitelistIP, { id: id });   // /WhitelistIp/Delete
            if (data.success) {
                makeToast("success", data.message);
                const payload = {
                    Criteria: { tenantId: user?.tenantId },
                };
                _fetchWhitelistIps(payload);
            } else {
                makeToast("error", "Error");
            }
        } catch (error) {
            console.log("Error occured in _deleteWhitelistIP(ApiContext): ", error.response);
        }
    }

    const _saveWhitelistAddress = async payload => {
        try {
            const { data } = await exchangeApi.post(constants.WhiteListInsertAddressUrl, payload); // /whitelistAddress/Insert
            if (data.success) {
                setWlAddresses([...wlAddresses, data.data]);
                makeToast("success", "Successful.");
                return true;
            } else {
                makeToast('error', data.errors[0].message)
                return false
            }
        } catch (error) {
            makeToast("error", "Create Failed!");
            console.log("whitelist address error in _saveWhitelistAddress(ApiContext): ", error.response);
        }
    }

    const _deleteWhitelistAddress = async payload => {
        try {
            const { data } = await exchangeApi.post('/WhitelistAddress/Delete', payload); // /whitelistAddress/Delete
            if (data.success) {
                makeToast("success", "Successful.");
                const payload = {
                    criteria: { tenantId: user?.tenantId },
                };
                _fetchWhitelistAddresses(payload);
            }
        } catch (error) {
            makeToast("error", "Delete Failed!");
            console.log("Error occured in _deleteWhitelistAddress(ApiContext): ", error.response);
        }
    }

    const _getBaseAssetAvailableBalance = async payload => {
        if (isLoggedIn) {
            try {
                const { data } = await exchangeApi.post(constants.GetBaseAssetAvailableBalance, payload) // '/Account/GetBalance'
                if (data.success) {
                    setBaseAvailableBalance(data.data || 0)
                }
            } catch (error) {
                console.log("Error occured in _getBaseAssetAvailableBalance(ApiContext): ", error.response)
            }
        }
    }

    const _getQuoteAssetAvailableBalance = async payload => {
        if (isLoggedIn) {
            try {
                const { data } = await exchangeApi.post(constants.GetBaseAssetAvailableBalance, payload) // '/Account/GetBalance'

                if (data.success) {
                    setQuoteAvailableBalance(data.data || 0)
                }
            } catch (error) {
                console.log("Error occured in _getQuoteAssetAvailableBalance(ApiContext): ", error.response)
            }
        }
    }

    const initialState = {
        loading,
        openOrders,
        orderHistory,
        orderHistoryAll,
        user,
        status,
        subAccounts,
        tierList,
        favorites,
        coinList,
        networkList,
        currencyCodes,
        pairList,
        originAddressList,
        commissionLevelList,
        commissionLevelListPage,
        bankAccounts,
        myBalances,
        balances,
        accountList,
        tierLimitList,
        addressRegex,
        tradeHistory,
        wlIps,
        wlAddresses,
        coinNetwork,
        userLoginActivity,
        fiatTransaction,
        userReferralList,
        orderHistoryList,
        setBalances,
        setMyBalances,
        setFiatTransaction,
        setTradeHistory,
        setWlIps,
        setOrderHistory,
        setOrderHistoryAll,
        setOrderHistoryList,
        setOpenOrders,
        setWlAddresses,
        setBankAccounts,
        setSubAccounts,
        setFavorites,
        setCoinNetwork,
        baseAvailableBalance,
        quoteAvailableBalance,
        _getCurrentPrice,
        _deleteWhitelistAddress,
        _deleteBankAccount,
        _saveWhitelistAddress,
        _deleteWhitelistIP,
        _getUserReferralList,
        _getUserLoginActivity,
        _getTransferNetwork,
        _fetchWhitelistAddresses,
        _fetchWhitelistIps,
        _saveWhitelistIp,
        _fetchOpenOrders,
        _fetchOrderHistory,
        _cancelAnOpenOrder,
        _getCurrentUserData,
        _updateUser,
        _updatePassword,
        _onSubmitSell,
        _onSubmitBuy,
        _getTierList,
        _verifyUser,
        _getSubAccounts,
        _getUserPairFavoriteList,
        _addUserPairFavorite,
        _sendEmailToResetPassword,
        _getForgotPasswordEmail,
        _getCoinList,
        _getCoinNetworkList,
        _getCurrencyCodes,
        _getCommissionLevelList,
        _getCommissionLevelListPage,
        _getBankAccountList,
        _getPairList,
        _getAccountInfo,
        _getAccountList,
        _getTierLimitList,
        _getCoreParameters,
        _getCoinTransferNetworkList,
        _getNetworkAddressRegex,
        _getTradeHistory,
        _addNewBankAccount,
        _getBaseAssetAvailableBalance,
        _getQuoteAssetAvailableBalance,
        _updateBankAccount,
        _getFiatTransaction,
        _getOrderHistory

    }

    return (
        <ApiContext.Provider value={initialState}>
            {children}
        </ApiContext.Provider>
    )
}

function useApi() {
    const context = useContext(ApiContext)
    if (context === undefined) {
        throw new Error('useApi must be used within a ApiProvider')
    }
    return context
}

export default ApiContext