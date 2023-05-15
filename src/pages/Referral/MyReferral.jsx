import { Col, Row } from "react-bootstrap";
import styles from "./referral.module.css";
import cn from "classnames";

function MyReferral() {
  return (
    <div className="card" style={{ minHeight: "256px" }}>
      <div className="card-body">
        <h5 className="card-title">My Referral</h5>
        <Row>
          <Col md={6}>
            <div className={cn([styles.totalReferral], "referral-totalReferral")} style={{ padding: "8px 15px", textAlign: "center" }}>
              <p>Total Referees</p>
              <h3>1</h3>
              <span>Persons</span>
            </div>
          </Col>

          <Col md={6}>
            <div className={cn([styles.totalReferral], "referral-totalReferral")} style={{ padding: "8px 15px", textAlign: "center" }}>
              <p>Earned</p>
              <h3>0.00</h3>
              <span>USDT</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MyReferral;
