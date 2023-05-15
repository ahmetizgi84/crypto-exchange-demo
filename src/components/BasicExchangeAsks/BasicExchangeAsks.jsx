import { useContext } from "react";
import { Spinner } from "react-bootstrap";
// import OrderBookSocketContext from "../../context/OrderBookSocketContext";
import DataContext from "../../context/DataContext";
import { OrderBookSocketProvider } from "../../context/OrderBookSocketContext";
import _ from "lodash";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { urlParser } from "../../utils/urlParser";
// import bids from "../../mocks/orderBookBidsData.json";
import asks from "../../mocks/orderBookAsksData.json";

function BasicExchangeAsks() {
  return (
    <OrderBookSocketProvider>
      <AsksChild />
    </OrderBookSocketProvider>
  );
}

export default BasicExchangeAsks;

function AsksChild() {
  const { asset, quote } = urlParser(window.location.href);
  // const { asks } = useContext(OrderBookSocketContext);
  const { setTotalAndPrice } = useContext(DataContext);

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
      <div className="order-book">
        <h2 className="heading">Asks</h2>
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
                <tr className={row.class} key={i} onClick={() => setTotalAndPrice(row)}>
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
