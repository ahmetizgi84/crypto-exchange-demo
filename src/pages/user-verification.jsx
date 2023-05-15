import { useEffect, useContext } from "react";
import ApiContext from "../context/ApiContext";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

const UserVerification = () => {
  const { theme } = useContext(ThemeContext);
  const { _verifyUser, status } = useContext(ApiContext);

  useEffect(() => {
    const token = window.location.href.split("/").slice(-1)[0];
    //console.log("token: ", token);
    const payload = {
      verificationKey: token,
    };

    _verifyUser(payload);
  });

  if (!status) {
    return (
      <Container>
        <Row className="justify-content-md-center align-items-center mb-4 text-center">
          <Col md={6}>
            <div className="form-access mt-3">
              <form>
                <div className="text-center mt-4">
                  <img
                    src={theme === "light" ? "../img/logo-dark.svg" : "../img/logo-light.svg"}
                    style={{ width: "176px", height: "66px" }}
                    alt="logo"
                  />
                  <p className="h5 my-4">Error!</p>
                </div>

                <Row className="justify-content-md-center align-items-center mb-4 text-center">
                  <Col md={12}>
                    <XCircleFill color="red" size={76} />
                  </Col>
                </Row>

                <Row className="justify-content-md-center align-items-center mb-4 text-center">
                  <Col md={6}>
                    <p className="text-danger">An error has been occured while activating account!</p>
                  </Col>
                </Row>

                <Row className="justify-content-md-center align-items-center mb-4">
                  <Col md={6}>
                    <NavLink to="/login" style={{ textDecoration: "none", color: "white" }}>
                      <Button type="button">Go to Login Page</Button>
                    </NavLink>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center align-items-center mb-4 text-center">
        <Col md={6}>
          <div className="form-access mt-3">
            <form>
              <div className="text-center mt-4">
                <img
                  src={theme === "light" ? "../img/logo-dark.svg" : "../img/logo-light.svg"}
                  style={{ width: "176px", height: "66px" }}
                  alt="logo"
                />
                <p className="h5 my-4">Success!</p>
              </div>

              <Row className="justify-content-md-center align-items-center mb-4 text-center">
                <Col md={12}>
                  <CheckCircleFill color="green" size={76} />
                </Col>
              </Row>

              <Row className="justify-content-md-center align-items-center mb-4 text-center">
                <Col md={6}>
                  <p className="text-success">Membership activation has been successfully completed.</p>
                </Col>
              </Row>

              <Row className="justify-content-md-center align-items-center mb-4">
                <Col md={6}>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "white" }}>
                    <Button type="button">Go to Login Page</Button>
                  </NavLink>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserVerification;
