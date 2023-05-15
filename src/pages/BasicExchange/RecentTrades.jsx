import { useContext } from "react";
import Moment from "react-moment";
// import RecentTradesSocketContext from "../../context/RecentTradesSocketContext";
import SkeletonRecentTrades from "../../components/Skeletons/SkeletonRecentTrades";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { urlParser } from "../../utils/urlParser";
import recentTrades from "../../mocks/marketHistoryRecentTradesData.json";

function RecentTrades() {
  const { quote, asset } = urlParser(window.location.href);
  // const { recentTrades } = useContext(RecentTradesSocketContext);

  return recentTrades?.length <= 0 ? (
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <SkeletonRecentTrades key={n} />)
  ) : (
    <table className="table basic-exchange-table">
      <thead>
        <tr>
          <th scope="col">Transaction</th>
          <th scope="col">Time</th>
          <th scope="col">Price({quote})</th>
          <th scope="col">Amount({asset})</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {recentTrades?.map((item, i) => (
          <tr key={i}>
            <td style={{ width: "20%" }}>
              <Box value={item.buyerIsMaker} />
            </td>
            <td style={{ width: "20%" }}>
              <Moment date={item.time} format="HH:mm:ss" />
            </td>
            <td style={{ width: "20%" }}>{currencyFormatter(item.price)}</td>
            <td style={{ width: "20%" }}>{item.quantity}</td>
            <td style={{ width: "20%" }}>{currencyFormatter(item.price * item.quantity)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentTrades;

function Box({ value }) {
  const red = {
    width: 40,
    border: "1px solid var(--c-buttonSell)",
    height: 22,
    borderRadius: 3,
    textAlign: "center",
    color: "var(--c-buttonSell)",
  };

  const green = {
    width: 40,
    border: "1px solid var(--c-buttonBuy)",
    height: 22,
    borderRadius: 3,
    textAlign: "center",
    color: "var(--c-buttonBuy)",
  };

  return <div style={value === true ? { ...green } : { ...red }}>{value === true ? "BUY" : "SELL"}</div>;
}
