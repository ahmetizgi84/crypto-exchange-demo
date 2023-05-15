import { Col, Row, Table } from "react-bootstrap";
import { Alert, Button as AntButton } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { Card } from "../../components";

import DepositLogic from "./depositLogic";

function Try() {
  const { state, setInitialAccount, copyToClipboard } = DepositLogic();
  const { initialAccount } = state;

  const renderIban = () => {
    switch (initialAccount) {
      case 0:
        return (
          <span>
            <b>TR99 9999 9999 8888 7777 6666 55</b>
            <AntButton
              className="ml-2"
              type="primary"
              icon={<CopyOutlined />}
              ghost
              onClick={() => copyToClipboard("TR99 9999 9999 8888 7777 6666 55")}
            />
          </span>
        );
      case 1:
        return (
          <span>
            <b>TR88 9988 7766 5544 3322 6655 66</b>
            <AntButton
              className="ml-2"
              type="primary"
              icon={<CopyOutlined />}
              ghost
              onClick={() => copyToClipboard("TR99 9999 9999 8888 7777 6666 55")}
            />
          </span>
        );
      case 2:
        return (
          <span>
            <b className="dark-text-white">TR00 9999 8888 7777 6666 5555 44</b>
            <AntButton
              className="ml-2"
              type="primary"
              icon={<CopyOutlined />}
              ghost
              onClick={() => copyToClipboard("TR99 9999 9999 8888 7777 6666 55")}
            />
          </span>
        );
      case 3:
        return (
          <span>
            <b className="dark-text-white">TR45 4545 4545 4545 4545 4545 45</b>
            <AntButton
              className="ml-2"
              type="primary"
              icon={<CopyOutlined />}
              ghost
              onClick={() => copyToClipboard("TR99 9999 9999 8888 7777 6666 55")}
            />
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pl-3 mt-3">
      <Row className="mb-3">
        <Col md={12}>
          <h5 className="dark-text-white">Bank Transfer</h5>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8} xs={12}>
          <Row className="mb-3">
            <Col md={6}>
              <AntButton
                type={initialAccount === 0 && "primary"}
                className="btn-block"
                onClick={() => setInitialAccount(0)}
              >
                Ziraat Bankası | EFT & 7/24 Havale
              </AntButton>
            </Col>
            <Col md={6}>
              <AntButton
                type={initialAccount === 1 && "primary"}
                className="btn-block"
                onClick={() => setInitialAccount(1)}
              >
                Akbank | EFT & 7/24 Havale
              </AntButton>
            </Col>

            <Col md="12" className="my-2" />

            <Col md={6}>
              <AntButton
                type={initialAccount === 2 && "primary"}
                className="btn-block"
                onClick={() => setInitialAccount(2)}
              >
                VakıfBank | EFT & 7/24 Havale
              </AntButton>
            </Col>

            <Col md={6}>
              <AntButton
                type={initialAccount === 3 && "primary"}
                className="btn-block"
                onClick={() => setInitialAccount(3)}
              >
                Finansbank | EFT & 7/24 Havale
              </AntButton>
            </Col>
          </Row>

          <Card>
            <Row className="mb-4 pb-3 border-bottom">
              <Col md={6}>
                <h6 className="dark-text-white">Limit</h6>
              </Col>
              <Col md={6} className="text-right">
                <h6 className="dark-text-white">Daily: 1.000,000 TRY</h6>
                <h6 className="dark-text-white">Montly: 5.000,000 TRY</h6>
              </Col>
            </Row>

            <Row className="mb-5 pb-3 border-bottom">
              <Col md={6}>
                <h6 className="dark-text-white">Remaining Deposit Limit</h6>
              </Col>
              <Col md={6} className="text-right">
                <h6 className="dark-text-white">Daily: 1.000,000 TRY</h6>
                <h6 className="dark-text-white">Montly: 5.000,000 TRY</h6>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <span className="dark-text-white">Account Name: </span>
              </Col>
              <Col md={6} className="text-right">
                <span>
                  <b className="dark-text-white">WOYNEX TEKNOLOJİ ANONİM ŞİRKETİ</b>
                  <AntButton
                    className="ml-2"
                    type="primary"
                    icon={<CopyOutlined />}
                    ghost
                    onClick={() => copyToClipboard("WOYNEX TEKNOLOJİ ANONİM ŞİRKETİ")}
                  />
                </span>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md={6}>
                <span className="dark-text-white">IBAN: </span>
              </Col>
              <Col md={6} className="text-right dark-text-white">
                {renderIban()}
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Alert
                  description="Deposits must be made from your own personal bank accounts. After the Havale/EFT transaction, the deposit amount will be automatically deposited to your account."
                  type="warning"
                  showIcon
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={4}>
          <Alert description={<AlertContent />} type="warning" showIcon closable />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <RecentDepositRecords />
        </Col>
      </Row>
    </div>
  );
}

export default Try;

function AlertContent() {
  return (
    <div className="alert-content">
      <h5>Please read before you deposit</h5>
      <p>1. You must send Turkish Lira by Havale or EFT from your personal bank account opened only in your name..</p>
      <p>2. You can make 24/7 deposit with your Ziraat Bank account.</p>
      <p>3. You can deposit to our Ziraat Bank account from all banks during bank working hours.</p>
      <p>
        4. Transfers made by ATM or credit card will not be accepted as it is not possible to confirm the sender
        information.
      </p>
      <p>5. There is no minimum limit for Turkish Lira deposit, you can make your TRY deposits within your limits.</p>
      <p>
        6. After your first Turkish Lira deposit transaction, Binance Transfer and crypto withdrawals will be disabled
        for 48 hours.
      </p>
    </div>
  );
}

function RecentDepositRecords() {
  return (
    <Card>
      <h5 className="card-title dark-text-white">Recent Deposit Records</h5>
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
    </Card>
  );
}
