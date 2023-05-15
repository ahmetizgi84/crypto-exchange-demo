import { useState, useEffect, useContext } from "react";
import DataContext from "../../context/DataContext";
import ApiContext from "../../context/ApiContext";
import Moment from "react-moment";
import "moment-timezone";
import { Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { StarFill, CheckCircleFill } from "react-bootstrap-icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button as AntButton, Modal as AntModal } from "antd";

function IndividualGeneralInfo() {
  const history = useHistory();
  const { vip } = useContext(DataContext);
  const { user } = useContext(ApiContext);
  const [generalInfo, setGeneralInfo] = useState({});

  useEffect(() => {
    setUserGeneralInfo();
  }, [user]);

  function setUserGeneralInfo() {
    let temp = {
      name: user.name || "",
      surname: user.surname || "",
      address: user.address || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    };

    setGeneralInfo({ ...temp });
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
        <h5 className="card-title">General Information</h5>
        <div className="settings-profile">
          <Row className="align-items-center mb-2">
            <Col xs={2} lg={1} className="pr-0">
              <img src={"../img/avatar.svg"} alt="avatar" />
            </Col>
            <Col xs={10} lg={3} className="pr-0">
              <h5 className="mb-0 card-header-title">{generalInfo?.email}</h5>
              <Link to="/fee/vip-level">
                <StarFill color="#007bff" size={12} style={{ marginRight: "5px" }} />
                {vip}
              </Link>
            </Col>
            <Col xs={6} lg={3} className="">
              <label className="text-muted mb-0">Register Date:</label>
              <h5 className="card-title mb-0">
                <Moment date={user?.createdDate} format="DD.MM.YYYY" />
              </h5>
            </Col>
          </Row>

          <Row>
            <Col md={6} xs={6}>
              <label className="text-muted" htmlFor="formFirst">
                First name:
              </label>
              <h5 className="card-title mb-0">{generalInfo?.name || ""}</h5>
            </Col>

            <Col md={6} xs={6}>
              <label className="text-muted" htmlFor="formLast">
                Last name:
              </label>
              <h5 className="card-title mb-0">{generalInfo?.surname || ""}</h5>
            </Col>

            <Col md={6} xs={12}>
              <label className="text-muted" htmlFor="emailAddress">
                Email:
              </label>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <CheckCircleFill color="#54b489" size={16} style={{ marginRight: "5px" }} />
                  <h5 className="card-title mb-0">{generalInfo?.email || ""}</h5>
                </div>
                <AntButton type="primary" danger size="medium" onClick={changeEmailConfirm}>
                  Change Email
                </AntButton>
              </div>
            </Col>

            <Col md={6} xs={12}>
              <label className="text-muted" htmlFor="phoneNumber">
                Mobile Phone:
              </label>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <CheckCircleFill color="#54b489" size={16} style={{ marginRight: "5px" }} />
                  <h5 className="card-title mb-0">{generalInfo?.phoneNumber || ""}</h5>
                </div>
                <AntButton type="primary" danger size="medium" onClick={changePhoneConfirm}>
                  Change Phone
                </AntButton>
              </div>
            </Col>

            <Col md={6} xs={6}>
              <label className="text-muted" htmlFor="identificationNo">
                Identification No:
              </label>
              <h5 className="card-title mb-0">{user?.identificationNo || "-"}</h5>
            </Col>

            <Col md={6} xs={12}>
              <label className="text-muted" htmlFor="address">
                Address:
              </label>
              <h5 className="card-title mb-0">{generalInfo?.address || "-"}</h5>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default IndividualGeneralInfo;
