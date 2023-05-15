import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { CashCoin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import ApiContext from "../../context/ApiContext";
import excahngeApi from "../../api/exchangeApi";
import DataContext from "../../context/DataContext";
import _ from "lodash";
import { WoynexTable } from "../../components";

const VipLevel = () => {
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);
  return <Container className="py-5">{isLoggedIn ? <LoggedInUser /> : <GuestUser />}</Container>;
};

export default VipLevel;

function LoggedInUser() {
  const { vip } = useContext(DataContext);
  const { user, _getCommissionLevelList, commissionLevelList } = useContext(ApiContext);
  const [userCommissionLevel, setUserCommissionLevel] = useState([]);
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);
  const { loading } = useContext(ApiContext);
  const columns = [
    {
      title: "Level",
      dataIndex: "name",
      key: "tradingBtcvolume4Last30Days",
    },
    {
      title: "30 days Stop trading volume (BTC)",
      dataIndex: "tradingBtcvolume4Last30Days",
      key: "tradingBtcvolume4Last30Days",
    },
    {
      title: "or",
      dataIndex: "or",
      key: "or",
      render: (or) => "or",
    },
    {
      title: "BNB Balance",
      dataIndex: "e",
      render: (e) => ">= 0 BNB",
    },
    {
      title: "Maker / Taker",
      dataIndex: "makerFeeRate",
      key: "symbol",
    },
    {
      title: "Maker / Taker 25% Discount",
      dataIndex: "Discount",
      key: "Discount",
      render: (text, record, index) => (record.makerFeeRate * 0.25).toFixed(2),
    },
  ];

  useEffect(() => {
    _getCommissionLevelList();
  }, []);

  // find user's comission level

  useEffect(() => {
    let tempUserCommissionLevel = [];
    if (commissionLevelList) {
      let tempCommissionLevelList = [...commissionLevelList];
      tempCommissionLevelList.map((level, idx) => {
        if (idx === 0) {
          if (0 <= user?.tradingBTCVolume4Last30Days <= level.tradingBtcvolume4Last30Days) {
            level.hasPrivilege = true;
          } else {
            level.hasPrivilege = false;
          }
          tempUserCommissionLevel.push(level);
        } else {
          if (
            tempCommissionLevelList[idx - 1].tradingBtcvolume4Last30Days < user?.tradingBTCVolume4Last30Days &&
            user?.tradingBTCVolume4Last30Days <= level.tradingBtcvolume4Last30Days
          ) {
            level.hasPrivilege = true;
          } else {
            level.hasPrivilege = false;
          }
          tempUserCommissionLevel.push(level);
        }
      });
    }
    setUserCommissionLevel(tempUserCommissionLevel);
  }, [user, commissionLevelList]);

  return (
    <div className="vip-level">
      <h2 className="vip-level-title">VIP Program</h2>
      <Row className="mb-3">
        <Col md={12}>
          <h4 className="vip-level-header">My VIP Level {vip}</h4>
          <p className="vip-level-text">Upgrade to VIP 1 by trading another 25.0000000000 BTC on our spot exchange.</p>
        </Col>
      </Row>

      {/* <Row className="py-5">
        <Col md={4}>
          <h6>Stop Trade Volume (30d in BTC)</h6>
          <h4>0 BTC</h4>
        </Col>

        <Col md={4}>
          <h6>Futures Trade Volume (30d in BTC)</h6>
          <h4>0 BTC</h4>
        </Col>

        <Col md={4}>
          <h6>0 BTC VIP 0 VIP 1 Trade Futures BNB Balance</h6>
          <h4>0 BNB</h4>
        </Col>
      </Row> */}

      <Row className="mb-4">
        <Col md={12}>
          <p className="text-muted ">
            The cumulative 30-day trading volume and 24-hour balance are updated at 10:00 (UTC+0) on the next day. After
            the update, you can access the corresponding fee discount and withdrawal limits in the table below. All VIPs
            of spot market are also VIPs on futures market. Your VIP level will be determined by your highest rated spot
            or futures account.
          </p>
        </Col>
      </Row>

      <Row className="mb-1 ">
        <Col md={12}>
          <h4 className="vip-level-card-title">My VIP Privileges</h4>
        </Col>
      </Row>

      <Row className="mb-5 py-2">
        {userCommissionLevel?.map((level) => {
          return (
            <Col key={level.id} md={4} xs={12} className="text-center">
              <div className={level.hasPrivilege ? "vip-level-card" : "vip-level-card-muted"}>
                <CashCoin size={48} color={level.hasPrivilege ? "green" : "gray"} />
                <h4 className="mt-2">Fee Discount</h4>
                <h6>{level.name}</h6>
                <h6>Fee Rate</h6>
                <h6>{level.makerFeeRate}</h6>
                <h6>{level.hasPrivilege ? "Available" : `Available in ${level.name}`}</h6>
              </div>
            </Col>
          );
        })}
      </Row>

      <Row className="mb-1">
        <Col md={12}>
          <h4 className="card-title">Withdrawal Limits</h4>
        </Col>
      </Row>

      <Row className="mb-3 py-2">
        <Col md={12}>
          <WoynexTable
            columns={columns}
            list={userCommissionLevel}
            size="small"
            rowKey={(record) => record.orderId}
            pageSize={5}
            loading={loading}
            isLoggedIn={isLoggedIn}
          />
        </Col>
      </Row>
    </div>
  );
}

