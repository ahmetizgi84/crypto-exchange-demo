import { useState, useContext, createRef, useRef } from "react";
import ApiContext from "../../context/ApiContext";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Alert, Tooltip, message, Checkbox } from "antd";
import { useFormik } from "formik";
import { RegisterSchemaCorporate } from "../../utils/formValidations";
import { Link } from "react-router-dom"
import { Context as AuthContext } from "../../context/AuthContext";
import styles from "./Verification.module.css";
import cn from "classnames";

const ChangePhone = () => {
    const [form] = Form.useForm();
    const formRef = createRef();
    const {
        _signupHandler,
        state: { indicator },
      } = useContext(AuthContext);

    const { handleChange, values, errors, touched, submitForm, validateForm } = useFormik({
        initialValues: {
          termsOne: false,
          termsTwo: false,
         
        },
        onSubmit: (values) => {
          _signupHandler(values);
        },
    
        validationSchema: RegisterSchemaCorporate,
      });


    return (
        <Container>
            <Row>
                <Col md={6} className="mx-auto my-auto">
                    <div className="change-email-form mt-4">
                        <div className="text-center">
                            <div className={cn([styles.reset])}>Reset Security Verification</div>
                        </div>

                        <div className="my-4">
                            <Alert
                                message="Warning"
                                description="Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to protect your account."
                                type="warning"
                                showIcon
                            />
                        </div>

                        <p>Please select your issue(s):</p>

                        <div className="mt-4">
                            <Form
                                form={form} 
                                ref={formRef}
                                //onFinish={handleErrorOnSubmit}
                            >

                                <Form.Item
                              
                                    valuePropName="termsTwo"
                                    name="termsTwo"
                                    help={touched.termsTwo && errors.termsTwo ? errors.termsTwo : ""}
                                    validateStatus={touched.termsTwo && errors.termsTwo ? "error" : "success"}
                                >
                                    <Checkbox checked={values.termsTwo || false} onChange={handleChange("termsTwo")} name="termsTwo">554***0542 is unavailable and I would like to reset it.</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    valuePropName="termsOne"
                                    name="termsOne"
                                    help={touched.termsOne && errors.termsOne ? errors.termsOne : ""}
                                    validateStatus={touched.termsOne && errors.termsOne ? "error" : "success"}
                                >
                                    <Checkbox checked={values.termsOne || false} onChange={handleChange("termsOne")} name="termsOne">
                                        test***@gmail.com is unavailable and I would like to change my e-mail address.
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item className="mt-4">
                                    <Button htmlType="submit" type="primary" className="btn-block" size="large">
                                    <Link to="/" >
                                         Confirm reset
                                    </Link>
                                        
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

export default ChangePhone;
