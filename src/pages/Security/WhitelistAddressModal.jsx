import { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Row, Col } from "react-bootstrap";
import { Modal as AntModal, Button as AntButton, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { AddWhitelistAddressesSchemaOne, AddWhitelistAddressesSchemaTwo } from "../../utils/formValidations";

const { Option } = Select;

const MyOption = ({ coin }) => {
  return (
    <div className="align-items-center d-flex">
      {/* <img style={{ width: "18px", height: "18px" }} src={coin.image} alt={coin.symbol} /> */}
      <span className="ml-2">{coin.symbol}</span>
      <span className="ml-2 text-muted">{coin.coinName}</span>
    </div>
  );
};

function WhitelistAddressModal(props) {
  const [form] = Form.useForm();
  const {
    isWhitelistAddressModalOpen,
    handleWhitelistAddressModalClose,
    isUniversalAddressChecked,
    handleCheckBoxOnChange,
    optionOriginAddressType,
    setOriginAddressType,
    getTransferNetworkByAsset,
  } = props;
  const { user, _saveWhitelistAddress, coinList, coinNetwork, originAddressList } = useContext(ApiContext);

  const { handleSubmit, handleChange, values, errors, touched, handleReset } = useFormik({
    enableReinitialize: true,
    initialValues: {
      coin: "",
      label: "",
      network: "",
      address: "",
      originType: "",
      tagOrMemo: "",
    },
    onSubmit: (values) => {
      values.tenantId = user?.tenantId;
      values.createdUserId = user?.userId;
      values.status = 1;
      saveWhitelistHandler(values);
    },
    validationSchema: isUniversalAddressChecked ? AddWhitelistAddressesSchemaTwo : AddWhitelistAddressesSchemaOne,
  });

  const saveWhitelistHandler = async (payload) => {
    const response = await _saveWhitelistAddress(payload);
    if (response) {
      whitelistAddressModalHandler();
      handleReset();
    }
  };

  const whitelistAddressModalHandler = () => {
    form.resetFields();
    handleReset();
    handleWhitelistAddressModalClose();
  };

  const checkboxChangeHandler = () => {
    handleCheckBoxOnChange();
    handleReset();
  };

  console.log(values);
  return (
    <AntModal
      visible={isWhitelistAddressModalOpen}
      title="Add Withdrawal Address"
      onOk={handleSubmit}
      onCancel={whitelistAddressModalHandler}
      footer={[
        <AntButton key="back" onClick={whitelistAddressModalHandler}>
          Cancel
        </AntButton>,
        <AntButton key="submit" type="primary" onClick={handleSubmit}>
          Save and Close
        </AntButton>,
      ]}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Address label"
          name="label"
          help={touched.label && errors.label ? errors.label : ""}
          validateStatus={touched.label && errors.label ? "error" : "success"}
        >
          <Input
            size="large"
            type="text"
            onChange={handleChange("label")}
            value={values.label}
            placeholder="Enter Address Label"
          />
        </Form.Item>

        <Form.Item
          label="Coin"
          name="coin"
          help={touched.coin && errors.coin ? errors.coin : ""}
          validateStatus={touched.coin && errors.coin ? "error" : "success"}
        >
          <Select
            className="btn-block"
            placeholder="Select Coin"
            optionFilterProp="children"
            onChange={(e) => {
              handleChange("coin")(e);
              getTransferNetworkByAsset(e);
            }}
            size="large"
            disabled={isUniversalAddressChecked && true}
          >
            {coinList?.map((coin) => (
              <Option key={coin.id} value={coin.symbol}>
                <MyOption coin={coin} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              style={{ height: "13px" }}
              checked={isUniversalAddressChecked}
              onChange={checkboxChangeHandler}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Set as a universal address
            </label>
          </div>
        </div>

        <Form.Item
          label="Address"
          name="address"
          help={touched.address && errors.address ? errors.address : ""}
          validateStatus={touched.address && errors.address ? "error" : "success"}
        >
          <Input
            size="large"
            type="text"
            onChange={handleChange("address")}
            value={values.address}
            placeholder="Enter Address"
          />
        </Form.Item>

        <Form.Item
          label="Network"
          name="network"
          help={touched.network && errors.network ? errors.network : ""}
          validateStatus={touched.network && errors.network ? "error" : "success"}
        >
          <Select
            className="btn-block"
            placeholder="Select Network"
            optionFilterProp="children"
            onChange={handleChange("network")}
            size="large"
          >
            {coinNetwork?.map((network, idx) => (
              <Option key={idx} value={network.networkCode}>
                {network.networkCode} {network.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row className="mb-3">
          <Col md={6}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="typeOptions"
                id="inlineRadio1"
                value="ADDRESS_ORIGIN_EXCHANGE_OPTION"
                onChange={setOriginAddressType}
                defaultChecked={optionOriginAddressType === "ADDRESS_ORIGIN_EXCHANGE_OPTION"}
              />
              Exchange Address
            </div>
          </Col>
          <Col md={6}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio2"
                name="typeOptions"
                onChange={setOriginAddressType}
                defaultChecked={optionOriginAddressType === "ADDRESS_ORIGIN_WALLET_OPTION"}
                value="ADDRESS_ORIGIN_WALLET_OPTION"
              />
              Wallet Address
            </div>
          </Col>
        </Row>

        <Form.Item
          label="Address Origin"
          name="originType"
          help={touched.originType && errors.originType ? errors.originType : ""}
          validateStatus={touched.originType && errors.originType ? "error" : "success"}
        >
          <Select
            className="btn-block"
            placeholder="Select Exchange"
            optionFilterProp="children"
            onChange={handleChange("originType")}
            size="large"
          >
            {originAddressList?.map((originAddress) => (
              <Option key={originAddress.name} value={originAddress.name}>
                {originAddress.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </AntModal>
  );
}

export default WhitelistAddressModal;
