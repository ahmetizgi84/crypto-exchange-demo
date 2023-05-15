import { Tab, Row, Col } from "react-bootstrap";

import NewUserComponent from "./NewUser";
import { ProfileNavbar } from '../../components'


function AddNewUser() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="newUser">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="newUser">
                                        <NewUserComponent />
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

export default AddNewUser;
