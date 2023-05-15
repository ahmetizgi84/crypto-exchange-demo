import { useContext, useState, createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
// import { LoginSchema } from "../../utils/formValidations";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const aspectRatio = 151 / 574;
const width = 150;
const height = width * aspectRatio;

function Login() {
  const [form] = Form.useForm();
  const formRef = createRef();
  const {
    _loginHandler,
    state: { indicator },
  } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const recaptchaRef = createRef();
  const [rememberMe, setRememberMe] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const rememberUser = localStorage.getItem("remember_me");
    if (rememberUser) {
      const existingUser = JSON.parse(rememberUser);
      setUserEmail(existingUser.value);
      onFill(existingUser.value);
    }
  }, []);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: userEmail || "",
      password: "",
      reCaptcha: "",
    },
    onSubmit: (values) => {
      onLogin(values);
    },

    // validationSchema: LoginSchema,
  });

  const onLogin = (values) => {
    if (rememberMe) {
      setWithExpiry("remember_me", values.email);
    }
    _loginHandler(values);
  };

  function setWithExpiry(key, value) {
    const item = {
      value: value,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  const onFill = (userEmail) => {
    formRef.current.setFieldsValue({
      email: userEmail,
      password: "",
      reCaptcha: "",
    });
  };

  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="change-email-form woynex-login-form my-auto">
          <Form form={form} ref={formRef} onFinish={handleSubmit} className="login-form" name="normal_login">
            <div className="text-center">
              {theme === "light" ? (
                <img
                  className="mb-3"
                  // src="../img/logo-dark.svg"
                  src={"https://media.hebys.io/images/hebys-logo.png"}
                  alt="logo"
                  // style={{ width: "176px", height: "66px" }}
                  style={{ objectFit: "contain", width, height }}
                />
              ) : (
                <img
                  className="mb-3"
                  // src="../img/logo-light.svg"
                  src={"https://media.hebys.io/images/hebys-logo-dark-mode.png"}
                  alt="logo"
                  // style={{ width: "176px", height: "66px" }}
                  style={{ objectFit: "contain", width, height }}
                />
              )}
              <div className="reset-form-title">Login</div>
            </div>

            <Form.Item
              name="email"
              help={touched.email && errors.email ? errors.email : ""}
              validateStatus={touched.email && errors.email ? "error" : "success"}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                size="large"
                type="text"
                placeholder="Email"
                onChange={handleChange("email")}
                value={values.email}
              />
            </Form.Item>

            <Form.Item
              name="password"
              help={touched.password && errors.password ? errors.password : ""}
              validateStatus={touched.password && errors.password ? "error" : "success"}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                type="text"
                placeholder="Password"
                onChange={handleChange("password")}
                value={values.password}
              />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Item name="remember" valuePropName="checked" className="mb-0">
                <Checkbox checked={rememberMe || false} onChange={() => setRememberMe(!rememberMe)}>
                  Remember me
                </Checkbox>
              </Form.Item>
              <div className="text-right">
                <Link to="/reset">Forgot Password</Link>
              </div>
            </div>

            <div className="form-group mb-4">
              <div className="d-flex justify-content-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  name="reCaptcha"
                  sitekey="6Lci6N0cAAAAABPWFHxZ1XJrlq3yITJbqk5H3FKt"
                  onChange={handleChange("reCaptcha")}
                  theme={theme}
                />
              </div>
              {errors.reCaptcha && touched.reCaptcha && (
                <div role="alert" className="ant-form-item-explain-error">
                  {errors.reCaptcha}
                </div>
              )}
            </div>

            <Form.Item>
              <Button size="large" htmlType="submit" className="btn-block" type="primary" loading={indicator}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <h6>
            You don't have an account? <Link to="/signup">Signup</Link>
          </h6>
        </div>
      </div>
    </>
  );
}

export default Login;
