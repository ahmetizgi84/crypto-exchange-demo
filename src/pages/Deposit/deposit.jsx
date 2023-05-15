import { Container, Row, Col } from "react-bootstrap";
import { Tabs as AntTabs } from "antd";

import Try from "./Try";
import Crypto from "./Crypto";

const { TabPane } = AntTabs;

const Withdraw = () => {
  return (
    <Container>
      <Row>
        <Col md={12} className="py-4">
          <h3 className="m-0 dark-text-white">Deposit</h3>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <AntTabs defaultActiveKey="try">
            <TabPane tab="TRY" key="try">
              <Try />
            </TabPane>
            <TabPane tab="Crypto" key="crypto">
              <Crypto />
            </TabPane>
          </AntTabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Withdraw;
