import { useState, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { useHistory } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Alert, Tooltip, message, Row as AntRow, Col as AntCol } from "antd";
import PhoneInput from 'react-phone-input-2'


const SmsAuthentication = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)



    const key = "updatable";

    const openMessage = () => {
        message.loading({ content: "Sending...", key });
        setTimeout(() => {
            message.success({ content: "Successfully sent", key, duration: 2 });
        }, 3000);
    };

    const onFinish = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            history.push("/security/sms-otp-enabled")
        }, 3000);
    }



    return (
        <Container>
            <Row>
                <Col md={6} className="mx-auto my-auto">
                    <div className="change-email-form mt-4">
                        <div className="text-center">
                            <h2 className="dark-text-white">Enable Phone Number Verification</h2>
                        </div>

                        <h6 className="dark-text-white">New Phone Number Verification</h6>

                        <div className="mt-4">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >

                                <Form.Item
                                    label="Phone Number"
                                    name="phone"
                                    required
                                    rules={[{ required: true, message: "Required field" }]}
                                >
                                    <PhoneInput
                                        inputStyle={{ width: '100%', height: 40 }}
                                        country={'tr'}
                                        specialLabel=""
                                        //value={phone}
                                        //placeholder="Cell Phone*"
                                        disableDropdown={false}
                                        inputClass="ant-input ant-input-lg"
                                    //onChange={phone => setPhoneHandler(phone)}
                                    />
                                </Form.Item>


                                <Form.Item label="Phone Number Verification Code" extra="Please enter sms authentication code">
                                    <AntRow gutter={2}>
                                        <AntCol md={19} xs={16}>
                                            <Form.Item
                                                name="smsCode"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Required field!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" name="smsCode" />
                                            </Form.Item>
                                        </AntCol>
                                        <AntCol md={5} xs={8}>
                                            <Tooltip title="send code to your phone">
                                                <Button className="btn-block" size="large" onClick={openMessage} type="primary">
                                                    Get code
                                                </Button>
                                            </Tooltip>
                                        </AntCol>
                                    </AntRow>
                                </Form.Item>







                                <h6 className="mt-5 dark-text-white">Security Verification</h6>

                                <Form.Item label="Email verification code" extra="Enter the 6-digit code sent to inf***@test.com">
                                    <AntRow gutter={2}>
                                        <AntCol md={19} xs={16}>
                                            <Form.Item
                                                name="emailCode"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Required field!',
                                                    },
                                                ]}
                                            >
                                                <Input size="large" name="emailCode" />
                                            </Form.Item>
                                        </AntCol>
                                        <AntCol md={5} xs={8}>
                                            <Tooltip title="send code to your email">
                                                <Button className="btn-block" size="large" onClick={openMessage} type="primary">
                                                    Get code
                                                </Button>
                                            </Tooltip>
                                        </AntCol>
                                    </AntRow>
                                </Form.Item>


                                <Form.Item className="mt-4">
                                    <Button htmlType="submit" type="primary" className="btn-block" size="large" loading={loading}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

export default SmsAuthentication;
