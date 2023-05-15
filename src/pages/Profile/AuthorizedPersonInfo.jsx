import { useContext } from "react";
import DataContext from "../../context/DataContext";
import ApiContext from "../../context/ApiContext";
import Moment from "react-moment";
import "moment-timezone";
import { Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { StarFill, CheckCircleFill } from "react-bootstrap-icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button as AntButton, Modal as AntModal } from "antd";
import styles from "./Profile.module.css";
import cn from "classnames";


function AuthorizedPersonInfo() {
  const history = useHistory();
  const { vip } = useContext(DataContext);
  const { user } = useContext(ApiContext);

  function Content() {
    return (
      <>
        <p>
          ⚠ Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to
          protect your account.
        </p>
        <p>
          ⚠ You are not allowed to register for a new account with the old email address within 30 days after removing
          it from this current account.
        </p>
      </>
    );
  }

  function changeEmailConfirm() {
    AntModal.confirm({
      title: "Are you sure you want to change email verification?",
      icon: <ExclamationCircleOutlined />,
      content: <ChangeEmailConfirmContent />,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => history.push("/security/change-email-authenticator"),
    });
  }

  function ChangeEmailConfirmContent() {
    return (
      <>
        <p>
          ⚠ Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to
          protect your account.
        </p>
        <p>
          ⚠ You are not allowed to register for a new account with the old email address within 30 days after removing
          it from this current account.
        </p>
      </>
    );
  }

  function changePhoneConfirm() {
    AntModal.confirm({
      title: "Are you sure you want to change phone verification?",
      icon: <ExclamationCircleOutlined />,
      content: <ChangePhoneConfirmContent />,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => history.push("/security/change-sms-authenticator"),
    });
  }

  function ChangePhoneConfirmContent() {
    return (
      <>
        <p>
          ⚠ Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to
          protect your account.
        </p>
      </>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Authorized Person Info</h5>
        <div className="settings-profile">
          <Row className="align-items-center mb-4">
            <Col xs={2} lg={1} className="pr-0">
               <img src={"../img/user.png"} alt="avatar" width={90}/>
            </Col>
            <Col xs={10} lg={3} className="pr-0">
              <h5  className="card-header-title mb-0">{user?.email}</h5>
              <label className="text-muted mb-0">Register Date:<span className="card-title mb-0">
                <Moment date={user?.createdDate} format="DD.MM.YYYY" />
              </span></label>
              <div>
              <Link to="/fee/vip-level">
                <StarFill color="#007bff" size={12} style={{ marginRight: "5px" }} />
                {vip}
              </Link>
              </div>
            </Col>
          </Row>

          <Row >
            <Col md={6} xs={12}>
              <div className={cn(["personInfo"])}>
                    <label className="text-muted">First name:</label>
                    <h5 className={cn([styles.subtitle, "card-title mb-0"])}>{user?.name || ""}</h5>
              </div>
              <div className={cn(["personInfo"])} > 
                  <label className="text-muted">Last name:</label>
                  <h5 className={cn([styles.subtitle, "card-title mb-0"])}>{user?.surname || ""}</h5>
              </div>
              <div className={cn(["personInfo"])}>
              <label className="text-muted">Identification No:</label>
              <h5 className={cn([styles.subtitle, "card-title mb-0"])}>{user?.identificationNo || "-"}</h5>
              </div>
            </Col>

            <Col md={6} xs={12}>
            <div className={cn(["personInfo"])}>
                <label className="text-muted">Address:</label>
                <h5 className={cn([styles.subtitle, "card-title mb-0"])}>{user?.address || "-"}</h5>
              </div>
              <div className={cn(["personInfo align-items-center justify-content-between"])}>
                <div className="d-flex align-items-start">
                  <label className="text-muted" htmlFor="emailAddress">
                Email:
                </label>
                <div className={cn([styles.subtitle, "d-flex align-items-center"])}>
                  <CheckCircleFill color="#54b489" size={16} style={{ marginRight: "5px" }} />
                  <h5 className="card-title mb-0">{user?.email || ""}</h5>
                </div>
              </div>
              <AntButton type="primary" danger size="medium" onClick={changeEmailConfirm}>
                  Change
                </AntButton>
              </div>
              <div className={cn(["personInfo align-items-center justify-content-between"])}>
                  <div className="d-flex align-items-start">
                    <label className="text-muted" htmlFor="phoneNumber">
                       Phone:
                      </label>
                <div className={cn([styles.subtitle, "d-flex align-items-center"])}>
                  <CheckCircleFill color="#54b489" size={16} style={{ marginRight: "5px" }} />
                  <h5 className="card-title mb-0">{user?.phoneNumber || ""}</h5>
                </div>
                </div>
                <AntButton type="primary" danger size="medium" onClick={changePhoneConfirm}>
                  Change
                </AntButton>
              </div>
              
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AuthorizedPersonInfo;
