import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Steps, Row as AntRow, Col as AntCol, Form, Input, Tooltip, message, Result } from "antd";
import { useHistory } from 'react-router-dom'
import constants from "../../common/constants";
import QRCode from "react-qr-code";



const { Step } = Steps

const GoogleAuthenticator = () => {
    const [current, setCurrent] = useState(0)




    const onChange = current => {
        setCurrent(current)
    };

    const renderSteps = () => {
        switch (current) {
            case 0:
                return <FirstStep onChange={onChange} />
            case 1:
                return <SecondStep onChange={onChange} />
            case 2:
                return <ThirdStep onChange={onChange} />
            case 3:
                return <ForthStep />
            default:
                break;
        }
    }


    return (
        <Container>
            <Row>
                <Col md={12} className="mx-auto my-auto">
                    <div className="change-email-form mt-4">
                        <div className="text-center">
                            <h2 className="dark-text-white">Enable Google Authenticator</h2>
                        </div>


                        <Row className="justify-content-center">
                            <Col md={12} className="mt-4">
                                <Steps current={current}>
                                    <Step title="Step 1" description="Download App" />
                                    <Step title="Step 2" description="Scan QR Code" />
                                    <Step title="Step 3" description="Enable Google Authenticator" />
                                    <Step title="Step 4" description="Complete" />
                                </Steps>
                            </Col>



                            {renderSteps()}


                        </Row>
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

export default GoogleAuthenticator;



function FirstStep({ onChange }) {
    return (
        <Col md={4} className="text-center mt-5">
            <h4 className="dark-text-white">Download and install the Authenticator app</h4>

            <div className="d-flex justify-content-between align-items-center my-4">
                <a className="w-50 py-5 google-auth-store-link" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=tr&gl=US" target="_blank" rel="noopener noreferrer">
                    <img src={constants.playStore} alt="google-play-store" style={{ width: 36, height: 36, marginBottom: 16 }} />
                    <div className="text-muted">Download from</div>
                    <div className="text-muted">Google Play</div>
                </a>

                <a className="w-50 py-5 google-auth-store-link" href="https://apps.apple.com/tr/app/google-authenticator/id388497605" target="_blank" rel="noopener noreferrer">
                    <img src={constants.appStore} alt="app-store" style={{ width: 36, height: 36, marginBottom: 16 }} />
                    <div className="text-muted">Download from</div>
                    <div className="text-muted">App store</div>
                </a>

            </div>

            <Button type="primary" className="btn-block" size="large" onClick={() => onChange(1)}>
                Next
            </Button>
        </Col>
    )
}



function SecondStep({ onChange }) {
    return (
        <Col md={4} className="text-center mt-5">
            <h4 className="dark-text-white">Scan this QR code in the Authenticator app</h4>

            <div className="my-4 text-center justify-content-center align-items-center d-flex">
                <QRCode value="Woynex Test Code" size={120} />
            </div>

            <h5 className="dark-text-white">UO7HIOLRQWDBIRPO</h5>

            <p className="text-muted">If you are unable to scan the QR code, please enter this code manually into the app.</p>

            <AntRow gutter={12} className="mt-4">
                <AntCol md={12} xs={12}>
                    <Button type="secondary" size="large" onClick={() => onChange(0)} block>
                        Previous
                    </Button>
                </AntCol>
                <AntCol md={12} xs={12}>
                    <Button type="primary" size="large" onClick={() => onChange(2)} block>
                        Next
                    </Button>
                </AntCol>
            </AntRow>
        </Col>
    )
}




function ThirdStep({ onChange }) {
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
            onChange(3)
        }, 3000);
    }

    return (
        <Col md={6} className="mt-5">

            <div className="text-center">
                <h4 className="dark-text-white">Enable Authenticator by verifying your account</h4>
            </div>

            <div className="mt-4">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <Form.Item label="Phone verification code" extra="Enter the 6 digit code sent to 544***9999." required>
                        <AntRow gutter={2}>
                            <AntCol md={19} xs={16}>
                                <Form.Item
                                    name="phone"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Required field!',
                                        },
                                    ]}
                                >
                                    <Input size="large" name="phone" />
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



                    <Form.Item label="E-mail verification code" extra="Enter the 6-digit code sent to test***@hotmail.com" required>
                        <AntRow gutter={2}>
                            <AntCol md={19} xs={16}>
                                <Form.Item
                                    name="email"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Required field!',
                                        },
                                    ]}
                                >
                                    <Input size="large" name="email" />
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


                    <Form.Item
                        name="authenticator"
                        label="Authenticator Code"
                        extra="Enter the 6-digit code from Google Authenticator"
                        rules={[
                            {
                                required: true,
                                message: 'Required field!',
                            },
                        ]}
                    >
                        <Input size="large" name="authenticator" />
                    </Form.Item>

                    <Form.Item className="mt-4">
                        <AntRow gutter={12} className="mt-4">
                            <AntCol md={12} xs={12}>
                                <Button type="secondary" size="large" onClick={() => onChange(1)} block>
                                    Previous
                                </Button>
                            </AntCol>
                            <AntCol md={12} xs={12}>
                                <Button htmlType="submit" type="primary" className="btn-block" size="large" loading={loading}>
                                    Submit
                                </Button>
                            </AntCol>
                        </AntRow>
                    </Form.Item>

                </Form>
            </div>
        </Col>
    )
}


function ForthStep() {
    const history = useHistory();
    return (
        <Col md={4} className="text-center mt-5">
            <Result
                status="success"
                title="Authenticator Enabled"
                subTitle="You have successfully enabled Authenticator to protect your account"
                extra={[
                    <Button type="primary" key="console" onClick={() => history.push("/profile/security")}>
                        Back to Security
                    </Button>,
                ]}
            />
        </Col>
    )
}

