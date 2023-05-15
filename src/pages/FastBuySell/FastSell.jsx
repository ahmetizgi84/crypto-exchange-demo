import { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Select, Button, Typography, Input } from "antd";
import MarketPairsSocketContext from "../../context/MarketPairsSocketContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { urlParser } from "../../utils/urlParser";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { useHistory } from "react-router-dom";

import CoinBar from "./CoinBar";
import ApiContext from "../../context/ApiContext";
import { calculateTotalPrice, getQuantityWithRatioToBuy } from "../../utils/misc/calculation";
import getQuantityWithRatioToSell from "../../utils/misc/calculation/getQuantityWithRatioToSell";

const { Option } = Select;
const { Title } = Typography;

function FastSell() {
  const { user, _getQuoteAssetAvailableBalance, quoteAvailableBalance } = useContext(ApiContext);
  const { pair, quote, asset } = urlParser(window.location.href);
  const { data } = useContext(MarketPairsSocketContext);
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);
  const history = useHistory();
  const [choosed, setChoosed] = useState({});
  const [amountType, setAmountType] = useState("amount");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user) {
      _getQuoteAssetAvailableBalance({
        userId: user.userId,
        tenantId: user.tenantId,
        coin: quote,
      });
    }
  }, [user]);

  useEffect(() => {
    const foundMarket = data?.find((mrkt) => mrkt.symbol === pair) || {};
    setChoosed(foundMarket);
  }, [data]);

  let className = "gray";

  if (choosed?.priceChangePercent > 0) {
    className = "green";
  } else if (choosed?.priceChangePercent < 0) {
    className = "red";
  } else {
    className = "gray";
  }

  let defaultOptions = {
    significantDigits: 5,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbol: "",
  };

  if (pair === "SHIBUSDT" || pair === "HOTUSDT") {
    defaultOptions = {
      significantDigits: 8,
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbol: "",
    };
  }

  function handleChange(value) {
    setAmountType(value);
    setAmount(0);
    setTotal(0);
    const price = parseFloat(choosed?.lastPrice);

    if (value === "amount") {
      const totalPrice = amount * price;
      isNaN(totalPrice) ? setTotal(0) : setTotal(totalPrice);
    } else {
      const totalPrice = amount / price;
      isNaN(totalPrice) ? setTotal(0) : setTotal(totalPrice);
    }
  }

  function handleAmountChange(e) {
    const amount = parseFloat(e.target.value);
    const price = parseFloat(choosed?.lastPrice);
    setAmount(amount);

    if (amountType === "amount") {
      const totalPrice = calculateTotalPrice(amount, price);
      setTotal(totalPrice);
    } else {
      const totalPrice = amount / price;
      isNaN(totalPrice) ? setTotal(0) : setTotal(totalPrice);
    }
  }

  function balancePercentageHandler(percentage) {
    const price = parseFloat(choosed?.lastPrice);
    const amount = getQuantityWithRatioToSell(percentage, quoteAvailableBalance);

    if (amountType === "amount") {
      setAmount(amount);
      const totalPrice = calculateTotalPrice(amount, price);
      setTotal(totalPrice);
    } else {
      const totalPrice = calculateTotalPrice(amount, price);
      setAmount(totalPrice);
      setTotal(amount);
    }
  }

  return (
    <>
      <div className="exchange-bar">
        <Row>
          <CoinBar choosed={choosed} defaultOptions={defaultOptions} className={className} />
        </Row>
      </div>

      <Row>
        <Col md={12} className="text-center mt-5">
          <Title className="exchange-title">{currencyFormatter(choosed?.lastPrice, defaultOptions)}</Title>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <span className="exchange-balance-info">
            {isLoggedIn ? `My ${asset} balance: ${quoteAvailableBalance}` : `My ${asset} balance: 0`}
          </span>
        </Col>

        {/*<Col md={12}>*/}
        {/*  <span className="exchange-balance-info">{isLoggedIn ? `Obtainable: ${quoteAvailableBalance} $` : `Obtainable: 0 $`}</span>*/}
        {/*</Col>*/}

        <Col md={12} xs={12} className="mb-4">
          <Row>
            <Col md={3} xs={6}>
              <button className="btn-block fast-buy-sell-button" onClick={() => balancePercentageHandler(0.25)}>
                25%
              </button>
            </Col>

            <Col md={3} xs={6}>
              <button className="btn-block fast-buy-sell-button" onClick={() => balancePercentageHandler(0.5)}>
                50%
              </button>
            </Col>

            <Col md={3} xs={6}>
              <button className="btn-block fast-buy-sell-button" onClick={() => balancePercentageHandler(0.75)}>
                75%
              </button>
            </Col>

            <Col md={3} xs={6}>
              <button className="btn-block fast-buy-sell-button" onClick={() => balancePercentageHandler(1)}>
                100%
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="mt-4">
        <Row>
          <Col md={2}>
            <Select defaultValue="amount" size="large" className="btn-block" onChange={handleChange}>
              <Option value="amount">Amount</Option>
              <Option value="total">Total</Option>
            </Select>
          </Col>

          <Col md={10}>
            <Input
              placeholder="Amount"
              size="large"
              type="number"
              value={isNaN(amount) ? "" : amount}
              suffix={amountType === "amount" ? asset : quote}
              onChange={handleAmountChange}
            />
          </Col>
        </Row>
      </div>

      <Row>
        <Col md={12} className="mt-3">
          <div className="exchange-total py-3 py-3">
            <div className="d-flex align-items-center">
              {amountType === "amount" ? (
                <div className="mr-2 text-muted">Estimated price: </div>
              ) : (
                <div className="mr-2 text-muted">Estimated amount: </div>
              )}
              <div className="ml-2 exchange-total-price">{currencyFormatter(total, defaultOptions)}</div>
            </div>
            {amountType === "amount" ? (
              <div className="text-muted">{quote}</div>
            ) : (
              <div className="text-muted">{asset}</div>
            )}
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="my-4">
          {isLoggedIn ? (
            <button
              onClick={() => console.log("SELL ACTION HERE")}
              type="button"
              className="btn sell"
              disabled={Object.keys(choosed).length <= 0 && true}
            >
              SELL
            </button>
          ) : (
            <button
              type="button"
              className="btn sell"
              disabled={Object.keys(choosed).length <= 0 && true}
              onClick={() => history.push("/login")}
            >
              LOGIN OR SIGNUP
            </button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default FastSell;
