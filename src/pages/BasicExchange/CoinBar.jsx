import { Row, Col } from "react-bootstrap";
import { currencyFormatter } from "../../helper/currencyFormatter";
import cn from "classnames";
import millify from "millify";
import { Select } from "antd";
import useFetch from "../../hooks/useFetch";

import { CoinBarLogic } from "./CoinBarLogic";
const { Option } = Select;
const URL = "/Binance/GetAllCoinList";

function CoinBar() {
  const { data: allPairsList } = useFetch(URL, "post");
  const {
    state: { /*choosed,*/ initialCoin },
    defaultOptions,
    className,
    coinList,
    handleSelectChange,
  } = CoinBarLogic();

  const choosed = {
    image: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025",
    baseAsset: "BTC",
    quoteAsset: "USDT",
    lastPrice: 11.98,
    priceChangePercent: 3,
    highPrice: 12,
    lowPrice: 10,
    quoteVolume: 1234,
  };

  return (
    <Col md={12}>
      <Row>
        <Col md={2} xs={12} className="m-auto">
          <Select
            style={{ width: "100%" }}
            size="large"
            placeholder="Select Coin"
            optionFilterProp="children"
            value={initialCoin?.symbol}
            onChange={handleSelectChange}
          >
            {allPairsList &&
              allPairsList.length > 0 &&
              allPairsList.map((item, idx) => (
                <Option key={idx} value={item.baseAsset}>
                  {item.symbol}
                </Option>
                // <Option key={item.id} value={item.symbol}>
                //   {item.symbol} {item.coinName}
                // </Option>
              ))}
          </Select>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Last Price</span>
          <div className={cn(["spacer", className])}>
            {currencyFormatter(choosed?.lastPrice, defaultOptions) || "N/A"}
          </div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Change</span>
          <div className={cn([className, "spacer"])}>{choosed?.priceChangePercent || "N/A"}%</div>{" "}
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">High</span>
          <div className="balance-value spacer">{currencyFormatter(choosed?.highPrice, defaultOptions) || "N/A"}</div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Low</span>
          <div className="balance-value spacer">{currencyFormatter(choosed?.lowPrice, defaultOptions) || "N/A"}</div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Volume</span>
          <div className="balance-value spacer">{millify(choosed?.quoteVolume || 0) || "N/A"}</div>
        </Col>
      </Row>
    </Col>
  );
}

export default CoinBar;
