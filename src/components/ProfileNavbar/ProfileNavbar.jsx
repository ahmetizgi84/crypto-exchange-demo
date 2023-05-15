import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ApiContext from "../../context/ApiContext";

const ProfileNavbar = () => {
  const { user } = useContext(ApiContext);

  return (
    <Nav variant="pills" className="settings-nav">
      <Nav.Item>
        <Nav.Link as={Link} eventKey="profile" to="/profile/dashboard">
          Dashboard
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} eventKey="wallet" to="/profile/wallet">
          Wallet
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} eventKey="bankAccounts" to="/profile/bank-accounts">
          Bank Accounts
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} eventKey="tradeHistory" to="/profile/trade-history">
          Trade History
        </Nav.Link>
      </Nav.Item>

      {
        // Corporate
        user?.roleId === 4 && (
          <>
            <Nav.Item>
              <Nav.Link as={Link} eventKey="companyInfo" to="/profile/company-info">
                Company Info
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} eventKey="subAccounts" to="/profile/sub-accounts">
                Accounts
              </Nav.Link>
            </Nav.Item>
          </>
        )
      }
      <Nav.Item>
        <Nav.Link as={Link} eventKey="notifications" to="/profile/notifications">
          Notifications
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} eventKey="securitySettings" to="/profile/security">
          Security
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} eventKey="referral" to="/profile/referral">
          Referral
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ProfileNavbar;
