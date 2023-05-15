import { useContext, createRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, DatePicker } from "antd";
import { Context as AuthContext } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import { RegisterSchemaIndividual } from "../../utils/formValidations";

const aspectRatio = 151 / 574;
const width = 150;
const height = width * aspectRatio;

function Individual() {
  const [form] = Form.useForm();
  const formRef = createRef();
  const history = useHistory();
  const {
    _signupHandler,
    state: { indicator },
  } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const recaptchaRef = createRef();

  const { handleChange, values, errors, touched, setFieldValue, submitForm, validateForm } = useFormik({
    initialValues: {
      identificationNo: "",
      email: "",
      name: "",
      surname: "",
      password: "",
      rePassword: "",
      birthDate: "",
      phoneNumber: "",
      referralID: "",
      reCaptcha: "",
      termsOne: false,
      termsTwo: false,
      termsThree: false,
    },
    onSubmit: (values) => {
      _signupHandler(values, history);
    },

    validationSchema: RegisterSchemaIndividual,
  });

  const handleErrorOnSubmit = () => {
    submitForm();

    validateForm().then((fields) => {
      const elemKeys = Object.keys(fields);
      if (elemKeys.length > 0) {
        const errorElement = document.querySelector(`input[name="${elemKeys[0]}"]`);
        console.log("errorElement: ", errorElement);
        if (errorElement && typeof errorElement !== "undefined") {
          errorElement.scrollIntoView({ behavior: "smooth" });
          errorElement.focus({ preventScroll: true });
        } else {
          window.scrollTo({
            top: 400,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    });
  };

  return (
    <div className="change-email-form woynex-login-form my-auto">
      <Form form={form} ref={formRef} onFinish={handleErrorOnSubmit} className="login-form" name="normal_login">
        <div className="text-center">
          <img
            className="mb-3"
            // src="../img/logo-dark.svg"
            src={"https://media.hebys.io/images/hebys-logo.png"}
            alt="logo"
            // style={{ width: "176px", height: "66px" }}
            style={{ objectFit: "contain", width, height }}
          />
          <div className="reset-form-title">New Personal Account</div>
        </div>

        <Form.Item
          name="identificationNo"
          help={touched.identificationNo && errors.identificationNo ? errors.identificationNo : ""}
          validateStatus={touched.identificationNo && errors.identificationNo ? "error" : "success"}
        >
          <Input
            name="identificationNo"
            size="large"
            type="text"
            placeholder="National identity number"
            value={values.identificationNo}
            maxLength={11}
            onChange={handleChange("identificationNo")}
          />
        </Form.Item>

        <Form.Item
          name="email"
          help={touched.email && errors.email ? errors.email : ""}
          validateStatus={touched.email && errors.email ? "error" : "success"}
        >
          <Input
            name="email"
            size="large"
            type="text"
            placeholder="Email address"
            value={values.email}
            onChange={handleChange("email")}
          />
        </Form.Item>

        <Form.Item
          name="name"
          help={touched.name && errors.name ? errors.name : ""}
          validateStatus={touched.name && errors.name ? "error" : "success"}
        >
          <Input
            name="name"
            size="large"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange("name")}
          />
        </Form.Item>

        <Form.Item
          name="surname"
          help={touched.surname && errors.surname ? errors.surname : ""}
          validateStatus={touched.surname && errors.surname ? "error" : "success"}
        >
          <Input
            name="surname"
            size="large"
            type="text"
            placeholder="Surname"
            value={values.surname}
            onChange={handleChange("surname")}
          />
        </Form.Item>

        <Form.Item
          name="birthDate"
          help={touched.birthDate && errors.birthDate ? errors.birthDate : ""}
          validateStatus={touched.birthDate && errors.birthDate ? "error" : "success"}
        >
          <DatePicker
            name="birthDate"
            value={values.birthDate}
            onChange={(date, dateString) => setFieldValue("birthDate", date._d)}
            size="large"
            className="btn-block wynx-picker"
            placeholder="Birthday"
            allowClear={false}
            format="DD.MM.YYYY"
          />
        </Form.Item>

        <span className="text-muted">
          <small>Cell phone number</small>
        </span>
        <Form.Item
          name="phoneNumber"
          help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ""}
          validateStatus={touched.phoneNumber && errors.phoneNumber ? "error" : "success"}
        >
          <PhoneInput
            name="phoneNumber"
            inputStyle={{ width: "100%", height: 40 }}
            country={"tr"}
            value={values.phoneNumber}
            placeholder="Cell Phone"
            disableDropdown={false}
            inputClass="ant-input ant-input-lg"
            onChange={handleChange("phoneNumber")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          help={touched.password && errors.password ? errors.password : ""}
          validateStatus={touched.password && errors.password ? "error" : "success"}
        >
          <Input.Password
            name="password"
            size="large"
            type="text"
            placeholder="Password"
            value={values.password}
            onChange={handleChange("password")}
          />
        </Form.Item>

        <Form.Item
          name="rePassword"
          help={touched.rePassword && errors.rePassword ? errors.rePassword : ""}
          validateStatus={touched.rePassword && errors.rePassword ? "error" : "success"}
        >
          <Input.Password
            name="rePassword"
            size="large"
            type="text"
            placeholder="Password confirmation"
            value={values.rePassword}
            onChange={handleChange("rePassword")}
          />
        </Form.Item>

        <Form.Item
          name="referralID"
          help={touched.referralID && errors.referralID ? errors.referralID : ""}
          validateStatus={touched.referralID && errors.referralID ? "error" : "success"}
        >
          <Input
            name="referralID"
            size="large"
            type="text"
            placeholder="Referral ID (optional)"
            value={values.referralID}
            onChange={handleChange("referralID")}
          />
        </Form.Item>

        {/* KULLANICI SÖZLEŞMESİ */}
        <Form.Item
          valuePropName="termsOne"
          name="termsOne"
          help={touched.termsOne && errors.termsOne ? errors.termsOne : ""}
          validateStatus={touched.termsOne && errors.termsOne ? "error" : "success"}
        >
          <Checkbox checked={values.termsOne || false} onChange={handleChange("termsOne")} name="termsOne">
            I have read and agree to WoynEx’s <Link to="/terms-and-conditions">Terms of Service</Link>.
          </Checkbox>
        </Form.Item>

        {/* AÇIK RIZA METNİ */}
        <Form.Item
          valuePropName="termsTwo"
          name="termsTwo"
          help={touched.termsTwo && errors.termsTwo ? errors.termsTwo : ""}
          validateStatus={touched.termsTwo && errors.termsTwo ? "error" : "success"}
        >
          <Checkbox checked={values.termsTwo || false} onChange={handleChange("termsTwo")} name="termsTwo">
            I have read and reviewed the <Link to="/terms-and-conditions">GDPR Consent Text</Link>,
            <br />
            Within the scope of the attached text, <br />I approve processing and transfer of my personal data.
          </Checkbox>
        </Form.Item>

        {/* AYDINLATMA METNİ */}
        <Form.Item
          valuePropName="termsThree"
          name="termsThree"
          help={touched.termsThree && errors.termsThree ? errors.termsThree : ""}
          validateStatus={touched.termsThree && errors.termsThree ? "error" : "success"}
        >
          <Checkbox checked={values.termsThree || false} onChange={handleChange("termsThree")} name="termsThree">
            I agree to receive commercial electronic messages,
            <br />
            within the scope of <Link to="/terms-and-conditions">GDPR Clarification Text</Link>,
            <br />
            via telephone and electronic communication channels.
          </Checkbox>
        </Form.Item>

        <div className="form-group mb-4">
          <div className="d-flex justify-content-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              name="reCaptcha"
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
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
            Create Personal Account
          </Button>
        </Form.Item>
      </Form>
      <h6>
        Already registered?
        <Link to="/login"> Log In</Link>
      </h6>
    </div>
  );
}

export default Individual;
