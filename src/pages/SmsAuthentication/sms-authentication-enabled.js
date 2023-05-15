import { Container, Row, Col } from "react-bootstrap";
import { Button, Result } from "antd";
import { useHistory } from 'react-router-dom'


const SmsAuthenticationEnabled = () => {
    const history = useHistory();


    return (
        <Container>
            <Row style={{ minHeight: "540px" }}>
                <Col md={6} className="mx-auto my-auto">
                    <div className="change-email-form mt-4">
                        <Result
                            status="success"
                            title="Phone Number Verification Enabled"
                            subTitle="You have successfully enabled phone number verification to protect your account"
                            extra={[
                                <Button type="primary" key="console" onClick={() => history.push("/profile/security")}>
                                    Back to Security
                                </Button>,
                            ]}
                        />
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

export default SmsAuthenticationEnabled;
