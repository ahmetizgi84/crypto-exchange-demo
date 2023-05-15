import { useContext, useState, useEffect } from "react";
import ApiContext from "../../context/ApiContext";
import { Col, Row, Button } from "react-bootstrap";
import { Button as AntButton, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import styles from "./referral.module.css";
import cn from "classnames";

function DefaultReferral() {
  const { userReferralList } = useContext(ApiContext);
  const [defaultReferral, setDefaultReferral] = useState({});

  useEffect(() => {
    if (userReferralList && userReferralList.length > 0) {
      const found = userReferralList.find((ref) => ref.status === 1);
      setDefaultReferral(found);
    }
  }, [userReferralList]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Default Referral</h5>
        <Row>
          <Col md={12}>
            <Info title="Referral ID" info={defaultReferral?.referralUserId} />
            <div style={{ height: "16px" }} />
            <Info title="Referral Link" info="https://dev-exchange.woynex.com/" />
          </Col>
          <Col md={12} className="mt-4">
            <AntButton key="submit" htmlType="submit" type="primary" size="medium">
              Invite Friends
            </AntButton>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default DefaultReferral;

function Info({ title, info, addNewRef }) {
  async function copyToClipboard(info) {
    await navigator.clipboard.writeText(info);
    message.success("Copied");
  }

  if (addNewRef) {
    return (
      <div style={{ padding: "0px 15px" }}>
        <Row style={{ backgroundColor: "rgb(250, 250, 250)", padding: "8px 0px" }} className="align-items-center">
          <Col md={6} xs={12}>
            <div
              style={{
                color: "#474d57",
              }}
            >
              {title}
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div
              style={{
                flex: "auto",
                fontWeight: "700",
                textAlign: "end",
              }}
            >
              {info}
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    
    <div
   
    className={cn(["info", styles.info])}
      style={{
        padding: "8px 15px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
      className={cn(["info-text", styles.infoText])}
      >
        {title}
      </div>

      <div
        style={{
          flex: "auto",
          fontWeight: "700",
          textAlign: "end",
          paddingRight: "15px",
          paddingLeft: "15px",
        }}
      >
        {info}
      </div>
      <AntButton type="primary" icon={<CopyOutlined />} ghost onClick={() => copyToClipboard(info)} />
    </div>
  );
}
