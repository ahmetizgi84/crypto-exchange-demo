import { Tab, Row, Col } from "react-bootstrap";

import Info from "./Info";
import { ProfileNavbar } from '../../components'


function CompanyInfo() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="companyInfo">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="companyInfo">
                                        <Info />
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

export default CompanyInfo;
