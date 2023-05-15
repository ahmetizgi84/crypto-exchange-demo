import { createContext, useEffect, useState, useContext } from 'react'
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr";
import useFetch from '../hooks/useFetch';
import _ from "lodash";
import { coinIcons } from '../assets/icons';
import constants from '../common/constants';
import ApiContext from './ApiContext';

export const MarketPairsSocketContext = createContext()
const URL = "/Binance/GetAllCoinList"

export const MarketPairsSocketProvider = ({ children }) => {
    const { favorites } = useContext(ApiContext)
    const { data: allPairsList, loading, error } = useFetch(URL, "post")
    const [connection, setConnection] = useState(null);
    const [data, setData] = useState(null)
    const [marketList, setMarketList] = useState([])

    const initialState = {
        data: marketList,
        loading,
        allPairsList,
    }




    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(constants.MarketPairsSocketUrl)
            .withAutomaticReconnect()
            //.configureLogging(LogLevel.Warning)
            //.configureLogging(LogLevel.Information)
            //.configureLogging(LogLevel.Debug)
            .build();

        setConnection(connect);

        return function cleanup() {
            //console.log("MarketPairs soket kapatıldı")
            connect.stop()
            setConnection(null)
        }

    }, []);




    useEffect(() => {
        if (!loading && connection) {
            connection
                .start()
                .then(() => {
                    connection.on("OnAllSymbolTickerUpdate", (message) => {
                        const allPairsListCopy = allPairsList ? [...allPairsList] : []
                        let mergedPairList = _.map(allPairsListCopy, function (obj) {
                            return _.assign(obj, _.find(message, { symbol: obj.symbol }));
                        });

                        mergedPairList.map(item => {
                            const symbol = item.symbol
                            const isExist = coinIcons.some(ci => ci.symbol === symbol)
                            if (isExist) {
                                let found = coinIcons.find(ci => ci.symbol === symbol)
                                item.image = found.image
                            } else {
                                const woynex = coinIcons.find(ci => ci.symbol === 'WOYNEX')
                                item.image = woynex.image
                            }
                        })

                        let sortedData = mergedPairList.sort((a, b) =>
                            a.symbol > b.symbol ? 1 : -1
                        );
                        setData(sortedData)
                    });
                })
                .catch((error) => {
                    console.log("MarketPairsSocket Error: ", error)
                    // Sockette hata meydana geldiğinde No data found! göstemek yerine allPairsList listesini gösteriyor
                    const allPairsListCopy = allPairsList ? [...allPairsList] : []
                    allPairsListCopy.map(item => {
                        const symbol = item.symbol
                        const isExist = coinIcons.some(ci => ci.symbol === symbol)
                        if (isExist) {
                            let found = coinIcons.find(ci => ci.symbol === symbol)
                            item.image = found.image
                        } else {
                            const woynex = coinIcons.find(ci => ci.symbol === 'WOYNEX')
                            item.image = woynex.image
                        }

                    })
                    setData([...allPairsListCopy])
                    // Sockette hata meydana geldiğinde No data found! göstemek yerine allPairsList listesini gösteriyor
                });
        }


    }, [connection, loading]);


    useEffect(() => {
        const allPairsListCopy = data ? [...data] : []

        if (favorites.length) {
            //console.log("favs: ", favorites)
            allPairsListCopy.map(item => {
                const isFavorite = favorites.some(favorite => favorite.pair === item.symbol)
                if (isFavorite) {
                    item.isFavorite = true
                } else {
                    item.isFavorite = false
                }
            })

        }
        setMarketList([...allPairsListCopy])

    }, [favorites, data])




    return (
        <MarketPairsSocketContext.Provider value={initialState}>
            {
                children
            }
        </MarketPairsSocketContext.Provider>
    )
}

export default MarketPairsSocketContext;