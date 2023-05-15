import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Tooltip, message, Col as AntCol, Row as AntRow } from "antd";
import { Link, useHistory } from "react-router-dom";
import styles from "./Verification.module.css";
import cn from "classnames";

const ChangePhone = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { _twoFaHandler, state: { indicator } } = useContext(AuthContext)


    const key = "updatable";

    const openMessage = () => {
        message.loading({ content: "Sending...", key });
        setTimeout(() => {
            message.success({ content: "Successfully sent", key, duration: 2 });
        }, 3000);
    };

    const onSubmitHandler = (values) => {
        //console.log("values: ", values)
        _twoFaHandler(values.smsCode, history);
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="mx-auto my-auto">
                    <div className="change-email-form mt-4">
                        <div className="text-center">
                            <h2 className={cn([styles.title])}>Security Verification</h2>
                        </div>

                        <div className="my-4">
                            <span> To secure your account, please complete the following verification.</span>
                        </div>

                        <div className="mt-4">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onSubmitHandler}
                            >

                                <Form.Item label="Phone verification code" extra="Enter the 6-digit code sent to 544****95 - TEST CODE: 123456" required>
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
                                            <Tooltip title="send code to your phone number">
                                                <Button className="btn-block" size="large" onClick={openMessage} type="primary">
                                                    Get code
                                                </Button>
                                            </Tooltip>
                                        </AntCol>
                                    </AntRow>
                                </Form.Item>



                                <div className={cn([styles.linkContainer])}>
                                    {/* <Link className={styles.desc} to="/security-verification-google" >Switch to Woynex/Google Authenticator. </Link> */}
                                    <Link className={cn([styles.pd, styles.desc])} to="/security-verification-reset" >Security verification unavailable? </Link>
                                </div>

                                <Form.Item className="mt-4">
                                    <Button htmlType="submit" type="primary" className="btn-block" size="large" loading={indicator}>
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
