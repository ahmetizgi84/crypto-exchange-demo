import { Spinner } from "react-bootstrap";
import { useContext } from "react";
// import OrderBookSocketContext from "../../context/OrderBookSocketContext";
import { OrderBookSocketProvider } from "../../context/OrderBookSocketContext";
import DataContext from "../../context/DataContext";
import { ArrowDownRight, ArrowUpRight } from "react-bootstrap-icons";
import _ from "lodash";
import cn from "classnames";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { urlParser } from "../../utils/urlParser";
import bids from "../../mocks/orderBookBidsData.json";
import asks from "../../mocks/orderBookAsksData.json";

function OrderBook() {
  return (
    <OrderBookSocketProvider>
      <OrderBookChild />
    </OrderBookSocketProvider>
  );
}

export default OrderBook;

function OrderBookChild() {
  const { asset, quote } = urlParser(window.location.href);
  // const { asks, bids } = useContext(OrderBookSocketContext);
  const { setSellPrice, setBuyPrice } = useContext(DataContext);

  let defaultOptions = {
    significantDigits: 4,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbol: "",
  };

  if (asset === "SHIB" || asset === "HOT") {
    defaultOptions = {
      significantDigits: 8,
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbol: "",
    };
  }

  return (
    <>
      <div className="order-book mb15">
        <h2 className="heading">Order Book</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Price({quote})</th>
              <th scope="col" className="text-right">
                Amount({asset})
              </th>
              <th scope="col" className="text-right">
                Total({quote})
              </th>
            </tr>
          </thead>

          <tbody>
            {bids === null ? (
              <tr>
                <td colSpan="3">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : bids.length === 0 ? (
              <tr>
                <td colSpan="3">No data found</td>
              </tr>
            ) : (
              bids?.map((row, i) => {
                return (
                  <tr className={row.class} key={i} onClick={() => setSellPrice(row.price)}>
                    <td className="red">{currencyFormatter(row.price, defaultOptions)}</td>
                    <td className="text-right">{row.quantity}</td>
                    <td className="text-right">{(row.price * row.quantity).toFixed(2)}</td>
                  </tr>
                );
              })
            )}
          </tbody>

          <Obheading defaultOptions={defaultOptions} />

          <tbody>
            {asks === null ? (
              <tr>
                <td colSpan="3">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : asks.length === 0 ? (
              <tr>
                <td colSpan="3">No data found</td>
              </tr>
            ) : (
              asks?.map((row, i) => (
                <tr className={row.class} key={i} onClick={() => setBuyPrice(row.price)}>
                  <td className="green">{currencyFormatter(row.price, defaultOptions)}</td>
                  <td className="text-right">{row.quantity}</td>
                  <td className="text-right">{(row.price * row.quantity).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Obheading({ defaultOptions }) {
  // const { market } = useContext(DataContext);
  const market = {
    lastPrice: 12.56,
    priceChangePercent: 3.5,
  };

  let className = "gray";
  let arrow = null;

  if (market.priceChangePercent > 0) {
    className = "green";
    arrow = <ArrowUpRight color="var(--c-buy-grey)" size={12} />;
  } else if (market.priceChangePercent < 0) {
    className = "red";
    arrow = <ArrowDownRight color="#FF231F" size={12} />;
  } else {
    className = "gray";
    arrow = null;
  }

  return (
    <tbody className="ob-heading">
      <tr>
        <td className={className}>
          <span>Last Price</span>
          {currencyFormatter(market?.lastPrice, defaultOptions) || "N/A"} {arrow}
        </td>
        <td>
          <span></span>
        </td>
        <td className={cn([className, "text-right"])}>
          <span>Change</span>
          {market?.priceChangePercent || 0}%
        </td>
      </tr>
    </tbody>
  );
}
