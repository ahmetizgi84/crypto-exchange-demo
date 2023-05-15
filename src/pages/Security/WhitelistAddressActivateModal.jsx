import { useState } from "react";
import {
  Modal as AntModal,
  Button as AntButton,
  message,
  Tooltip,
  Col as AntCol,
  Row as AntRow,
  Input,
  Form as AntForm,
} from "antd";
import { makeToast } from "../../utils/makeToast";

function WhitelistAddressActivateModal({ show, setShow }) {
  const [form] = AntForm.useForm();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const key = "updatable";

  const openMessage = () => {
    message.loading({ content: "Sending...", key });
    setTimeout(() => {
      message.success({ content: "Successfully sent", key, duration: 2 });
    }, 3000);
  };

  const modalCloseHandler = () => {
    form.resetFields();
    setShow(false);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    console.log("form values: ", values);
    setTimeout(() => {
      setLoading(false);
      setShow(false);
      makeToast("success", "Withdrawal Whitelist addresses has been successfuly activated!");
    }, 3500);
  };

  return (
    <AntModal visible={show} title="Enable Whitelist Addresses" onCancel={modalCloseHandler} footer={false}>
      <AntForm form={form} layout="vertical" scrollToFirstError onFinish={handleSubmit}>
        <AntForm.Item
          label="E-mail verification code"
          extra="Enter the 6-digit code sent to test***@hotmail.com"
          required
        >
          <AntRow gutter={2}>
            <AntCol md={19} xs={16}>
              <AntForm.Item
                name="email"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Required field!",
                  },
                ]}
              >
                <Input size="large" name="email" value={code} onChange={(e) => setCode(e.target.value)} />
              </AntForm.Item>
            </AntCol>
            <AntCol md={5} xs={8}>
              <Tooltip title="send code to your email">
                <AntButton htmlType="button" className="btn-block" size="large" onClick={openMessage} type="primary">
                  Get code
                </AntButton>
              </Tooltip>
            </AntCol>
          </AntRow>
        </AntForm.Item>

        <AntForm.Item className="mt-4">
          <AntButton htmlType="submit" type="primary" className="btn-block" size="large" loading={loading}>
            Submit
          </AntButton>
        </AntForm.Item>
      </AntForm>
    </AntModal>
  );
}

export default WhitelistAddressActivateModal;
