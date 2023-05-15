import { useState, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Tooltip, message } from "antd";
import { Link } from "react-router-dom";
import styles from "./Verification.module.css";
import cn from "classnames";

const ChangePhone = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState("optional");


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
                            <h2 className={cn([styles.title])}>Security Verification</h2>
                        </div>

                        <div className="my-4">
                            <span> To secure your account, please complete the following verification.</span>
                        </div>

                        <div className="mt-4">
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{ requiredMarkValue: requiredMark }}
                                onValuesChange={onRequiredTypeChange}
                                requiredMark={requiredMark}
                            >
                                <Input.Group compact className="my-4">
                                    <label className="mb-1">Google authenticator verification code</label>
                                    <Input style={{ width: "calc(100% - 95px)" }} size="large" />
                                    <Tooltip title="Verification code sent ">
                                        <Button size="large" onClick={openMessage} type="primary">
                                            Get code
                                        </Button>
                                    </Tooltip>
                                    <small className="text-muted">Enter the 6-digit code sent to 544****95</small>
                                </Input.Group>

                                <div className={cn([styles.linkContainer])}>
                                    <Link className={cn([styles.desc])} to="/security-verification-phone" >Switch to Woynex/Google Authenticator. </Link>
                                    <Link className={cn([styles.pd, styles.desc])} to="/security-verification-reset" >Security verification unavailable? </Link>
                                </div>
                                <Form.Item className="mt-4">
                                    <Button htmlType="submit" type="primary" className="btn-block" size="large">
                                        <Link to="/" >
                                            Submit
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
