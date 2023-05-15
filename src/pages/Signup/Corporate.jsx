import { useContext, createRef, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { Context as AuthContext } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import { RegisterSchemaCorporate } from "../../utils/formValidations";

const aspectRatio = 151 / 574;
const width = 150;
const height = width * aspectRatio;

function Corporate() {
  const [form] = Form.useForm();
  const formRef = createRef();
  const history = useHistory();
  const {
    _signupHandler,
    state: { indicator },
  } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const recaptchaRef = createRef();

  const { handleChange, values, errors, touched, submitForm, validateForm } = useFormik({
    initialValues: {
      tenantName: "",
      identificationNo: "",
      subjectOfActivity: "",
      taxOffice: "",
      tradeRegisterNumber: "",
      address: "",
      website: "",
      workPhoneNumber: "",
      workEmail: "",
      name: "",
      surname: "",
      mobileNumber: "",
      email: "",
      password: "",
      rePassword: "",
      reCaptcha: "",
      termsOne: false,
      termsTwo: false,
      termsThree: false,
    },
    onSubmit: (values) => {
      _signupHandler(values, history);
    },

    validationSchema: RegisterSchemaCorporate,
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
            top: 300,
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
          <div className="reset-form-title">New Corporate Account</div>
        </div>

        {/* COMPANY LEGAL TITLE */}
        <Form.Item
          name="tenantName"
          help={touched.tenantName && errors.tenantName ? errors.tenantName : ""}
          validateStatus={touched.tenantName && errors.tenantName ? "error" : "success"}
        >
          <Input
            size="large"
            name="tenantName"
            type="text"
            placeholder="Company legal title"
            value={values.tenantName}
            onChange={handleChange("tenantName")}
          />
        </Form.Item>

        {/* TAX NUMBER === IDENTIFICATIONNO */}
        <Form.Item
          name="identificationNo"
          help={touched.identificationNo && errors.identificationNo ? errors.identificationNo : ""}
          validateStatus={touched.identificationNo && errors.identificationNo ? "error" : "success"}
        >
          <Input
            name="identificationNo"
            size="large"
            type="text"
            placeholder="Tax number"
            value={values.identificationNo}
            onChange={handleChange("identificationNo")}
          />
        </Form.Item>

        {/* SUBJECT OF ACTIVITY */}
        <Form.Item
          name="subjectOfActivity"
          help={touched.subjectOfActivity && errors.subjectOfActivity ? errors.subjectOfActivity : ""}
          validateStatus={touched.subjectOfActivity && errors.subjectOfActivity ? "error" : "success"}
        >
          <Input
            name="subjectOfActivity"
            size="large"
            type="text"
            placeholder="Sector"
            value={values.subjectOfActivity}
            onChange={handleChange("subjectOfActivity")}
          />
        </Form.Item>

        {/* TAX OFFICE */}
        <Form.Item
          name="taxOffice"
          help={touched.taxOffice && errors.taxOffice ? errors.taxOffice : ""}
          validateStatus={touched.taxOffice && errors.taxOffice ? "error" : "success"}
        >
          <Input
            name="taxOffice"
            size="large"
            type="text"
            placeholder="Chamber of commerce"
            value={values.taxOffice}
            onChange={handleChange("taxOffice")}
          />
        </Form.Item>

        {/* TRADE REGISTRY NO */}
        <Form.Item
          name="tradeRegisterNumber"
          help={touched.tradeRegisterNumber && errors.tradeRegisterNumber ? errors.tradeRegisterNumber : ""}
          validateStatus={touched.tradeRegisterNumber && errors.tradeRegisterNumber ? "error" : "success"}
        >
          <Input
            name="tradeRegisterNumber"
            size="large"
            type="text"
            placeholder="Trade registry no"
            value={values.tradeRegisterNumber}
            onChange={handleChange("tradeRegisterNumber")}
          />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          name="address"
          help={touched.address && errors.address ? errors.address : ""}
          validateStatus={touched.address && errors.address ? "error" : "success"}
        >
          <Input
            name="address"
            size="large"
            type="text"
            placeholder="Address"
            value={values.address}
            onChange={handleChange("address")}
          />
        </Form.Item>

        {/* WEB SITE */}
        <Form.Item
          name="website"
          help={touched.website && errors.website ? errors.website : ""}
          validateStatus={touched.website && errors.website ? "error" : "success"}
        >
          <Input
            name="website"
            size="large"
            type="text"
            placeholder="Web site (www.companyname.com)"
            value={values.website}
            onChange={handleChange("website")}
          />
        </Form.Item>

        {/* COMPANY TELEPHONE NUMBER */}
        <span className="text-muted">
          <small>Company telephone number</small>
        </span>
        <Form.Item
          name="workPhoneNumber"
          help={touched.workPhoneNumber && errors.workPhoneNumber ? errors.workPhoneNumber : ""}
          validateStatus={touched.workPhoneNumber && errors.workPhoneNumber ? "error" : "success"}
        >
          <PhoneInput
            name="workPhoneNumber"
            inputStyle={{ width: "100%", height: 40 }}
            country={"tr"}
            value={values.workPhoneNumber}
            placeholder="Company telephone number"
            disableDropdown={false}
            inputClass="ant-input ant-input-lg"
            onChange={handleChange("workPhoneNumber")}
          />
        </Form.Item>

        {/* COMPANY EMAIL ADDRESS */}
        <Form.Item
          name="workEmail"
          help={touched.workEmail && errors.workEmail ? errors.workEmail : ""}
          validateStatus={touched.workEmail && errors.workEmail ? "error" : "success"}
        >
          <Input
            name="workEmail"
            size="large"
            type="text"
            placeholder="Company email address"
            value={values.workEmail}
            onChange={handleChange("workEmail")}
          />
        </Form.Item>

        {/* AUTHORIZED PERSON'S NAME */}
        <Form.Item
          name="name"
          help={touched.name && errors.name ? errors.name : ""}
          validateStatus={touched.name && errors.name ? "error" : "success"}
        >
          <Input
            name="name"
            size="large"
            type="text"
            placeholder="Authorized person's name"
            value={values.name}
            onChange={handleChange("name")}
          />
        </Form.Item>

        {/* AUTHORIZED PERSON'S SURNAME */}
        <Form.Item
          name="surname"
          help={touched.surname && errors.surname ? errors.surname : ""}
          validateStatus={touched.surname && errors.surname ? "error" : "success"}
        >
          <Input
            name="surname"
            size="large"
            type="text"
            placeholder="Authorized person's surname"
            value={values.surname}
            onChange={handleChange("surname")}
          />
        </Form.Item>

        {/* AUTHORIZED PERSON'S CELL PHONE */}
        <span className="text-muted">
          <small>Authorized person's cell phone</small>
        </span>
        <Form.Item
          name="mobileNumber"
          help={touched.mobileNumber && errors.mobileNumber ? errors.mobileNumber : ""}
          validateStatus={touched.mobileNumber && errors.mobileNumber ? "error" : "success"}
        >
          <PhoneInput
            name="mobileNumber"
            inputStyle={{ width: "100%", height: 40 }}
            country={"tr"}
            value={values.mobileNumber}
            disableDropdown={false}
            inputClass="ant-input ant-input-lg"
            onChange={handleChange("mobileNumber")}
          />
        </Form.Item>

        {/* AUTHORIZED PERSON'S EMAIL */}
        <Form.Item
          name="email"
          help={touched.email && errors.email ? errors.email : ""}
          validateStatus={touched.email && errors.email ? "error" : "success"}
        >
          <Input
            name="email"
            size="large"
            type="text"
            placeholder="Authorized person's email (to login)"
            value={values.email}
            onChange={handleChange("email")}
          />
        </Form.Item>

        {/* PASSWORD */}
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

        {/* PASSWORD CONFIRMATION */}
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
            Create Corporate Account
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

export default Corporate;
