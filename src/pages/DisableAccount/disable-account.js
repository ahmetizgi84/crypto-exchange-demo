import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Tooltip, message, Col as AntCol, Row as AntRow } from "antd";



const DisableAccount = () => {
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
        }, 3000);
    }

    return (

        <Container>
            <Row>
                <Col md={6} className="mx-auto my-auto">
                    <div className="change-email-form mt-4">
                        <div className="text-center">
                            <h2 className="dark-text-white" >Account Activity</h2>
                        </div>

                        <div className="mt-4">



                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >


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


                                <Form.Item label="Phone Verification Code" extra="Please enter code that you have received on your phone">
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




                                <Form.Item label="Google Authentication Code" extra="Please enter google authentication code">
                                    <Form.Item
                                        name="googleAuthCode"
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Required field!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" name="googleAuthCode" />
                                    </Form.Item>
                                </Form.Item>




                                <Form.Item className="mt-4">
                                    <Button htmlType="submit" type="primary" className="btn-block" size="large" loading={loading} danger>
                                        Disable Your Account
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
        // <Col md={6} className="mt-5">

        //     <div className="text-center">
        //         <h2>Enable Authenticator by verifying your account</h2>
        //     </div>

        //     <div className="mt-4">
        //         <Form
        //             form={form}
        //             layout="vertical"
        //             onFinish={onFinish}
        //         >

        //             <Form.Item
        //                 label="Phone verification code"
        //                 name="phone"
        //                 extra="Enter the 6 digit code sent to 544***9999."
        //                 required
        //                 rules={[{ required: true, message: "Required field" }]}
        //             >
        //                 <PhoneInput
        //                     inputStyle={{ width: '100%', height: 40 }}
        //                     country={'tr'}
        //                     specialLabel=""
        //                     //value={phone}
        //                     //placeholder="Cell Phone*"
        //                     disableDropdown={false}
        //                     inputClass="ant-input ant-input-lg"
        //                 //onChange={phone => setPhoneHandler(phone)}
        //                 />
        //             </Form.Item>


        //             <Form.Item label="E-mail verification code" extra="Enter the 6-digit code sent to test***@hotmail.com" required>
        //                 <AntRow gutter={2}>
        //                     <AntCol md={19} xs={16}>
        //                         <Form.Item
        //                             name="email"
        //                             noStyle
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Required field!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input size="large" name="email" />
        //                         </Form.Item>
        //                     </AntCol>
        //                     <AntCol md={5} xs={8}>
        //                         <Tooltip title="send code to your email">
        //                             <Button className="btn-block" size="large" onClick={openMessage} type="primary">
        //                                 Get code
        //                             </Button>
        //                         </Tooltip>
        //                     </AntCol>
        //                 </AntRow>
        //             </Form.Item>


        //             <Form.Item
        //                 name="authenticator"
        //                 label="Authenticator Code"
        //                 extra="Enter the 6-digit code from Google Authenticator"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Required field!',
        //                     },
        //                 ]}
        //             >
        //                 <Input size="large" name="authenticator" />
        //             </Form.Item>



        //         </Form>
        //     </div>
        // </Col>
    )
};

export default DisableAccount;
