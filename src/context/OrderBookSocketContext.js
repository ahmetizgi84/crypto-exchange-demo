import { createContext, useEffect, useState } from "react";
// import { LogLevel, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";
import _ from "lodash";
import constants from "../common/constants";
import { urlParser } from "../utils/urlParser";

/*
https://stackoverflow.com/questions/19304157/getting-the-reason-why-websockets-closed-with-close-code-1006
https://stackoverflow.com/questions/53944572/signalr-core-error-websocket-closed-with-status-code-1006
https://github.com/aspnet/SignalR/issues/2150
*/

const OrderBookSocketContext = createContext();

export const OrderBookSocketProvider = ({ children }) => {
  const { pair } = urlParser(window.location.href);
  const [connection, setConnection] = useState(null);
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  const [depthChartAsks, setDepthChartAsks] = useState([]);
  const [depthChartBids, setDepthChartBids] = useState([]);

  const initialState = {
    asks,
    bids,
    depthChartAsks,
    depthChartBids,
  };

  /**
   * creating a new connection and setting to 'connection' state
   */
  useEffect(() => {
    if (connection != null) {
      connection.stop();
      setConnection(null);
    }

    const connect = new HubConnectionBuilder()
      .withUrl(constants.OrderbookSocketUrl)
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
      connection.on("OnPartialOrderBookUpdates", (message) => {
        let Bids = message.bids;
        let Asks = message.asks;

        setDepthChartAsks(Asks);
        setDepthChartBids(Bids);

        let newBids = createSpreadBar(Bids, "bids");
        let newAsks = createSpreadBar(Asks, "asks");

        setBids(newBids);
        setAsks(newAsks);
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
          conn.send("SubscribeToParite", pair);
        })
        .catch((err) => console.log("signalR baglantisi olusturulurken hata meydana geldi! - orderbook", err));
    } catch (error) {
      console.log("An error occured while attempting to start connection in Orderbooksocket: ", error);
      setTimeout(startConnection, 5000);
    }
  }

  const createSpreadBar = (deger, type) => {
    const data = deger.map((d) => d.quantity);
    let maxVal = Math.max(...data);

    const newArray = [];
    deger.map((b, index) => {
      let yuzde = ((b.quantity * 100) / maxVal).toFixed(2);
      let className = "";

      if (type == "bids") {
        if (yuzde > 0 && yuzde <= 12.5) {
          className = "red-bg";
        } else if (yuzde > 12.5 && yuzde <= 25) {
          className = "red-bg-5";
        } else if (yuzde > 25 && yuzde <= 37.5) {
          className = "red-bg-8";
        } else if (yuzde > 37.5 && yuzde <= 50) {
          className = "red-bg-20";
        } else if (yuzde > 50 && yuzde <= 62.5) {
          className = "red-bg-40";
        } else if (yuzde > 62.5 && yuzde <= 75) {
          className = "red-bg-60";
        } else if (yuzde > 75) {
          className = "red-bg-80";
        }
      } else {
        if (yuzde > 0 && yuzde <= 12.5) {
          className = "green-bg";
        } else if (yuzde > 12.5 && yuzde <= 25) {
          className = "green-bg-5";
        } else if (yuzde > 25 && yuzde <= 37.5) {
          className = "green-bg-8";
        } else if (yuzde > 37.5 && yuzde <= 50) {
          className = "green-bg-20";
        } else if (yuzde > 50 && yuzde <= 62.5) {
          className = "green-bg-40";
        } else if (yuzde > 62.5 && yuzde <= 75) {
          className = "green-bg-60";
        } else if (yuzde > 75) {
          className = "green-bg-80";
        }
      }

      newArray[index] = {
        price: b.price,
        quantity: b.quantity,
        class: className,
      };
    });
    return newArray;
  };

  return <OrderBookSocketContext.Provider value={initialState}>{children}</OrderBookSocketContext.Provider>;
};

export default OrderBookSocketContext;
