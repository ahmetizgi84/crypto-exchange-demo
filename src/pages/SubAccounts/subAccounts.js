import { Tab, Row, Col } from "react-bootstrap";

import AccountsComponent from "./Accounts";
import { ProfileNavbar } from '../../components'


function SubAccounts() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="subAccounts">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="subAccounts">
                                        <AccountsComponent />
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

export default SubAccounts;
