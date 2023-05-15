import { useContext, createRef } from 'react'
import { ResetPasswordSchema } from "../../utils/formValidations";
import { useFormik } from 'formik'
import ReCAPTCHA from "react-google-recaptcha";
import ApiContext from '../../context/ApiContext';
import { Form, Input, Button } from 'antd';
import constants from "../../common/constants";


function Reset() {
  const [form] = Form.useForm();
  const recaptchaRef = createRef();
  const { _sendEmailToResetPassword } = useContext(ApiContext)


  const { handleSubmit, handleChange, values, errors, touched, /*setFieldValue*/ } = useFormik({
    initialValues: {
      email: '',
      reCaptcha: ''
    },
    onSubmit: values => {
      _sendEmailToResetPassword(values)
    },

    validationSchema: ResetPasswordSchema,
  });



  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="change-email-form my-auto">
          <div className="text-center">
            <img className="mb-3" src={constants.logo} alt="logo" style={{ width: "176px", height: "66px" }} />
            <div className="reset-form-title">Reset My Password</div>
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
          >

            <Form.Item
              name="email"
              help={touched.email && errors.email ? errors.email : ""}
              validateStatus={touched.email && errors.email ? "error" : "success"}
            >
              <Input
                size="large"
                type="text"
                placeholder="Email Address"
                onChange={handleChange("email")}
                value={values.email}
                //onChange={(value) => setFieldValue("email", value)}
                rules={[{ required: true, message: 'Please input your password!' }]}
              />
            </Form.Item>

            <div className="form-group mb-4">
              <div className="d-flex justify-content-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  name="reCaptcha"
                  sitekey="6Lci6N0cAAAAABPWFHxZ1XJrlq3yITJbqk5H3FKt"
                  onChange={handleChange('reCaptcha')}
                />
              </div>
              {errors.reCaptcha && touched.reCaptcha && (
                <div role="alert" className="ant-form-item-explain-error">
                  {errors.reCaptcha}
                </div>
              )}
            </div>

            <Form.Item>
              <Button size="large" htmlType="submit" className="btn-block" type="primary">Submit</Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    </>
  )
}

export default Reset


