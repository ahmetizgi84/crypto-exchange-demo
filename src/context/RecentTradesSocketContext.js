import { createContext, useEffect, useState } from "react";
import { LogLevel, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import _ from "lodash";
import constants from "../common/constants";
import { urlParser } from "../utils/urlParser";

// REACT_APP_RECENTTRADES_SOCKET_URL=https://dev-socket.woynex.com/recentTradeHub

const RecentTradesSocketContext = createContext();

export const RecentTradesSocketProvider = ({ children }) => {
  const { pair } = urlParser(window.location.href);
  const [connection, setConnection] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);

  const initialState = {
    recentTrades,
  };

  /**
   * creating a new connection and setting to 'connection' state
   */
  useEffect(() => {
    if (connection != null) {
      connection.stop();
      setConnection(null);
      setRecentTrades([]);
    }

    const connect = new HubConnectionBuilder()
      .withUrl(constants.RecentTradesSocketUrl)
      .withAutomaticReconnect()
      //.configureLogging(LogLevel.Warning)
      //.configureLogging(LogLevel.Information)
      //.configureLogging(LogLevel.Debug)
      .build();

    setConnection(connect);

    return function cleanup() {
      connect.stop();
      setConnection(null);
    };
  }, [pair]);

  /**
   * After assigning the connection,
   * subscribing to the relevant channel.
   */
  useEffect(() => {
    if (connection != null) {
      let tempList = [];
      connection.on("SubscribeToAggregatedTradeUpdates", (message) => {
        tempList.push(message);
        //console.log("SubscribeToAggregatedTradeUpdates", tempList)
        if (tempList.length > 0) {
          setRecentTrades([...tempList]);
        }
        if (tempList.length >= 10) {
          tempList.shift(); // ilk datayı çıkar
          //setRecentTrades([...tempList])
        }
      });

      startConnection(connection);

      // connection.onclose(async () => {
      //     console.assert(connection.state === HubConnectionState.Disconnected);
      //     //await startConnection();
      // });
    }
  }, [connection]);

  function startConnection(conn) {
    try {
      conn
        .start()
        .then(() => {
          conn.send("SubscribeToSymbol", pair);
        })
        .catch((err) => console.log("signalR baglantisi olusturulurken hata meydana geldi! - recentTrades", err));
    } catch (error) {
      console.log("An error occured while attempting to start connection in RecentTradesSocket: ", error);
      setTimeout(startConnection, 5000);
    }
  }

  return <RecentTradesSocketContext.Provider value={initialState}>{children}</RecentTradesSocketContext.Provider>;
};

export default RecentTradesSocketContext;
