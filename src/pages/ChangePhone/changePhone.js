import { useState, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Alert, Tooltip, message } from "antd";
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import { ChangePhoneSchema } from "../../utils/formValidations";

const ChangePhone = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState("optional");
    const { user, _updateUser } = useContext(ApiContext);

    const { handleSubmit, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            phoneNumber: ""
        },
        onSubmit: async (values) => {
            let tempUser = { ...user };
            tempUser.phoneNumber = values.phoneNumber;
            _updateUser(tempUser);

        },
        validationSchema: ChangePhoneSchema,
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
                            <h2 className="change-email-subtitle">Change Phone Number</h2>
                        </div>

                        <div className="my-4">
                            <Alert
                                message="Warning"
                                description="Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to protect your account."
                                type="warning"
                                showIcon
                            />
                        </div>

                        <h6 className="change-email-subtitle">New Phone Number Verification</h6>

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
                                    label="New phone number"
                                    name="phoneNumber"
                                    required
                                    //rules={[{ required: true, message: "Required field" }]}
                                    help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ""}
                                    validateStatus={touched.phoneNumber && errors.phoneNumber ? "error" : "success"}
                                >
                                    <PhoneInput
                                        name="phoneNumber"
                                        inputStyle={{ width: '100%', height: 40 }}
                                        country={'tr'}
                                        value={values.phoneNumber}
                                        placeholder="Cell Phone"
                                        disableDropdown={false}
                                        inputClass="ant-input ant-input-lg"
                                        onChange={handleChange("phoneNumber")}
                                    />
                                </Form.Item>

                                <Input.Group compact className="my-4">
                                    <label className="mb-1 change-email-label">New Phone Number Verification Code</label>
                                    <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                                    <Tooltip title="send code to your new phone">
                                        <Button size="large" onClick={openMessage} type="primary">
                                            Get code
                                        </Button>
                                    </Tooltip>
                                    <small className="text-muted">Please enter sms authentication code</small>
                                </Input.Group>





                                <h6 className="mt-5 change-email-subtitle">Security Verification</h6>

                                <Input.Group compact className="my-4">
                                    <label className="mb-1 change-email-label">Email verification code</label>
                                    <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                                    <Tooltip title="send code to your email">
                                        <Button size="large" onClick={openMessage} type="primary">
                                            Get code
                                        </Button>
                                    </Tooltip>
                                    <small className="text-muted">Enter the 6-digit code sent to inf***@test.com</small>
                                </Input.Group>

                                <Input.Group compact className="my-4">
                                    <label className="mb-1 change-email-label">Phone verification code</label>
                                    <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                                    <Tooltip title="send code to your old phone">
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
                                    <Button htmlType="submit" type="primary" className="btn-block" size="large">
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

export default ChangePhone;
