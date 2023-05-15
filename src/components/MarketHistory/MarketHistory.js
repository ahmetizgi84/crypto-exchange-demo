import { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";
import DataContext from "../../context/DataContext";
import { RecentTradesSocketProvider } from "../../context/RecentTradesSocketContext";
// import RecentTradesSocketContext from "../../context/RecentTradesSocketContext";
import SkeletonRecentTrades from "../Skeletons/SkeletonRecentTrades";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { urlParser } from "../../utils/urlParser";
import recentTrades from "../../mocks/marketHistoryRecentTradesData.json";

function MarketHistory() {
  return (
    <RecentTradesSocketProvider>
      <MarketHistoryChild />
    </RecentTradesSocketProvider>
  );
}

export default MarketHistory;

function MarketHistoryChild() {
  const { quote, asset } = urlParser(window.location.href);
  // const { recentTrades } = useContext(RecentTradesSocketContext)
  const { setSellPrice, setBuyPrice } = useContext(DataContext);

  function renderChangeColor(value) {
    if (value === true) return "green";
    else if (value === false) return "red";
    return "gray";
  }

  const priceSetter = (price) => {
    setSellPrice(price);
    setBuyPrice(price);
  };

  return (
    <div className="market-history">
      <Tabs defaultActiveKey="recent-trades">
        <Tab eventKey="recent-trades" title="Recent Trades">
          {recentTrades?.length <= 0 ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => <SkeletonRecentTrades key={n} />)
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Price({quote})</th>
                  <th scope="col">Amount({asset})</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades?.map((item, i) => (
                  <tr key={i} onClick={() => priceSetter(item.price)}>
                    <td style={{ width: "30%" }}>
                      <Moment date={item.time} format="HH:mm:ss" />
                    </td>
                    <td style={{ width: "40%" }} className={renderChangeColor(item.buyerIsMaker)}>
                      {currencyFormatter(item.price)}
                    </td>
                    <td style={{ width: "30%" }}>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
