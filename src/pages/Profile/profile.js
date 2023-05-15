import { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Tab, Row, Col } from "react-bootstrap";
import { ProfileNavbar } from '../../components'


import IndividualGeneralInfo from './IndividualGeneralInfo'
import AuthorizedPersonInfo from './AuthorizedPersonInfo'
import ResetPassword from "./ResetPassword";
import KycInfo from "./KycInfo";
import ProfileVerification from './ProfileVerification'
import BalanceDetails from "./BalanceDetails";
import LoginActivity from "./LoginActivity";
import OpenOrders from "./OpenOrders";



function Profile() {

  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="profile">
            <Row>
              <Col lg={2}>
                <ProfileNavbar />
              </Col>

              <Col lg={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <ProfileComponent />
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

export default Profile;


function ProfileComponent() {
  const { user } = useContext(ApiContext);

  return (
    <>
      {user?.roleId === 3 ? <IndividualGeneralInfo /> : user?.roleId === 4 && <AuthorizedPersonInfo />}

      <Row>
        <Col md={6}>
          <BalanceDetails />
        </Col>

        <Col md={6}>
          <ProfileVerification />
        </Col>
      </Row>


      <Row>
        <Col md={6}>
          <ResetPassword />
        </Col>

        <Col md={6}>
          <KycInfo />
        </Col>
      </Row>
      <OpenOrders />

      <LoginActivity />
    </>
  );
}