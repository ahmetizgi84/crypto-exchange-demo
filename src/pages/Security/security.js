import { Tab, Row, Col } from "react-bootstrap";

import { ProfileNavbar } from '../../components'

import GeneralSecurity from './GeneralSecurity'
import WhitelistAddresses from './WhitelistAddresses';
import WhitelistIps from './WhitelistIps';

function Security() {

  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="securitySettings">
            <Row>
              <Col lg={2}>
                <ProfileNavbar />
              </Col>

              <Col lg={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="securitySettings">
                    <GeneralSecurity />
                    <WhitelistIps />
                    <WhitelistAddresses />
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

export default Security;





















