import { Col, Row } from "react-bootstrap";
import { Link, Share, CashCoin } from "react-bootstrap-icons";

import styles from "./referral.module.css";
import cn from "classnames";

function HowTo() {
  return (
    <div className="card start-earning">
      <div className="card-body">
        <h5 className="card-title">How to Start Earning</h5>
        <Row>
          <Col md={4}>
            <Card
              title="1. Get Link"
              desc="Sign up or Log in to get your crypto referral link with the commission rebate rate."
              icon={<Link size={36} color="#fff" />}
            />
          </Col>

          <Col md={4}>
            <Card
              title="2.Invite friends"
              desc="Share your referral link with friends and followers."
              icon={<Share size={26} color="#fff" />}
            />
          </Col>

          <Col md={4}>
            <Card
              title="3.Start earning"
              desc="You'll share up to 40 % commission every time they complete a trade."
              icon={<CashCoin size={26} color="#fff" />}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HowTo;

function Card({ title, icon, desc }) {
  return (
    <div className={cn(["text-center", styles.container])}>
      <div className={styles.iconContainer}>{icon}</div>
      <p>{title}</p>
      <p className="text-muted">{desc}</p>
    </div>
  );
}
