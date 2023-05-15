import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tabs as AntTabs } from "antd";
import { WoynexTable, Card } from "../../components";
import { currencyFormatter } from "../../helper/currencyFormatter";
import _ from "lodash";

const { TabPane } = AntTabs;

const Landing = () => {
  return (
    <>
      <section className="landing-first-section">
        <Container>
          <div style={{ height: 920, flexDirection: "column" }} className="d-flex justify-content-center">
            <Row className="justify-content-center">
              <Col md={5} className="text-center">
                <h1>Welcome to Woynex. Buy, sell and trade digital currency.</h1>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={10} className="text-center mt-5">
                <AntTabs defaultActiveKey="buy">
                  <TabPane tab="ALL" key="all">
                    <TabContent />
                  </TabPane>
                  <TabPane tab="BTC" key="btc">
                    <TabContent />
                  </TabPane>
                  <TabPane tab="USDT" key="usdt">
                    <TabContent />
                  </TabPane>
                  <TabPane tab="TRY" key="try">
                    <TabContent />
                  </TabPane>
                </AntTabs>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="landing-second-section">
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: 60,
              paddingBottom: 60,
            }}
          >
            <Row className="justify-content-around">
              <Col md={2} xs={12}>
                <div className="section-two-box">
                  <h1>30M+</h1>
                  <p>Customers served</p>
                </div>
              </Col>
              <Col md={2} xs={12}>
                <div className="section-two-box">
                  <h1>$3M+</h1>
                  <p>30 Days Volume</p>
                </div>
              </Col>
              <Col md={2} xs={12}>
                <div className="section-two-box">
                  <h1>11</h1>
                  <p>Countries Support</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="landing-third-section">
        <Container>
          <div>
            <Row style={{ height: 500 }}>
              <Col
                md={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <h1>No matter your experience level</h1>
                <p>
                  Woynex offers an intuitive interface with real time orderbooks, charting tools, trade history, and a
                  simple order process so you can trade from day one.
                </p>
              </Col>
              <Col md={8} className="third-section-trade"></Col>
            </Row>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col md={12} className="text-center mt-5">
              <h1>Woynex platform features</h1>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card>
                <div className="card-content">
                  <h5>Exchange</h5>
                  <p>
                    Woynex offers the most liquid order book in the world, allowing users to easily exchange Bitcoin,
                    Ethereum, EOS, Litecoin, Ripple, NEO and many other digital assets with minimal slippage.
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <div className="card-content">
                  <h5>Order Types</h5>
                  <p>
                    Woynex offers a suite of order types to give traders the tools they need for every scenario.
                    Discover more about our most advanced Algorithmic orders types.
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <div className="card-content">
                  <h5>Customizable Interface</h5>
                  <p>
                    Organize your workspace according to your needs: compose your layout, choose between themes, set up
                    notifications and data preferences.
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <div className="card-content">
                  <h5>Security</h5>
                  <p>
                    Security of user information and funds is our first priority. Contact us to learn more about our
                    security features and integrations.
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <div className="card-content">
                  <h5>Community</h5>
                  <p>Join a global community that believes in the power of crypto.</p>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <div className="card-content">
                  <h5>Industry leading API</h5>
                  <p>
                    Our Websocket feed lets you easily gain access to real-time market data, while our trading API lets
                    you develop secure, programmatic trading bots.
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Landing;

function TabContent() {
  const columns = [
    {
      title: "Market",
      dataIndex: "market",
      sorter: true,
      key: "market",
    },
    {
      title: "Last Price",
      dataIndex: "lastPrice",
      key: "lastPrice",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
    },
    {
      title: "Hight",
      dataIndex: "high",
      key: "high",
    },
    {
      title: "Low",
      dataIndex: "low",
      render: (price) => currencyFormatter(price),
      key: "low",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(dummyData, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    //setOpenOrders(orderedList);
  };

  return (
    <WoynexTable
      columns={columns}
      list={dummyData}
      size="small"
      onChange={handleTableChange}
      rowKey={(record) => record.id}
      pageSize={0}
      //loading={loading}
      isLoggedIn={true}
      pagination={false}
    />
  );
}

const dummyData = [
  {
    id: 1,
    market: "BTCUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 2,
    market: "XRPUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 3,
    market: "LTCUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 4,
    market: "ETCUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 5,
    market: "BCHUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 6,
    market: "BCHUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 7,
    market: "BCHUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 8,
    market: "BCHUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 9,
    market: "BCHUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
  {
    id: 10,
    market: "BCHUSDT",
    lastPrice: 49.245,
    change: +2.32,
    high: 0.0194,
    low: 0.0321,
    volume: 604.1,
  },
];
