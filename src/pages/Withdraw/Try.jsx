import { createRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Alert, Button as AntButton, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { Card } from "../../components";
//import { useFormik } from "formik";
//import * as yup from "yup";

import WithdrawLogic from "./withdrawLogic";

const { Option } = Select;

function Try() {
  const formRef = createRef();
  const { bankAccounts, state, setWithdrawalAmount } = WithdrawLogic();
  const { withdrawalAmount } = state;

  return (
    <div className="pl-3 mt-3">
      <Row>
        <Col md={12}>
          <h5 className="dark-text-white">Bank Transfer</h5>
        </Col>
        <Col md={8} xs={12}>
          <Card>
            <Row className="mb-3">
              <Col md={6}>
                <h6 className="dark-text-white">Remainig Withdrawal Limit</h6>
              </Col>
              <Col md={6} className="text-right ">
                <h6 className="dark-text-white">Daily: 1.000,000 TRY</h6>
                <h6 className="dark-text-white">Montly: 5.000,000 TRY</h6>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <span className="dark-text-white">You are about to withdraw to:</span>
                <h6 className="dark-text-white">John Doe</h6>
              </Col>
            </Row>

            <Form layout="vertical" /*onFinish={handleSubmit}*/ ref={formRef}>
              <Row className="mb-3">
                <Col md={12} className="text-right">
                  <Link to="/profile/bank-accounts">
                    <AntButton type="link " >Add new address</AntButton>
                  </Link>
                </Col>

                <Col md={12}>
                  <Form.Item
                    label={<label className="dark-text-white" >IBAN</label>}
                    name="iban"
                    
                    //help={touched.iban && errors.iban ? errors.iban : ""}
                    //validateStatus={touched.iban && errors.iban ? "error" : "success"}
                  >
                    <Select
                      //showSearch
                      size="large"
                      //style={{ width: 200 }}
                      placeholder="TR"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                    >
                      {bankAccounts &&
                        bankAccounts.length > 0 &&
                        bankAccounts?.map((account) => (
                          <Option key={account.id} value={account.id}>
                            {account.bankName} - {account.iban}
                          </Option>
                        ))}
                    </Select>

                    {/* <DocumentInput
                      type="text"
                      placeholder="TR"
                      //value={values.iban}
                      //onChange={handleChange("iban")}
                      className="ant-input ant-input-lg"
                      pattern="^DE\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|DE\d{20}TR"
                    /> */}
                  </Form.Item>

                  <Form.Item
                    label={<label className="dark-text-white" >Amount</label>}
                    name="ownerName"
                    
                    //help={touched.ownerName && errors.ownerName ? errors.ownerName : ""}
                    //validateStatus={touched.ownerName && errors.ownerName ? "error" : "success"}
                  >
                    <Input
                    
                      suffix={<Suffix setWithdrawalAmount={setWithdrawalAmount} />}
                      size="large"
                      type="number"
                      //value={withdrawalAmount}
                      //onChange={handleChange("ownerName")}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <span className="text-muted">Transaction fee: </span>
                </Col>
                <Col md={9}>
                  <span className="dark-text-white">
                    <b>0.00 TRY</b>
                  </span>
                </Col>
              </Row>

              <Row className="mb-5">
                <Col md={3}>
                  <span className="text-muted">You will get: </span>
                </Col>
                <Col md={9}>
                  <span className="dark-text-white">
                    <b>{withdrawalAmount} TRY</b>
                  </span>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <AntButton htmlType="submit" className="btn-block" type="primary">
                    SUBMIT
                  </AntButton>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        <Col md={4}>
          <Alert description={<AlertContent />} type="warning" showIcon closable />
        </Col>
      </Row>
    </div>
  );
}

export default Try;

function AlertContent() {
  return (
    <div>
      <h5>Please note before you withdraw</h5>
      <p>1. You can only withdraw to bank accounts registered in your name.</p>
      <p>2. You can withdraw Turkish Lira to Ziraat Bank, Akbank, VakıfBank and Fibabanka 24/7.</p>
      <p>
        3. You can withdraw to any bank during bank working hours. EFT transactions made between 9.00 - 16.45 on
        weekdays are completed on the same day, and withdrawals made on weekends and holidays are completed on the first
        business day following.
      </p>
    </div>
  );
}

function Suffix({ setWithdrawalAmount }) {
  return (
    <div className="dark-text-white" style={{ cursor: "pointer" }} onClick={() => setWithdrawalAmount(1.234)}>
      <small >Available: </small>
      <span style={{ fontWeight: "700" }}>1.234 TRY</span>
    </div>
  );
}
