import { useState, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { WoynexTable } from "../../components";
import {
  Modal as AntModal,
  Button as AntButton,
  Popconfirm,
  Form,
  Input,
  Col as AntCol,
  Row as AntRow,
  message,
  Tooltip,
} from "antd";
import { Button } from "react-bootstrap";
import { DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { AddWhitelistIpSchema } from "../../utils/formValidations";
import _ from "lodash";
import { useFormik } from "formik";
import { makeToast } from "../../utils/makeToast";

import WhitelistIpLogic from "./WhitelistIpLogic";
import WhitelistIpModal from "./WhitelistIpModal";

function WhitelistIps() {
  const { logicState, setIpModal, setIpActivated, loading, isLoggedIn, wlIps, _deleteWhitelistIP, handleTableChange } =
    WhitelistIpLogic();

  const { isIpModalOpen, isIpActivated } = logicState;

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      sorter: true,
      key: "label",
      width: "45%",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      width: "45%",
    },
    {
      title: "",
      dataIndex: "operation",
      key: "operation",
      width: "10%",
      render: (_, record) =>
        wlIps.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => _deleteWhitelistIP(record.id)}>
            <AntButton type="primary" icon={<DeleteOutlined />} size="sm" danger />
          </Popconfirm>
        ) : null,
    },
  ];

  function showToast() {
    AntModal.confirm({
      title: "You are about to activate whitelist IPs",
      icon: <ExclamationCircleOutlined />,
      //content: "Only whitelisted IP addresses will be access to your account after your confirmation",
      content: "When this function is turned on, your account will only be able to access to whitelisted IP addresses.",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => setIpActivated(true),
    });
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h5 className="card-title m-0">Whitelist IPs</h5>
              <small className="d-block">If turned on, only whitelisted IP addresses can access to your account.</small>
            </div>
            <AntButton type="primary" icon={<PlusOutlined />} onClick={() => setIpModal(true)} />
          </div>

          <div className="text-right">
            <AntButton type="primary" size="medium" onClick={showToast}>
              Activate
            </AntButton>
          </div>
        </div>

        <WoynexTable
          columns={columns}
          list={wlIps}
          size="small"
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          pageSize={8}
          loading={loading}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <WhitelistIpModal isIpModalOpen={isIpModalOpen} setIpModal={setIpModal} />
      <EnableWhitelistIpModal show={isIpActivated} setShow={setIpActivated} />
    </div>
  );
}

export default WhitelistIps;

// MODAL

function EnableWhitelistIpModal({ show, setShow }) {
  const [form] = Form.useForm();
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
      makeToast("success", "Whitelist IP addresses has been successfuly activated!");
    }, 3500);
  };

  return (
    <AntModal visible={show} title="Enable Whitelist IP Addresses" onCancel={modalCloseHandler} footer={false}>
      <Form form={form} layout="vertical" scrollToFirstError onFinish={handleSubmit}>
        <Form.Item label="E-mail verification code" extra="Enter the 6-digit code sent to test***@hotmail.com" required>
          <AntRow gutter={2}>
            <AntCol md={19} xs={16}>
              <Form.Item
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
              </Form.Item>
            </AntCol>
            <AntCol md={5} xs={8}>
              <Tooltip title="send code to your email">
                <AntButton htmlType="button" className="btn-block" size="large" onClick={openMessage} type="primary">
                  Get code
                </AntButton>
              </Tooltip>
            </AntCol>
          </AntRow>
        </Form.Item>

        <Form.Item className="mt-4">
          <AntButton htmlType="submit" type="primary" className="btn-block" size="large" loading={loading}>
            Submit
          </AntButton>
        </Form.Item>
      </Form>
    </AntModal>
  );
}
