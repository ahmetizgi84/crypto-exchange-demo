import { Tab, Row, Col } from "react-bootstrap";

import Trade_History from "./Trade_History";
import { ProfileNavbar } from '../../components'

function TradeHistory() {

    return (
        <>
            <div className="settings mtb15">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="tradeHistory">
                        <Row>
                            <Col lg={2}>
                                <ProfileNavbar />
                            </Col>

                            <Col lg={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tradeHistory">
                                        <Trade_History />
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

export default TradeHistory;
