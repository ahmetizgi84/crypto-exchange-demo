import { useContext } from "react";
import {
  MarketHistory,
  MarketBar,
  MarketPairs,
  MarketTrade,
  HistoryOrder,
  OrderBook,
  DepthChart,
} from '../components'
import TradingChart from "../components/TradingChart";
import TradingChartDark from "../components/TradingChartDark";

import ThemeContext from "../context/ThemeContext";



const Exchange = () => {
  const { theme } = useContext(ThemeContext)


  return (
    <div className="container-fluid mtb15 no-fluid">
      <div className="row sm-gutters">

        <div className="col-sm-12 col-md-9">
          <MarketBar />
          <div className="row sm-gutters">
            <div className="col-sm-12 col-md-4">
              <MarketPairs />
            </div>
            <div className="col-sm-12 col-md-8">
              {theme === "light" ? (
                <TradingChart />
              ) : (
                <TradingChartDark />
              )}
              <MarketTrade />
            </div>
          </div>

        </div>

        <div className="col-sm-12 col-md-3">
          <OrderBook />
          <MarketHistory />
        </div>

        <div className="col-md-9">
          <HistoryOrder />
        </div>
        <div className="col-md-3">
          <DepthChart />
        </div>



        {/* /////////////////////////////// */}
        {/* /////////////////////////////// */}
        {/* //////////// ESKİ ///////////// */}
        {/* /////////////////////////////// */}
        {/* /////////////////////////////// */}

        {/* <div className="col-sm-12 col-md-3">
          <MarketPairs />
        </div>
        <div className="col-sm-12 col-md-6">
          {theme === "light" ? (
            <TradingChart />
          ) : (
            <TradingChartDark />
          )}
          <MarketTrade />
        </div>

        <div className="col-md-3">
          <OrderBook />
          <MarketHistory />
        </div>

        <div className="col-md-3">
          <MarketNews />
        </div>
        <div className="col-md-9">
          <HistoryOrder />
        </div> 
        */}

      </div>
    </div>
  );
}


export default Exchange;