function GuestUser() {
  const { commissionLevelListPage, _getCommissionLevelListPage } = useContext(ApiContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    _getCommissionLevelListPage();
  }, []);

  console.log(commissionLevelListPage);

  return (
    <div className="vip-level">
      <h2 className="mb-5 vip-level-title">VIP Program</h2>
      <Row>
        <Col md={12}>
          <div className="d-flex align-items-center">
            <h4 className="m-0 mr-3">My VIP Level</h4>
            <Link to="/login">Login</Link>
          </div>
          <p>View VIP level information</p>
        </Col>
      </Row>

      <Row className="mb-5 py-2">
        <Col md={12}>
          <Table hover responsive="lg" size="lg">
            <thead>
              <tr>
                <th>Level</th>
                <th>30 days Spot trading volume (BTC)</th>
                <th>or</th>
                <th>BNB Balance</th>
                <th>Maker / Taker</th>
                <th>Maker / Taker 25% Discount</th>
              </tr>
            </thead>
            <tbody>
              {commissionLevelListPage?.map((level) => (
                <tr key={level.id}>
                  <td>{level.name}</td>
                  <td>
                    {"<"} {level.tradingBtcvolume4Last30Days} BTC
                  </td>
                  <td>or</td>
                  <td>{">="} 0 BNB</td>
                  <td>
                    {level.makerFeeRate}% / {level.takerFeeRate}%
                  </td>
                  <td>0.0750% / 0.0750%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <div className="d-flex align-items-center">
            <h4 className="m-0 mr-3">My VIP Privileges</h4>
            <Link to="/login">Login</Link>
          </div>
        </Col>
      </Row>

      <Row className="mb-5 py-2">
        {commissionLevelListPage?.map((level) => {
          return (
            <Col key={level.id} md={4} xs={12} className="text-center">
              <div className="vip-level-card">
                <CashCoin size={48} color={theme === "light" ? "gray" : "white"} />
                <h4 className="mt-2">Fee Discount</h4>
                <h6>{level.name}</h6>
                <h6>Fee Rate</h6>
                <h6>{level.makerFeeRate}</h6>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* <Row className="mb-3 py-2">
        <Col md={12}>
          <Table hover responsive="lg" size="lg">
            <thead>
              <tr>
                <th>Level</th>
                <th>30 days Stop trading volume (BTC)</th>
                <th>or</th>
                <th>BNB Balance</th>
                <th>Maker / Taker</th>
                <th>Maker / Taker 25% Discount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <tr key={idx}>
                  <td>VIP 0</td>
                  <td>{"<"} 50 BTC</td>
                  <td>or</td>
                  <td>{">="} 0 BNB</td>
                  <td>0.1000% / 0.1000%</td>
                  <td>0.0750% / 0.0750%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row> */}
    </div>
  );
}
