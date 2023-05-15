import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, Select } from "antd";
import { urlParser } from "../../utils/urlParser";
import { MarketPairsSocketProvider } from "../../context/MarketPairsSocketContext";
import constants from "../../common/constants";

import FastBuy from "./FastBuy";
import FastSell from "./FastSell";
import useFetch from "../../hooks/useFetch";

const { Option } = Select;

function FastBuySell() {
  return (
    <div className="fast-buy-sell">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <FastBuyAndSell />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FastBuySell;
const URL = "/Binance/GetAllCoinList";

function FastBuyAndSell() {
  const { pair } = urlParser(window.location.href);

  const { data: allPairsList, loading } = useFetch(URL, "post");

  const [activeTabKey, setActiveTabKey] = useState("buy");
  const [selectedCoinObject, setSelectedCoinObject] = useState({});

  useEffect(() => {
    if (allPairsList && allPairsList.length > 0) {
      const defaultCoin = allPairsList.find((coin) => coin.symbol === pair) || {};
      setSelectedCoinObject({ ...defaultCoin });
    }
  }, [loading, allPairsList]);

  const onTab1Change = (key) => {
    setActiveTabKey(key);
  };

  const tabList = [
    {
      key: "buy",
      tab: "Buy",
    },
    {
      key: "sell",
      tab: "Sell",
    },
  ];

  const contentList = {
    buy: (
      <MarketPairsSocketProvider>
        <FastBuy />
      </MarketPairsSocketProvider>
    ),
    sell: (
      <MarketPairsSocketProvider>
        <FastSell />
      </MarketPairsSocketProvider>
    ),
  };

  function handleChange(value) {
    const defaultCoin = allPairsList.find((coin) => coin.symbol === value) || {};
    setSelectedCoinObject({ ...defaultCoin });

    const browserUrl = window.location.origin;
    if (browserUrl === "http://localhost:3000") {
      window.history.pushState(
        {},
        null,
        browserUrl + "/fast/" + value + "_" + defaultCoin.baseAsset + "_" + defaultCoin.quoteAsset
      );
    } else {
      window.history.pushState(
        {},
        null,
        constants.WoynexUrl + "/pro/" + value + "_" + defaultCoin.baseAsset + "_" + defaultCoin.quoteAsset
      );
    }
  }

  function CardTitle() {
    return (
      <>
        <span>Fast Buy/Sell</span>

        <Row className="align-items-center mt-3">
          <Col md={12} xs={12}>
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Select Coin"
              optionFilterProp="children"
              value={selectedCoinObject?.symbol}
              onChange={handleChange}
            >
              {allPairsList?.length > 0 &&
                allPairsList.map((item, idx) => (
                  <Option key={idx} value={item.symbol}>
                    {item.symbol} {item.coinName}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Card
        title={<CardTitle />}
        tabList={tabList}
        activeTabKey={activeTabKey}
        className="fast-buy-sell-card"
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
}
