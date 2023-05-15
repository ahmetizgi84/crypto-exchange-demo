import { Modal as AntModal, Button as AntButton, Form, Input } from "antd";
import { AddWhitelistIpSchema } from "../../utils/formValidations";
import _ from "lodash";
import { useFormik } from "formik";

import WhitelistIpLogic from "./WhitelistIpLogic";

function WhitelistIpModal({ isIpModalOpen, setIpModal }) {
  const { user, _saveWhitelistIp } = WhitelistIpLogic();

  const [form] = Form.useForm();
  const { handleSubmit, handleChange, values, errors, touched, setValues, handleReset } = useFormik({
    enableReinitialize: true,

    initialValues: {
      label: "",
      ip: "",
    },
    onSubmit: (values) => {
      values.tenantId = user?.tenantId;
      values.createdUserId = user?.createdUserId;
      values.status = 1;
      saveWhitelistIpHandler(values);
    },
    validationSchema: AddWhitelistIpSchema,
  });

  const onCloseHandler = () => {
    form.resetFields();
    handleReset();
    setValues({ label: "", ip: "" });
    setIpModal(false);
  };

  const saveWhitelistIpHandler = async (payload) => {
    setIpModal(false);
    _saveWhitelistIp(payload);
    form.resetFields();
    setValues({ label: "", ip: "" });
    handleReset();
  };

  return (
    <AntModal
      visible={isIpModalOpen}
      title="Add Whitelist IP"
      onOk={handleSubmit}
      onCancel={onCloseHandler}
      footer={[
        <AntButton key="back" onClick={onCloseHandler}>
          Cancel
        </AntButton>,
        <AntButton key="submit" type="primary" onClick={handleSubmit}>
          Save and Close
        </AntButton>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* LABEL */}
        <Form.Item
          label="Label"
          name="label"
          help={touched.label && errors.label ? errors.label : ""}
          validateStatus={touched.label && errors.label ? "error" : "success"}
        >
          <Input
            size="large"
            type="text"
            onChange={handleChange("label")}
            value={values.label}
            placeholder="Enter IP label"
          />
        </Form.Item>
        {/* IP */}
        <Form.Item
          label="IP"
          name="ip"
          help={touched.ip && errors.ip ? errors.ip : ""}
          validateStatus={touched.ip && errors.ip ? "error" : "success"}
        >
          <Input
            size="large"
            type="text"
            id="exampleInputPassword1"
            placeholder="Enter IP address"
            value={values.ip}
            onChange={handleChange("ip")}
          />
        </Form.Item>
      </Form>
    </AntModal>
  );
}

export default WhitelistIpModal;
