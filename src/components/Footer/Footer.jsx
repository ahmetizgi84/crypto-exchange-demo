import { useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Telegram, Linkedin, Twitter, Youtube } from "react-bootstrap-icons";
import ThemeContext from "../../context/ThemeContext";
import styles from "./Footer.module.css";

const aspectRatio = 151 / 574;
const width = 150;
const height = width * aspectRatio;

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer id="footer">
      <div className="footer-container">
        <Container>
          <Row>
            <Col lg={2} md={12} sm={12} xs={12}>
              <div className="logo-footer">
                <img
                  // src={theme === "light" ? "../img/logo-dark.svg" : "../img/logo-light.svg"}
                  src={
                    theme === "light"
                      ? "https://media.hebys.io/images/hebys-logo.png"
                      : "https://media.hebys.io/images/hebys-logo-dark-mode.png"
                  }
                  alt="logo"
                  // style={{ width: "215px", height: "78px" }}
                  style={{ objectFit: "contain", width, height, marginTop: "1rem" }}
                  className="img-responsive img-fluid"
                />
              </div>

              {/* <p className="sub-widget-logo">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quibusdam sequi officia maxime
                repellat et. Officiis necessitatibus cum eligendi libero dicta placeat. Dignissimos, autem? Magnam
                veritatis optio facilis dolore aut?
              </p> */}
            </Col>

            <Col lg={2} md={4} sm={5} xs={6}>
              <div className="widget widget-menu style-1">
                <h5 className="title-widget">About Us</h5>
                <ul>
                  <li>
                    {/* <Link to="/aboutUs/about" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}> */}
                    <Link to="#" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      // to="/aboutUs/privacy"
                      to="#"
                      className={theme === "light" ? styles.footerLink : styles.footerLinkDark}
                    >
                      Privacy
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/terms-and-conditions"
                      className={theme === "light" ? styles.footerLink : styles.footerLinkDark}
                    >
                      User Agreement
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/terms-and-conditions"
                      className={theme === "light" ? styles.footerLink : styles.footerLinkDark}
                    >
                      GDPR
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={2} md={4} sm={7} xs={6}>
              <div className="widget widget-menu style-2">
                <h5 className="title-widget">Products</h5>
                <ul>
                  <li>
                    <Link to="/" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      Exchange
                    </Link>
                  </li>

                  <li>
                    <Link to="#" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      Bank Accounts
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={2} md={4} sm={5} xs={6}>
              <div className="widget widget-menu fl-st-3 style-1">
                <h5 className="title-widget">Service</h5>
                <ul>
                  <li>
                    <Link
                      to="/profile/referral"
                      className={theme === "light" ? styles.footerLink : styles.footerLinkDark}
                    >
                      Referral
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      NDA
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={2} md={4} sm={5} xs={6}>
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">Support</h5>
                <ul>
                  <li>
                    <Link to="#" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      Support Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/fee/vip-level" className={theme === "light" ? styles.footerLink : styles.footerLinkDark}>
                      Fees
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={2} md={6} sm={7} xs={12}>
              <div className="widget widget-subcribe">
                <h5 className="title-widget">Community</h5>

                <div className="widget-social style-1 mg-t32">
                  <ul>
                    <li>
                      <a href="/" target="_blank">
                        <Twitter size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="/" target="_blank">
                        <Telegram size={20} />
                      </a>
                    </li>
                    {/* <li className="style-2">
                      <a href="/" target="_blank">
                        <Telegram size={20} />
                      </a>
                    </li> */}
                    <li>
                      <a href="/" target="_blank">
                        <Youtube size={20} />
                      </a>
                    </li>
                    <li className="mgr-none">
                      <a href="/" target="_blank">
                        <Linkedin size={20} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>

          <Row
            className="text-center"
            style={{
              borderTop: "1px solid var(--c-footerlinkcolor)",
              paddingTop: "12px",
            }}
          >
            <Col md={12} className="footer">
              {" "}
              © {new Date().getFullYear()} Hebys Technology, Inc. All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
