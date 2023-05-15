import { useState } from "react";
import {
  Button as AntButton,
  Modal as AntModal,
  Switch,
  Alert,
  Form,
  Col as AntCol,
  Row as AntRow,
  Input,
  Tooltip,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { CheckCircleFill, DashCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { makeToast } from "../../utils/makeToast";

import GeneralSecurityLogic from "./GeneralSecurityLogic";

/**
 *
 * @todo
 * 1. kayıt olurken e-posta doğrulaması yapılıyor.
 * Bu aşamada kullanıcının login olabilmesi sadece e-posta adresini doğrulaması ile mümkün.
 * Kullanıcı adresini doğrularsa e-posta adresi ve şifreyle login yapabilir.
 *
 * 2. Kullanıcı telefonunu sisteme otp gelmesi için eklerse;
 * bu defa login olabilmesi için e-posta adresi ve şifrenin yanı sıra, telefonuna gelecek kodu da girdikten sonra
 * login olabilecektir.
 *
 * 3. kullanıcı google authenticator'u da aktif ettiyse;
 * login olurken cep telefonuna gelecek otp koduyla ya da google uthenticator vasıtasıyla üretecek olduğu kodu girmek kaydıyla login olabilecektir.
 * her iki güvenlik ayarı login işleminde aynı anda kullanılmasına gerek yok. Kullanıcıya hangisini kullanmak istediğini seçtiriyoruz.
 *
 * Ancak withdraw, deposit gibi para çekme yatırma işlemlerinde telefon doğrulaması, google authenticator'u aktifleştirme ve "know your customer"
 * sürecinin ilerletilmiş olması bir şarttır.
 */

function GeneralSecurity() {
  const history = useHistory();
  const { logicState, setModalState } = GeneralSecurityLogic();
  const { show } = logicState;

  // When press show Sms Authentication safety tip
  function showSmsOtpWarn() {
    AntModal.confirm({
      title: "Safety Tip",
      icon: <ExclamationCircleOutlined />,
      content:
        "When SMS Authentication is enabled, you will only be able to login after enter the code you've received.",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => history.push("/security/activate-sms-otp"),
    });
  }
  // When press show Sms Authentication safety tip

  // When you want to enable anti-phishing code
  function showPhishingCodeWarn() {
    AntModal.confirm({
      title: "Anti Phishing Code",
      icon: <ExclamationCircleOutlined />,
      content: <AntiPhishingContent />,
      okText: "Create Anti-Phishing code",
      cancelText: "Cancel",
      onOk: () => setModalState(true),
    });
  }

  function AntiPhishingContent() {
    return (
      <div>
        <Alert
          description="Do not disclose your password, Google Authentication codes, or SMS to anyone, including Woynex support."
          type="warning"
          className="mb-4"
        />
        <h6>What is Anti Phishing Code?</h6>
        <p>
          An Anti-Phishing Code is a code that helps to prevent phishing attempts from fake Woynex websites or email
          addresses
        </p>

        <h6>How does it work?</h6>
        <p>Once you've set your unique Anti-Phishing Code, it will be included in all genuine Woynex emails.</p>
      </div>
    );
  }
  // When you want to enable anti-phishing code

  function showToast() {
    AntModal.confirm({
      title: "Are you sure you want to disable your account?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Once your account is disabled, you will not be able to begin the reactivation process until at least two hours have passed.",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => history.push("/security/disable-account"),
    });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Security Settings</h5>
        <div className="security-notification">
          <ul>
            <li>
              <div className="notification-info" style={{ flex: 1 }}>
                <p className="sub-title">SMS Authentication</p>
                <span className="span">Enable two factor authentication service via SMS OTP</span>
              </div>
              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <XCircleFill size={20} className="mr-2 icon" color="var(--c-textMuted)" />
                <span className="span">Disabled</span>
              </div>
              <AntButton type="primary" size="medium" onClick={showSmsOtpWarn}>
                Activate
              </AntButton>
            </li>

            <li>
              <div className="notification-info" style={{ flex: 1 }}>
                <p className="sub-title">Google Authenticator</p>
                <span className="span">Enable two factor authentication service via Google Authenticator app</span>
              </div>
              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <XCircleFill size={20} className="mr-2 icon" color="var(--c-textMuted)" />
                <span className="span">Disabled</span>
              </div>
              <Link to="/security/enable-google-authenticator">
                <AntButton type="primary" size="medium">
                  Activate
                </AntButton>
              </Link>
            </li>

            <li>
              <div className="notification-info" style={{ flex: 1 }}>
                <p className="sub-title">Phishing Code</p>
                <span className="span">Include a private phishing code in your emails</span>
              </div>

              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <XCircleFill size={20} className="mr-2 icon" color="var(--c-textMuted)" />
                <span className="span">Disabled</span>
              </div>
              <AntButton type="primary" size="medium" onClick={showPhishingCodeWarn}>
                Activate
              </AntButton>

              {/* <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <CheckCircleFill size={20} className="mr-2" color="var(--c-successGreen)" />
                <span className="span" style={{ color: "var(--c-successGreen)" }}>Activated</span>
              </div>
              <Button type="button" className="btn btn-secondary btn-sm" style={{ width: 76 }}>
                Disable
              </Button> */}
            </li>

            {/* <li>
              <div className="notification-info">
                <p>Email Authentication</p>
                <span className="span">Get security code in your mail</span>
              </div>
              <Switch checked={true} onChange={() => console.log("checked will change")} />
            </li> */}

            <li>
              <div className="notification-info" style={{ flex: 1 }}>
                <p className="sub-title">Touch ID</p>
                <span className="span">Use Touch ID to unlock the mobile app</span>
              </div>
              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <XCircleFill size={20} className="mr-2 icon" color="var(--c-textMuted)" />
                <span className="span">Disabled</span>
              </div>
              <AntButton type="primary" size="medium">
                Activate
              </AntButton>
            </li>

            <li>
              <div className="notification-info" style={{ flex: 1 }}>
                <p className="sub-title">Pattern</p>
                <span className="span">Use Pattern to unlock the mobile app</span>
              </div>
              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <XCircleFill size={20} className="mr-2 icon" color="var(--c-textMuted)" />
                <span className="span">Disabled</span>
              </div>
              <AntButton type="primary" size="medium">
                Activate
              </AntButton>
            </li>

            <li>
              <div className="notification-info">
                <p className="sub-title">DISABLE ACCOUNT</p>
                <span className="span">
                  Disabling your account will cause to cancel all pending transactions/withdrawals, API keys and
                  devices.
                  <br />
                  In order to reactivate your account, you will need to contact support.
                </span>
              </div>
              <AntButton type="primary" danger size="medium" onClick={showToast}>
                Disable
              </AntButton>
            </li>
          </ul>
        </div>
      </div>
      <AntiPhishingModal show={show} setModalState={setModalState} />
    </div>
  );
}

export default GeneralSecurity;

function AntiPhishingModal({ show, setModalState }) {
  const [form] = Form.useForm();
  const [phishingCode, setPhishingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const modalCloseHandler = () => {
    form.resetFields();
    setModalState(false);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    console.log("form values: ", values);
    setTimeout(() => {
      setLoading(false);
      setModalState(false);
      makeToast("success", "Anti-Phishing Code has been settled!");
    }, 3500);
  };

  return (
    <AntModal visible={show} title="Create Anti-Phishing Code" onCancel={modalCloseHandler} footer={false}>
      <Form form={form} layout="vertical" scrollToFirstError onFinish={handleSubmit}>
        <Form.Item label="Anti-phishing code" extra="Please enter 4-20 non-special characters">
          <Form.Item
            name="phishingCode"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Required field!",
                pattern: "[0-9a-zA-Z]{4,20}",
              },
            ]}
          >
            <Input
              size="large"
              name="phishingCode"
              maxLength={20}
              value={phishingCode}
              onChange={(e) => setPhishingCode(e.target.value)}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mt-4">
          <AntButton htmlType="submit" type="primary" className="btn-block" size="large" loading={loading}>
            Submit
          </AntButton>
        </Form.Item>
      </Form>
    </AntModal>
  );
}
