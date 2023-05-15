import { useState, useContext, createRef } from "react";
import { Row, Col } from "react-bootstrap";
import cn from "classnames";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CreateSubAccountSchema } from "../../utils/formValidations";
import { useFormik } from "formik";
import ApiContext from "../../context/ApiContext";
import { ActivityIndicator } from "../../components";
import { Context as AuthContext } from "../../context/AuthContext";
import { Form, Input,  Checkbox, DatePicker,Button as AntButton, Popconfirm, Modal as AntModal,   Select  } from "antd";

const NewUser = ({ show, handleClose }) => {
  const [form] = Form.useForm();
  const formRef = createRef();
  const {
    _createSubAccount,
    state: { indicator },
  } = useContext(AuthContext);
  const { user } = useContext(ApiContext);
  
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      identificationNo: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      birthDate: "",
      phoneNumber: "",
      referralID: "",
      role: "",
      phone: "",
    },
    onSubmit: (values) => {
      onSubmitHandler(values);
      
    },
    validationSchema: CreateSubAccountSchema,
  });

  /**
   *
   * @TODO
   * Sub account user oluşturuluyor ancak
   * roleId olarak 5 değeri (sub kullanıcı) set edilmiyor
   * Kullanıcı yine bireysel olarak set ediliyor.
   * Bireysel kullanıcı olarak kaydedilmesi belki yeterlidir?
   */

  const onSubmitHandler =  (values) => {
    if (user) {
      const payload = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        identificationNo: "",
        phoneNumber: values.phone,
        password: values.password,
        rePassword: values.passwordConfirmation,
        roleId: 5,
        tenantId: user?.tenantId,
      };
      const response =  _createSubAccount(payload);
      if (response) {
        handleClose();
      }
      
    }
  };

  return (
              <AntModal
                visible={show}
                title="Add New User"
                maskClosable={false}
                onOk={handleSubmit}
                onCancel={() => {
                  //formRef.current.resetFields();
                  handleClose();
                  //setErrors({});
                }}
                footer={[
                  <AntButton
                    key="back"
                    onClick={() => {
                     // formRef.current.resetFields();
                      //setErrors({});
                     // console.log(formRef.current);
                      handleClose();
                    }}
                  >
                    Cancel
                  </AntButton>,
                  <AntButton key="submit" htmlType="submit" type="primary" onClick={handleSubmit}>
                    Confirm
                  </AntButton>,
                ]}
              >
                <Form form={form} ref={formRef} onFinish={handleSubmit}>
                  <div className="form-row">
                    <Form.Item className="form-group col-md-6"
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
                    <Form.Item className="form-group col-md-6"
                      name="email"
                      help={touched.email && errors.email ? errors.email : ""}
                      validateStatus={touched.email && errors.email ? "error" : "success"}
                    >
                      <Input
                        size="large"
                        type="email"
                        //className={cn(["form-control", errors.email && touched.email && "is-invalid"])}
                        placeholder="Initial Email Address"
                        value={values.email}
                        onChange={handleChange("email")}
                      />
                    </Form.Item>



                  </div>
                  <div className="form-row">
                    <Form.Item className="form-group col-md-6"
                      name="name"
                      help={touched.name && errors.name ? errors.name : ""}
                      validateStatus={touched.name && errors.name ? "error" : "success"}
                    >
                      <Input
                        size="large"
                        type="text"
                        // className={cn(["form-control", errors.name && touched.name && "is-invalid"])}
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange("name")}
                      />
                    </Form.Item>
                    <Form.Item className="form-group col-md-6"
                      name="surname"
                      help={touched.surname && errors.surname ? errors.surname : ""}
                      validateStatus={touched.surname && errors.surname ? "error" : "success"}
                    >
                      <Input
                        size="large"
                        type="text"
                        //className={cn(["form-control", errors.surname && touched.surname && "is-invalid"])}
                        placeholder="Surname"
                        value={values.surname}
                        onChange={handleChange("surname")}
                      />
                    </Form.Item>
                  </div>
                  <div className="form-row">
                    <Form.Item className=" col-md-6"
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
                    <Form.Item className="form-group col-md-6"
                      name="phone"
                      help={touched.phone && errors.phone ? errors.phone : ""}
                      validateStatus={touched.phone && errors.phone ? "error" : "success"}
                    >
                      <PhoneInput
                        type="text"
                        inputStyle={{ width: "100%", height: 36 }}
                        country={"tr"}
                        value={values.phone}
                        placeholder="Phone Number"
                        disableDropdown={false}
                        inputClass={cn(["form-control", errors.phone && touched.phone && "is-invalid ant-input ant-input-lg"])}
                        onChange={handleChange("phone")}
                      />
                    </Form.Item>
                  </div>
                  <div className="form-row">
                    <Form.Item className="form-group col-md-6"
                      name="password"
                      help={touched.password && errors.password ? errors.password : ""}
                      validateStatus={touched.password && errors.password ? "error" : "success"}
                    >
                      <Input.Password
                        size="large"
                        type="password"
                        //className={cn(["form-control", errors.password && touched.password && "is-invalid"])}
                        placeholder="Initial Login Password"
                        value={values.password}
                        onChange={handleChange("password")}
                      />
                    </Form.Item>

                    <Form.Item className="form-group col-md-6"
                      name="passwordConfirmation"
                      help={touched.passwordConfirmation && errors.passwordConfirmation ? errors.passwordConfirmation : ""}
                      validateStatus={touched.passwordConfirmation && errors.passwordConfirmation ? "error" : "success"}
                    >
                      <Input.Password
                        size="large"
                        type="password"
                        //className={cn([
                        //"form-control",
                        // errors.passwordConfirmation && touched.passwordConfirmation && "is-invalid",
                        // ])}
                        placeholder="Confirm Login Password"
                        value={values.passwordConfirmation}
                        onChange={handleChange("passwordConfirmation")}
                      />
                    </Form.Item>
                  </div>
                  <div className="form-row">
                    <Form.Item className="form-group col-md-6"
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


                    <Form.Item className="form-group col-md-6"
                      name="role"
                      help={touched.role && errors.role ? errors.role : ""}
                      validateStatus={touched.role && errors.role ? "error" : "success"}
                    >
                      <select
                        id="selectLanguage"
                        className={cn(["custom-select", errors.role && touched.role && "is-invalid"])}
                        onChange={handleChange("role")}
                      >
                        <option defaultValue value={""}>
                          Role
                        </option>
                        <option value={5}>Sub Account</option>
                      </select>
                    </Form.Item>

                  </div>

                  {/*<Form.Item>
                    <Button size="large" htmlType="submit" className="btn-block" type="primary" loading={indicator}>
                      {indicator ? <ActivityIndicator /> : "Confirm&Create"}
                  </Button>
                  </Form.Item>*/}
                </Form>
              </AntModal>
  );
};

export default NewUser;
