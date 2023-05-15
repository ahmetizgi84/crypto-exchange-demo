import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';
import exchangeApi from '../api/exchangeApi';

function Idverify() {
  const { theme } = useContext(ThemeContext);
  const [tierRequiredInfo, setTierRequiredInfo] = useState([]);
  const [passive, setPassive] = useState(true);

  useEffect(() => {
    getTierRequiredInfoList();
  }, []);

  const getTierRequiredInfoList = async () => {
    const params = {
      tierSettingId: 9
    };

    try {
      const { data } = await exchangeApi.post('/TierRequiredInfo/List', params);
      if (data.success) {
        //console.log(data.data.list);
        setTierRequiredInfo(data.data.list);
        setPassive(false);
      }
    } catch (error) {
      console.log('Error in getTierRequiredInfoList: ', error.response);
    }
  };

  return (
    <Container>
      <div className="form-access mt-3">
        <form>
          <div className="text-center mt-4">
            <img
              src={theme === 'light' ? './img/logo-dark.svg' : './img/logo-light.svg'}
              style={{ width: '176px', height: '66px' }}
              alt="logo"
            />
            <p className="h5 my-4">Get Verified your Government Issued ID </p>
          </div>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={4}>
              <select id="selectLanguage" className="custom-select">
                <option>Issuing country</option>
                <option>Turkey</option>
                <option>China</option>
                <option>Spain</option>
                <option>South Africa</option>
                <option>Panama</option>
              </select>
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={4}>
              <select id="selectLanguage" className="custom-select">
                <option>Select ID type</option>
                <option>Driving Licence</option>
                <option>Identity Card</option>
              </select>
            </Col>
          </Row>

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={2}>
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="Your ID number"
                //value={values.email}
                //onChange={handleChange("email")}
              />
            </Col>
            <Col md={2}>
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="Expiry Date"
                //value={values.email}
                //onChange={handleChange("email")}
              />
            </Col>
          </Row>

          {/* Tier Required Infos */}
          {tierRequiredInfo?.map(tierInfo => {
            return (
              <div key={tierInfo.id}>
                <Row className="justify-content-md-center align-items-center">
                  <Col md={8}>
                    <p className="h6 mb-0">{tierInfo.requirementName}</p>
                    <small className="text-muted">Please upload a copy of your valid ID card (Photo or scan)</small>
                  </Col>
                </Row>

                <Row className="justify-content-md-center align-items-center mb-4">
                  <Col md={5}>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '100%',
                        height: '200px',
                        border: '1px solid #ddd',
                        borderStyle: 'dashed'
                      }}>
                      <div className="text-center">
                        <button className="btn btn-sm btn-primary">UPLOAD</button>
                        <div>
                          <small className="text-muted">Maximum file size is 20MB</small>
                        </div>
                        <small className="text-muted">JPG, BMP, PNG formats</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="justify-content-center d-flex">
                    <img
                      src={`data:image/jpeg;base64,${tierInfo.docTemplate.file}`}
                      // src={constants.front}
                      //style={{ width: "177px", height: "112px" }}
                      className="img-responsive img-fluid p-3"
                      alt="front"
                    />
                  </Col>
                </Row>
              </div>
            );
          })}

          <Row className="justify-content-md-center align-items-center mb-4">
            <Col md={2}>
              <button className="btn btn-sm btn-primary btn-block" disabled={passive}>
                SUBMIT
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default Idverify;
