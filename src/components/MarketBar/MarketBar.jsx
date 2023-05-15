import { useContext, useState, useEffect } from "react";
import { MarketPairsSocketProvider } from "../../context/MarketPairsSocketContext";
import MarketPairsSocketContext from "../../context/MarketPairsSocketContext";
import { Row, Col } from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";
import cn from "classnames";
import millify from "millify";
import { Alert } from "antd";
import { TextLoop } from "react-text-loop-next";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { urlParser } from "../../utils/urlParser";

const MarketBar = () => {
  return (
    <MarketPairsSocketProvider>
      <MarketBarChild />
    </MarketPairsSocketProvider>
  );
};

export default MarketBar;

const MarketBarChild = () => {
  const { pair } = urlParser(window.location.href);
  const { data } = useContext(MarketPairsSocketContext);
  const [choosed, setChoosed] = useState({});

  useEffect(() => {
    // const foundMarket = data?.find((mrkt) => mrkt.symbol === pair) || {};
    const foundMarket = {
      image: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      lastPrice: 11.98,
      priceChangePercent: 3,
      highPrice: 12,
      lowPrice: 10,
      quoteVolume: 1234,
    };
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
    significantDigits: 4,
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

  if (Object.keys(choosed).length <= 0) {
    return (
      <div className="market-bar mb-3 px-3">
        <Row>
          <Col md={6} xs={12}>
            <Row>
              <Col md={2} xs={12} className="text-center">
                <QuestionCircleFill color="gray" size={22} />
                <div className="balance-value">{"Pair"}</div>
              </Col>

              <Col md={2} xs={4}>
                <span className="balance-value">{"Last Price"}</span>
                <div className={cn(["balance-value"])}>{"N/A"}%</div>
              </Col>

              <Col md={2} xs={4}>
                <span className="text-muted">Change</span>
                <div className="balance-value">{"N/A"}</div>
              </Col>

              <Col md={2} xs={4}>
                <span className="text-muted">High</span>
                <div className="balance-value">{"N/A"}</div>
              </Col>

              <Col md={2} xs={4}>
                <span className="text-muted">Low</span>
                <div className="balance-value">{"N/A"}</div>
              </Col>

              <Col md={2} xs={4}>
                <span className="text-muted">Volume</span>
                <div className="balance-value">{"N/A"}</div>
              </Col>
            </Row>
          </Col>

          <Col md={6} xs={12}>
            <Alert
              banner
              type="info"
              message={
                <TextLoop mask>
                  <div>Hebys News</div>
                  <div>Introducing Santos FC Fan Token (SANTOS) on Binance Launchpool!</div>
                  <div>Hebys Will List JasmyCoin (JASMY)</div>
                  <div>Hebys Adds ENS on Margin, Launches Interest Rate Promotion!</div>
                </TextLoop>
              }
            />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="market-bar mb-3 px-3">
      <Row>
        <Col md={6} xs={12}>
          <Row>
            <Col md={2} xs={12} className="text-center">
              <img src={choosed?.image} alt="coin" style={{ width: "22px", height: "22px", textAlign: "center" }} />
              <div className="balance-value asset">{choosed?.baseAsset + "/" + choosed?.quoteAsset || "N/A"}</div>
            </Col>

            <Col md={2} xs={4}>
              <span className={cn([className])}>{currencyFormatter(choosed?.lastPrice, defaultOptions) || "N/A"}</span>
              <div className="balance-value spacer">
                {currencyFormatter(choosed?.lastPrice, defaultOptions) || "N/A"}
              </div>
            </Col>

            <Col md={2} xs={4}>
              <span className="text-muted">Change</span>
              <div className={cn([className, "spacer"])}>{choosed?.priceChangePercent || "N/A"}%</div>{" "}
            </Col>

            <Col md={2} xs={4}>
              <span className="text-muted">High</span>
              <div className="balance-value spacer">
                {currencyFormatter(choosed?.highPrice, defaultOptions) || "N/A"}
              </div>
            </Col>

            <Col md={2} xs={4}>
              <span className="text-muted">Low</span>
              <div className="balance-value spacer">
                {currencyFormatter(choosed?.lowPrice, defaultOptions) || "N/A"}
              </div>
            </Col>

            <Col md={2} xs={4}>
              <span className="text-muted">Volume</span>
              <div className="balance-value spacer">{millify(choosed?.quoteVolume || 0) || "N/A"}</div>
            </Col>
          </Row>
        </Col>

        <Col md={6} xs={12}>
          <Alert
            banner
            type="info"
            message={
              <TextLoop mask>
                <div>Hebys News</div>
                <div>Introducing Santos FC Fan Token (SANTOS) on Binance Launchpool!</div>
                <div>Hebys Will List JasmyCoin (JASMY)</div>
                <div>Hebys Adds ENS on Margin, Launches Interest Rate Promotion!</div>
              </TextLoop>
            }
          />
        </Col>
      </Row>
    </div>
  );
};
