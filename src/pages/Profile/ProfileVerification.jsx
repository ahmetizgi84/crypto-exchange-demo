import { useContext, useEffect, useState } from "react";
import ApiContext from "../../context/ApiContext";
import { Link } from "react-router-dom";
import { CheckLg, Hourglass, X, DashCircle } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import styles from "./Profile.module.css";
import { Button as AntButton, Modal as AntModal } from "antd";

function ProfileVerification() {
  const { user, tierList } = useContext(ApiContext);
  const [newTierList, setNewTierList] = useState([]);

  /**
   * when user data comes, check the tierLevel of user
   * if its null then set tierLevel to 1.
   * This is important in order to manipulate permissions bar
   * in the profile page.
   * This should be refactored soon! 'Cause the implementation of the solution
   * is not approppriate!
   */
  useEffect(() => {
    if (tierList.length) {
      const tierLevel = user?.tierLevel || 1;
      const tierLevelStatus = user?.tierLevelStatus || 0;
      const tierClass =
        tierLevelStatus === 1 ? "confirmed" : tierLevelStatus === 0 ? "pending" : tierLevelStatus === -1 && "rejected";
      if (tierLevel && tierLevel === 1) {
        tierList[0].tierLevel = tierLevel;
        tierList[0].tierClass = tierClass;
        tierList[0].tierLevelDesc = "Withdrawal allowed";
        tierList[0].link = "/email-verify";
        tierList[1].tierLevel = 2;
        tierList[1].tierClass = tierClass === "confirmed" ? "active" : "muted";
        tierList[1].tierLevelDesc = "To allow Deposits and Trades";
        tierList[1].link = "/id-verify";
        tierList[2].tierLevel = 3;
        tierList[2].tierClass = "muted";
        tierList[2].tierLevelDesc = "Increase Withdrawal limit to 10 BTC";
        tierList[2].link = "/address-verify";
      } else if (tierLevel === 2) {
        tierList[0].tierLevel = 1;
        tierList[0].tierClass = "confirmed";
        tierList[0].tierLevelDesc = "Withdrawal allowed";
        tierList[0].link = "/email-verify";
        tierList[1].tierLevel = tierLevel;
        tierList[1].tierClass = tierClass;
        tierList[1].tierLevelDesc = "To allow Deposits and Trades";
        tierList[1].link = "/id-verify";
        tierList[2].tierLevel = 3;
        tierList[2].tierClass = tierClass === "confirmed" ? "active" : "muted";
        tierList[2].tierLevelDesc = "Increase Withdrawal limit to 10 BTC";
        tierList[2].link = "/address-verify";
      } else if (tierLevel === 3) {
        tierList[0].tierLevel = 1;
        tierList[0].tierClass = "confirmed";
        tierList[0].tierLevelDesc = "Withdrawal allowed";
        tierList[0].link = "/email-verify";
        tierList[1].tierLevel = 2;
        tierList[1].tierClass = "confirmed";
        tierList[1].tierLevelDesc = "To allow Deposits and Trades";
        tierList[1].link = "/id-verify";
        tierList[2].tierLevel = 3;
        tierList[2].tierClass = tierClass;
        tierList[2].tierLevelDesc = "Increase Withdrawal limit to 10 BTC";
        tierList[2].link = "/address-verify";
      }

      setNewTierList([...tierList]);
    }
  }, [tierList, user]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-2">Profile Verification</h5>

        <ProgressBar newTierList={newTierList} />

        {newTierList?.map((tier) => {
          return (
            <div key={tier.code} className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="card-title mb-0">{tier.name}</h5>
                <small className="text-muted fs-3">{tier.tierLevelDesc}</small>
              </div>

              <div className="d-flex">
                {tier.tierClass === "confirmed" ? (
                  <>
                    <div style={{ color: "#54B489" }}>Verified</div>
                    <CheckLg color="#54B489" size={20} className="ml-2" />
                  </>
                ) : tier.tierClass === "active" ? (
                  <Link to={tier.link}>
                    <AntButton type="primary"  size="medium">VERIFY</AntButton>
                  </Link>
                ) : tier.tierClass === "muted" ? (
                  <AntButton type="primary"  size="medium" disabled>
                    VERIFY
                  </AntButton>
                ) : tier.tierClass === "pending" ? (
                  <>
                    <div style={{ color: "#E8AF59" }}>Pending</div>
                    <Hourglass color="#E8AF59" size={20} className="ml-2" />
                  </>
                ) : tier.tierClass === "rejected" ? (
                  <>
                    <div style={{ color: "#E85E59" }}>Reverify</div>
                    <X color="#E85E59" size={20} className="ml-2" />
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileVerification;

function ProgressBar({ newTierList }) {
  return (
    <Row className="mb-4">
      <Col md={8}>
        <Row className="px-3">
          {newTierList?.map((tier) => {
            return (
              <Col key={tier.code} md={3} xs={4} className="pr-1 pl-0">
                <div className={styles[tier.tierClass]}>
                  <span>Level {tier.tierLevel}</span>
                  {tier.tierClass === "confirmed" ? (
                    <CheckLg color="white" size={16} className="ml-1" />
                  ) : tier.tierClass === "pending" ? (
                    <Hourglass color="white" size={16} className="ml-1" />
                  ) : tier.tierClass === "muted" ? (
                    <DashCircle color="rgba(255, 255, 255, 0.4)" size={16} className="ml-1" />
                  ) : tier.tierClass === "rejected" ? (
                    <X color="white" size={16} className="ml-1" />
                  ) : null}
                </div>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
