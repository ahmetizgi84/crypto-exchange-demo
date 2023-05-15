import { useState, useContext } from "react";
import { Context as AuthContext } from '../../context/AuthContext'
import ApiContext from "../../context/ApiContext";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Alert, Tooltip, message } from "antd";
import { useFormik } from "formik";
import { ChangeEmailSchema } from "../../utils/formValidations";
const ChangeEmail = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const { user, _updateUser } = useContext(ApiContext);
  const { _logoutHandler, state: { userData, isLoggedIn } } = useContext(AuthContext)
  const history = useHistory();

  /**
   * @TODO
   * Verification Code hazır olduğunda, New Email Verification Code, Email verification code
   * Phone verification code, Authenticator code validasyon kontrolü sağlanacak.
   *  Mail güncellendikten sonra ki aşamalar hazırlanacak(yeni email'e gelen e-posta, belli bir süre girememesi gibi)
   * mail adresi değiştikten sonra eski mail ile artık giriş yapamıyor yeni mail ile devam ediyor.
   */

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: user.name,
      surName: user.surname,
      email: ""
    },
    onSubmit: async (values) => {
      let tempUser = { ...user };
      tempUser.email = values.email;
      const response = await _updateUser(tempUser);
      if (response) {
        _logoutHandler(history)
      }
    },

    validationSchema: ChangeEmailSchema,
  });

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const key = "updatable";

  const openMessage = () => {
    message.loading({ content: "Sending...", key });
    setTimeout(() => {
      message.success({ content: "Successfully sent", key, duration: 2 });
    }, 3000);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto my-auto">
          <div className="change-email-form mt-4">
            <div className="text-center">
              <h2 className="change-email-subtitle">Change Email</h2>
            </div>

            <div className="my-4">
              <Alert
                message="Warning"
                description="Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to protect your account."
                type="warning"
                showIcon
              />
            </div>

            <h6 className="change-email-subtitle">New Email Verification</h6>

            <div className="mt-4">
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{ requiredMarkValue: requiredMark }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
              >
                <Form.Item
                  label="New email address"
                  name="email"
                  required
                  //rules={[{ required: true, message: "Required field" }]}
                  help={touched.email && errors.email ? errors.email : ""}
                  validateStatus={touched.email && errors.email ? "error" : "success"}
                >
                  <Input
                    size="large"
                    type="text"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </Form.Item>

                <Input.Group compact className="my-4">
                  <label className="mb-1 change-email-label">New Email Verification Code</label>
                  <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                  <Tooltip title="send code to your new email">
                    <Button size="large" onClick={openMessage} type="primary">
                      Get code
                    </Button>
                  </Tooltip>
                </Input.Group>

                <h6 className="mt-5 change-email-subtitle">Security Verification</h6>

                <Input.Group compact className="my-4">
                  <label className="mb-1 change-email-label">Email verification code</label>
                  <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                  <Tooltip title="send code to your old email">
                    <Button size="large" onClick={openMessage} type="primary">
                      Get code
                    </Button>
                  </Tooltip>
                  <small className="text-muted">Enter the 6-digit code sent to inf***@test.com</small>
                </Input.Group>

                <Input.Group compact className="my-4">
                  <label className="mb-1 change-email-label">Phone verification code</label>
                  <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                  <Tooltip title="send code to your phone">
                    <Button size="large" onClick={openMessage} type="primary">
                      Get code
                    </Button>
                  </Tooltip>
                  <small className="text-muted">Enter the 6-digit code sent to 544****95</small>
                </Input.Group>

                <Input.Group compact className="my-4">
                  <label className="mb-1 change-email-label">Authenticator code</label>
                  <Input size="large" />
                  <small className="text-muted">Enter the 6-digit code from Woynex/Google Authenticator</small>
                </Input.Group>

                <Form.Item className="mt-4">
                  <Button htmlType="submit" type="primary" className="btn-block" size="large" >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeEmail;
