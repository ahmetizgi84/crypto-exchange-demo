import { useState, useContext, useEffect, createRef } from "react";
import { Button as AntButton, Popconfirm, Modal as AntModal, Form, Input, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ApiContext from "../../context/ApiContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import { BankAccountSchema } from "../../utils/formValidations";
import DocumentInput from "./DocumentInput";
import _ from "lodash";
import { WoynexTable } from "../../components";

const { Option } = Select;

function AddBankAccount() {
  const [accountData, setAccountData] = useState({});
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);
  const { bankAccounts, _getBankAccountList, user, loading, setBankAccounts, _deleteBankAccount } =
    useContext(ApiContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  useEffect(() => {
    if (user) {
      _getBankAccountList({});
    }
  }, [user]);

  const columns = [
    {
      title: "Account Owner Name",
      dataIndex: "ownerName",
      sorter: true,
      key: "ownerName",
    },
    {
      title: "Label",
      dataIndex: "name",
      sorter: true,
      key: "name",
    },
    {
      title: "Bank",
      dataIndex: "bankName",
      key: "bankName",
      sorter: true,
    },
    {
      title: "IBAN",
      dataIndex: "iban",
      key: "iban",
    },
    {
      title: "",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) =>
        bankAccounts.length >= 1 ? (
          <span>
            <span
              onClick={() => {
                handleShow();
                setAccountData(record);
              }}
              style={{
                marginRight: 8,
              }}
            >
              <AntButton type="primary" icon={<EditOutlined />} size="sm" />
            </span>
            <Popconfirm title="Sure to delete?" onConfirm={() => _deleteBankAccount(record.id)}>
              <AntButton type="primary" icon={<DeleteOutlined />} size="sm" danger />
            </Popconfirm>
          </span>
        ) : null,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(bankAccounts, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setBankAccounts(orderedList);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <h5 className="card-title m-0 mr-3">Bank Accounts</h5>
          <AntButton type="primary" icon={<PlusOutlined color="white" />} onClick={handleShow} />
        </div>
        <WoynexTable
          columns={columns}
          list={bankAccounts}
          size="small"
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          pageSize={8}
          loading={loading}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <AddNewAccountModal
        show={show}
        handleClose={handleClose}
        accountData={accountData}
        setAccountData={setAccountData}
      />
    </div>
  );
}

export default AddBankAccount;

function AddNewAccountModal({ show, handleClose, accountData, setAccountData }) {
  const {
    _addNewBankAccount,
    _getCurrencyCodes,
    currencyCodes,
    _getCoreParameters,
    originAddressList,
    _updateBankAccount,
    user
  } = useContext(ApiContext);
  const formRef = createRef();
 
  /**
   * @TODO
   * https://dev-exchangeapi.woynex.com/BankAccount/Update linkine id  ekleyip, güncellemek istediğim datayı
   * gönderdiğimde "Object reference not set to an instance of an object." hatası alınıyor.
   * Bu yüzden payload' ın içerisi default değerler eklenmiş olarak gidiyor şimdilik bu şekilde.
   *
   */

  const { handleSubmit, handleChange, values, errors, touched, setErrors, setValues } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      ownerName: "",
      iban: "",
      bankName: "",
      currencyType: "TRY",
    },
    onSubmit: async (values, { resetForm }) => {
      
    if(Object.keys(accountData).length > 0 ) {
      const response = await _updateBankAccount({id:accountData.id, ...values, 
        tenantId: user.tenantId, 
        userId:user.userId,
        countryId: 0 ,
        bankBic: "",
        isSystemAccount:0,
        orderIndex: 0,
        createdUserId:0,
        createdDate: "2021-12-21T08:58:10.944Z",
        updatedUserId: 0,
        updatedDate: "2021-12-21T08:58:10.944Z",
        status: 0
      });
        if (response) {
                handleClose();
                resetForm();
                setAccountData({});
        }  
    } else {
        const response = await _addNewBankAccount(values);
          if (response) {
                handleClose();
                resetForm();
                
          }
      } 
    },

    validationSchema: BankAccountSchema,
  });

  useEffect(() => {
    const payload = {
      keyCode: "BANK_OPTION",
      status: 1,
    };

    _getCoreParameters(payload);
    _getCurrencyCodes();
  }, []);

  const onCloseHandler = () => {
    formRef.current.resetFields();
    handleClose();
    setErrors({});
    setAccountData({});
  };

  useEffect(() => {
    if (Object.keys(accountData).length > 0) {
      onFill();
    }
  }, [accountData]);
  
  const onFill = () => {
    formRef?.current?.setFieldsValue({
      name: accountData?.name,
      ownerName: accountData?.ownerName,
      iban: accountData?.iban,
      bankName: accountData?.bankName,
      currencyType: accountData?.currencyType,
    });
    setValues({
      name: accountData?.name,
      ownerName: accountData?.ownerName,
      iban: accountData?.iban,
      bankName: accountData?.bankName,
      currencyType: accountData?.currencyType,
    });
  };

  return (
    <AntModal
      visible={show}
      title={Object.keys(accountData).length > 0 ? "Update Current Bank Account" : "Save New Bank Account"}
      maskClosable={false}
      onOk={handleSubmit}
      onCancel={onCloseHandler}
      footer={[
        <AntButton key="back" onClick={onCloseHandler}>
          Cancel
        </AntButton>,
        <AntButton key="submit" htmlType="submit" type="primary" onClick={handleSubmit}>
        {Object.keys(accountData).length > 0 ? "Update" : "Save"}
      </AntButton>
      ]}
    >
      <Form layout="vertical" onFinish={handleSubmit} ref={formRef} initialValues={{ currencyType: "TRY" }}>
        {/* LABEL */}
        <Form.Item
          label="Label"
          name="name"
          help={touched.name && errors.name ? errors.name : ""}
          validateStatus={touched.name && errors.name ? "error" : "success"}
        >
          <Input size="large" type="text" onChange={handleChange("name")} value={values.name} />
        </Form.Item>

        {/* Account Owner Name */}
        <Form.Item
          label="Account Owner Name"
          name="ownerName"
          help={touched.ownerName && errors.ownerName ? errors.ownerName : ""}
          validateStatus={touched.ownerName && errors.ownerName ? "error" : "success"}
        >
          <Input size="large" type="text" onChange={handleChange("ownerName")} value={values.ownerName} />
        </Form.Item>

        {/* Bank Name Select */}
        <Form.Item
          label="Bank Name"
          name="bankName"
          help={touched.bankName && errors.bankName ? errors.bankName : ""}
          validateStatus={touched.bankName && errors.bankName ? "error" : "success"}
        >
          <Select onChange={handleChange("bankName")} size="large">
            {originAddressList.map((bank, idx) => (
              <Option key={idx} value={bank.name}>
                {bank.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* IBAN No formatted */}
        <div className="mb-4">
          <Form.Item
            label="IBAN"
            name="iban"
            help={touched.iban && errors.iban ? errors.iban : ""}
            validateStatus={touched.iban && errors.iban ? "error" : "success"}
            className="mb-0"
          >
            <DocumentInput
              type="text"
              placeholder="TR"
              value={values.iban}
              onChange={handleChange("iban")}
              className="ant-input ant-input-lg"
              pattern="^DE\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|DE\d{20}TR"
            />
          </Form.Item>
          <small className="text-muted">IBAN must not exceed 26 characters</small>
        </div>

        {/* Currency */}
        <Form.Item
          label="Currency"
          name="currencyType"
          help={touched.currencyType && errors.currencyType ? errors.currencyType : ""}
          validateStatus={touched.currencyType && errors.currencyType ? "error" : "success"}
        >
          <Select onChange={handleChange("currencyType")} size="large">
            {currencyCodes.map((currency, idx) => (
              <Option key={idx} value={currency.symbol}>
                {currency.symbol}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </AntModal>
  );
}
