import { Tab, Row, Col } from "react-bootstrap";

import NotificationSettings from "./NotificationSettings";
import { ProfileNavbar } from '../../components'

function Notifications() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="notifications">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="notifications">
                                        <NotificationSettings />
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

export default Notifications;
