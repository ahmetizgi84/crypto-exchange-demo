import { useContext, useEffect } from "react";
import ApiContext from "../../context/ApiContext";
import { Col, Row, Tab } from "react-bootstrap";


import { ProfileNavbar } from '../../components'

import HowTo from "./HowTo";
import MyReferral from "./MyReferral";
import DefaultReferral from "./DefaultReferral";

function Referral() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="referral">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="referral">
                                        <ReferralComponent />
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

export default Referral;


const ReferralComponent = () => {
    const { user, _getUserReferralList } = useContext(ApiContext);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            const payload = {
                tenantId: user?.tenantId,
            };
            _getUserReferralList(payload);
        }
    }, [user]);

    return (
        <Row>
            <Col md={12}>
                <HowTo />
            </Col>

            <Col md={12}>
                <Row>
                    <Col md={6}>
                        <DefaultReferral />
                    </Col>

                    <Col md={6}>
                        <MyReferral />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

