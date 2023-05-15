import { Tab, Row, Col } from "react-bootstrap";

import { ProfileNavbar } from '../../components'

import AddBankAccount from "./AddBankAccount";
import WithdrawAndDepositHistory from './WithdrawalAndDepositHistory'

function BankAccounts() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="bankAccounts">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="bankAccounts">
                                        <BankAccountsComponent />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </>
    );
}

export default BankAccounts;



const BankAccountsComponent = () => {
    return (
        <Row>
            <Col md={12}>
                <AddBankAccount />
            </Col>

            <Col md={12}>
                <WithdrawAndDepositHistory />
            </Col>
        </Row>
    );
};