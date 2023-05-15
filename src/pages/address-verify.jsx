import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ThemeContext from "../context/ThemeContext";

const AddressVerify = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container>
      <div className="form-access mt-3">
        <form>
          <div className="text-center mt-4">
            <img
              src={theme === "light" ? "./img/logo-dark.svg" : "./img/logo-light.svg"}
              style={{ width: "176px", height: "66px" }}
              alt="logo"
            />
            <p className="h5 my-4">Residence verification</p>
          </div>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={4}>
              <textarea
                type="text"
                name="code"
                className="form-control"
                placeholder="Your address"
                //value={values.email}
                //onChange={handleChange("email")}
              />
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={2}>
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="City"
                //value={values.email}
                //onChange={handleChange("email")}
              />
            </Col>
            <Col md={2}>
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="Postcode - (ZIP)"
                //value={values.email}
                //onChange={handleChange("email")}
              />
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={4}>
              {/* <label htmlFor="selectLanguage">Language</label> */}
              <select id="selectLanguage" className="custom-select">
                <option>Select your country</option>
                <option>Turkey</option>
                <option>China</option>
                <option>Spain</option>
                <option>South Africa</option>
                <option>Panama</option>
              </select>
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-1">
            <Col md={8}>
              <p className="h6 mb-0">Proof of Address</p>
              <small className="text-muted">Please upload a Utility bill with your Address (Photo or scan)</small>
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={8}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "100%",
                  height: "160px",
                  border: "1px solid #ddd",
                  borderStyle: "dashed",
                }}
              >
                <div className="text-center">
                  <button className="btn btn-sm btn-primary">UPLOAD</button>
                  <div>
                    <small className="text-muted">Maximum file size is 20MB</small>
                  </div>
                  <small className="text-muted">JPG, BMP, PNG formats</small>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={2}>
              <button className="btn btn-sm btn-primary btn-block">SUBMIT</button>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
};

export default AddressVerify;
