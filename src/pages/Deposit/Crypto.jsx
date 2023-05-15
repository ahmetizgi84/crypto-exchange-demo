import { useContext, useEffect, useState } from "react";
import { Select, Button as AntButton } from "antd";
import { Row, Col, Container, Table } from "react-bootstrap";
import { Card } from "../../components";
import QRCode from "react-qr-code";
import { CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import ApiContext from "../../context/ApiContext";
import constants from "../../common/constants";

import CryptoLogic from "./cryptoLogic";

const { Option } = Select;

const MyOption = ({ coin }) => {
  return (
    <div className="align-items-center d-flex">
      <img style={{ width: "18px", height: "18px" }} src={coin.image} alt={coin.symbol} />
      <span className="ml-2">{coin.symbol}</span>
      <span className="ml-2 text-muted">{coin.coinName}</span>
    </div>
  );
};

function Crypto() {
  const { state, coinNetwork, handleChange, copyToClipboard, setIsShow } = CryptoLogic();
  const { coins, isShow } = state;
  const asset = window.location.href.split("/").slice(-1)[0];

  console.log(coinNetwork);

  return (
    <div className="deposit-crypto">
      <Row>
        <Col md={4} xs={12}>
          <Card>
            <Row>
              <Col md={12} className="pb-3 border-bottom">
                <Select
                  //showSearch
                  className="btn-block"
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  onChange={handleChange}
                >
                  <Option value="0">Not Identified</Option>
                  {coins?.map((coin) => (
                    <Option key={coin.id} value={coin.symbol}>
                      <MyOption coin={coin} />
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Row className="mt-4 mb-2">
              <Col md={4} xs={6}>
                <span className="text-muted">
                  <small>Total:</small>
                </span>
              </Col>
              <Col md={8} xs={6} className="dark-text-white">
                0 ADA
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={4} xs={6}>
                <span className="text-muted">
                  <small>In order:</small>
                </span>
              </Col>
              <Col md={8} xs={6} className="dark-text-white">
                0 ADA
              </Col>
            </Row>

            <Row>
              <Col md={4} xs={6}>
                <span className="text-muted">
                  <small>Available:</small>
                </span>
              </Col>
              <Col md={8} xs={6} className="dark-text-white">
                0 ADA
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={8} xs={12}>
          <Card>
            <label className="dark-text-white">Select Network</label>
            <Row className="mb-4">
              {coinNetwork?.length > 0 ? (
                coinNetwork?.map((network) => {
                  return (
                    <Col key={network.id} md={2} xs={4}>
                      <AntButton className="btn-block">{network.networkCode}</AntButton>
                    </Col>
                  );
                })
              ) : (
                <Col md={12}>
                  <div className="text-muted" >No network found!</div>
                </Col>
              )}
            </Row>

            <label className="dark-text-white">{asset} Address:</label>
            <Row>
              <Col md={12}>
                <p className="dark-text-white" style={{ color: "var(--c-contrastblack)", fontWeight: "bold", overflowWrap: "break-word" }}>
                  0xb816339493f128aaf6adb97e0b2bb0b34ac9e0eb
                </p>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={3}>
                <AntButton
                  className="btn-block"
                  type="primary"
                  icon={<CopyOutlined />}
                  ghost
                  onClick={() => copyToClipboard("0xb816339493f128aaf6adb97e0b2bb0b34ac9e0eb")}
                >
                  Copy Address
                </AntButton>
              </Col>
              <Col md={3}>
                <AntButton className="btn-block" type="primary" icon={<QrcodeOutlined />} ghost onClick={setIsShow}>
                  Show QR Code
                </AntButton>
              </Col>
            </Row>

            {isShow && (
              <Row className="mb-3">
                <Col md={12} className="text-center">
                  <p>{asset} Address</p>
                  <QRCode value="0xb816339493f128aaf6adb97e0b2bb0b34ac9e0eb" size={120} />
                  <p style={{ color: "var(--c-contrastblack)", fontWeight: "bold", overflowWrap: "break-word" }}>
                    0xb816339493f128aaf6adb97e0b2bb0b34ac9e0eb
                  </p>
                </Col>
              </Row>
            )}

            <Row>
              <Col md={12}>
                <p className="mb-0 dark-text-white">Send only {asset} to this deposit address.</p>
                <p>
                  <small className="dark-text-white">
                    Sending coin or token other than {asset} to this address may result in the loss of your deposit.
                  </small>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Crypto;

/*
const Crypto = () => {
  const asset = window.location.href.split("/").slice(-1)[0];
  const { accountList, _getCoinList, _getAccountList, coinList, _getTransferNetwork } = useContext(ApiContext);
  const [selectedCoin, setSelectedCoin] = useState({});

  useEffect(() => {
    _getCoinList();
    _getAccountList();
  }, []);

  useEffect(() => {
    if (asset) {
      _getTransferNetwork(asset);
    }
  }, [asset]);

  useEffect(() => {
    if (asset) {
      const found = coinList?.find((list) => list.symbol === asset) || {};
      setSelectedCoin(found);
    }
  }, [coinList, asset]);

  return (
    <Container>
      <Row className="my-3">
        <Col lg={12}>
          <CoinDepositAddresses setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
          <WalletDepositAddress accountList={accountList} selectedCoin={selectedCoin} />
        </Col>
      </Row>

      <Row className="my-3">
        <Col lg={12}>
          <RecentDepositRecords />
        </Col>
      </Row>
    </Container>
  );
};

export default Crypto;


function CoinDepositAddresses({ setSelectedCoin, selectedCoin }) {
  const { coinList, coinNetwork } = useContext(ApiContext);

  const handleChange = (e) => {
    //console.log("item: ", e.target.value);
    const found = coinList?.find((list) => list.symbol === e.target.value) || {};
    setSelectedCoin(found);
    const browserUrl = window.location.origin;
    if (browserUrl === "http://localhost:3000") {
      window.history.pushState({}, null, browserUrl + "/deposit/" + e.target.value);
    } else {
      window.history.pushState({}, null, constants.WoynexUrl + "/deposit/" + e.target.value);
    }
  };

  return (
    <div className="settings">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {selectedCoin?.coinName} ({selectedCoin?.symbol}) Deposit
          </h5>
          <div className="row wallet-address">
            <div className="col-md-12">
              <div className="form-group mb-5">
                <label htmlFor="">Coin</label>
                <select
                  id="selectLanguage"
                  className="custom-select"
                  value={selectedCoin.symbol}
                  onChange={handleChange}
                >
                  {coinList?.map((coin) => {
                    return (
                      <option key={coin.id} value={coin.symbol}>
                        {coin.coinName} ({coin.symbol})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Network</label>
                <div>
                  {coinNetwork?.length > 0 ? (
                    coinNetwork?.map((network) => {
                      return (
                        <button key={network.id} className="btn btn-outline-secondary mr-4">
                          {network.networkCode}
                        </button>
                      );
                    })
                  ) : (
                    <div>There is no network item</div>
                  )}
                  {/* <button className="btn btn-outline-secondary mr-4">ETH/ERC20</button>
                  <button className="btn btn-outline-success mr-4">Tron/TRC20</button>
                  <button className="btn btn-outline-secondary mr-4">BSC/BEP20</button> *************************
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletDepositAddress(props) {
  const { accountList, selectedCoin } = props;
  const [address, setAddress] = useState({});
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (accountList.length) {
      const address = accountList?.find((account) => account.coin === selectedCoin?.symbol) || {};
      setAddress(address);
    }
  }, [accountList, selectedCoin]);

  const onChangeHandler = (e) => {
    let temp = { ...address };
    temp.address = e.target.value;
    setAddress(temp);
    setCopied(false);
  };

  async function copyToClipboard(e) {
    await navigator.clipboard.writeText(address.address);
    setCopied(true);
  }

  return (
    <div className="settings">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Wallet Deposit Address</h5>
          <div className="row wallet-address">
            <div className="col-md-12">
              <p>
                Deposits to this address are unlimited. Note that you may not be able to withdraw all of your funds at
                once if you deposit more than your daily withdrawal limit.
              </p>
            </div>

            <div className="col-md-6 mx-auto text-center my-4">
              <img src={"../img/qr-code-dark.svg"} alt="qr-code" style={{ width: "144px", height: "144px" }} />

              <div className="input-group">
                <input type="text" className="form-control" value={address?.address || ""} onChange={onChangeHandler} />
                <div className="input-group-prepend">
                  <button className="btn btn-primary" onClick={copyToClipboard}>
                    {isCopied ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentDepositRecords() {
  return (
    <div className="settings">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Recent Deposit Records</h5>
          <div className="row wallet-address mb-4">
            <div className="col-md-12">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>TxID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>65148526</td>
                    <td>2021-08-12 15:13:43</td>
                    <td>480 USDT_TRX</td>
                    <td>33050f23f7eda86a41d7dd79e6c7ebcd1e3951f7d4d86508ab725f2954d5bb64</td>
                    <td>SUCCESS</td>
                  </tr>
                  <tr>
                    <td>689547125</td>
                    <td>2021-04-21 15:40:44</td>
                    <td>1240 USDT_TRX</td>
                    <td>664943fa9084da1c61753d89756432cc38f2f29819bb66726d0ee92a77a8ec61</td>
                    <td>SUCCESS</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
