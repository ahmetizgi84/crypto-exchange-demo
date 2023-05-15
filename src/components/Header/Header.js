import { useContext, useEffect } from "react";
import { Navbar, Nav, Dropdown, Button, NavDropdown } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { Link, useHistory, NavLink } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import { Context as AuthContext } from "../../context/AuthContext";
import ApiContext from "../../context/ApiContext";
import DataContext from "../../context/DataContext";
import styles from "./Header.module.css";
import cn from "classnames";
import { urlParser } from "../../utils/urlParser";

const aspectRatio = 151 / 574;
const width = 120;
const height = width * aspectRatio;

function Header() {
  const { pair, quote, asset } = urlParser(window.location.href);
  const { _getCommissionLevelList, commissionLevelList, user } = useContext(ApiContext);
  const { vip, setVip } = useContext(DataContext);
  const {
    _logoutHandler,
    state: { userData, isLoggedIn },
  } = useContext(AuthContext);
  const history = useHistory();
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    let el = document.querySelector("#darkTheme");
    if (el) {
      el.addEventListener("click", function () {
        document.body.classList.toggle("dark");
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      _getCommissionLevelList();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (commissionLevelList) {
      let tempCommissionLevelList = [...commissionLevelList];
      tempCommissionLevelList.map((level, idx) => {
        if (idx === 0) {
          if (0 <= user?.tradingBTCVolume4Last30Days <= level.tradingBtcvolume4Last30Days) {
            setVip(level.name);
          }
        } else {
          if (
            tempCommissionLevelList[idx - 1].tradingBtcvolume4Last30Days < user?.tradingBTCVolume4Last30Days &&
            user?.tradingBTCVolume4Last30Days <= level.tradingBtcvolume4Last30Days
          ) {
            setVip(level.name);
          }
        }
        return "test";
      });
    }
  }, [user, commissionLevelList]);

  const logoutHandler = () => {
    _logoutHandler(history);
  };

  const themeHandler = (theme) => {
    setTheme(theme);
    localStorage.setItem("woynex-theme", theme);
  };

  return (
    <header className="light-bb">
      <Navbar expand="lg">
        <Link className="navbar-brand" to="/">
          {theme === "light" ? (
            // <img src={'../img/logo-dark.svg'} alt="logo" />
            <img
              src={"https://media.hebys.io/images/hebys-logo.png"}
              alt="logo"
              style={{ objectFit: "contain", width, height }}
            />
          ) : (
            // <img src={"../img/logo-light.svg"} alt="logo" />
            <img
              src={"https://media.hebys.io/images/hebys-logo-dark-mode.png"}
              alt="logo"
              style={{ objectFit: "contain", width, height }}
            />
          )}
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav mr-auto">
            <NavLink exact to="/pro/BTCUSDT_BTC_USDT" className="nav-link">
              Exchange
            </NavLink>

            <NavLink to="/basic" className="nav-link">
              Basic
            </NavLink>

            <NavLink to={`/fast/${pair}_${asset}_${quote}`} className="nav-link">
              Fast Buy/Sell
            </NavLink>

            {/*
              isLoggedIn &&
              <>
                <NavLink to="/profile/dashboard" className="nav-link">
                  Profile
                </NavLink>

                <NavLink to="/profile/wallet" className="nav-link">
                  Wallet
                </NavLink>

                <NavLink to="/profile/security" className="nav-link">
                  Security
                </NavLink>
              </>
            */}

            {/*
              isLoggedIn &&
              <NavDropdown title="Dashboard" id="nav-dropdown">
                <NavDropdown.Item className='dropdown-menu-hover dropdown-menu-p'>
                  <Link to="/profile/dashboard" className="dropdown-menu-link" >
                    <i className="dropdown-menu-icon ion-md-person" ></i>
                    <span>Profile</span>
                    <span class="arrow right">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="12px" viewBox="0 0 50 80" xmlSpace="preserve">
                        <polyline fill="none" stroke="var(--c-blue)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                          points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
                      </svg>
                    </span>
                  </Link>

                </NavDropdown.Item>
                <NavDropdown.Item className='dropdown-menu-hover dropdown-menu-p'>
                  <Link to="/profile/wallet" className="dropdown-menu-link ">
                    <i className="dropdown-menu-icon ion-md-wallet" ></i>
                    <span>Wallet</span>
                    <span class="arrow right">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="12px" viewBox="0 0 50 80" xmlSpace="preserve">
                        <polyline fill="none" stroke="var(--c-blue)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                          points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
                      </svg>
                    </span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className='dropdown-menu-hover dropdown-menu-p'>
                  <Link to="/profile/security" className="dropdown-menu-link">
                    <i className="dropdown-menu-icon ion-md-settings" ></i>
                    <span>Security</span>
                    <span class="arrow right">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="12px" viewBox="0 0 50 80" xmlSpace="preserve">
                        <polyline fill="none" stroke="var(--c-blue)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                          points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
                      </svg>
                    </span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            */}

            {isLoggedIn && (
              <NavDropdown title="Dashboard" id="nav-dropdown">
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/dashboard" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-person"></i>
                    <span>Profile</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/wallet" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-wallet"></i>
                    <span>Wallet</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/bank-accounts" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-card"></i>
                    <span>Bank Accounts</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/trade-history" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-calendar"></i>
                    <span>Trade History</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/company-info" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-briefcase"></i>
                    <span>Company Info</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/sub-accounts" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-people"></i>
                    <span>Accounts</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/notifications" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-notifications"></i>
                    <span>Notifications</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/security" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-settings"></i>
                    <span>Security</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ padding: "0" }} className="dropdown-menu-hover ">
                  <Link to="/profile/referral" className={cn([styles.headerLink, "nav-link dropdown-menu-link"])}>
                    <i className="header-icon ion-md-redo"></i>
                    <span>Referral</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* <NavDropdown title="Others">
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
              <Link to="/signup" className="dropdown-item">
                Sign up
              </Link>
              <Link to="/lock" className="dropdown-item">
                Lock
              </Link>
              <Link to="/otp-number" className="dropdown-item">
                OTP Number
              </Link>
              <Link to="/otp-verify" className="dropdown-item">
                OTP Verify
              </Link>
              <Link to="/reset" className="dropdown-item">
                Reset
              </Link>
              <Link to="/notfound" className="dropdown-item">
                404
              </Link>
            </NavDropdown> */}
          </Nav>

          <Nav className="navbar-nav ml-auto">
            {!isLoggedIn && (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>

                <NavLink to="/signup" className="nav-link">
                  Sign up
                </NavLink>
              </>
            )}

            {/* <Dropdown className={cn([styles.headerBtnContainer])}>
              <Dropdown.Toggle variant="default" className={styles.headerButton}>
                English
              </Dropdown.Toggle>

              <Dropdown.Menu>

                <div className="dropdown-body">
                  <ul className="profile-nav">
                    <li className="nav-item">
                      <span>English</span>
                    </li>
                    <li className="nav-item">
                      <span>Türkçe</span>
                    </li>
                  </ul>
                </div>
              </Dropdown.Menu>
            </Dropdown> */}

            <Dropdown className="header-custom-icon">
              <Button
                variant="default"
                onClick={() => themeHandler(theme === "light" ? "dark" : "light")}
                id="darkTheme"
              >
                {theme === "light" ? <i className="icon ion-md-moon"></i> : <i className="icon ion-md-sunny"></i>}
              </Button>

              {isLoggedIn && (
                <>
                  <Dropdown.Toggle variant="default">
                    <i className="icon ion-md-notifications"></i>
                    <span className="circle-pulse"></span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                      <p className="mb-0 font-weight-medium">6 New Notifications</p>
                      <a href="#!" className="text-muted">
                        Clear all
                      </a>
                    </div>
                    <div className="dropdown-body">
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-md-lock"></i>
                        </div>
                        <div className="content">
                          <p>Account password change</p>
                          <p className="sub-text text-muted">5 sec ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-md-alert"></i>
                        </div>
                        <div className="content">
                          <p>Solve the security issue</p>
                          <p className="sub-text text-muted">10 min ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-logo-android"></i>
                        </div>
                        <div className="content">
                          <p>Download android app</p>
                          <p className="sub-text text-muted">1 hrs ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-logo-bitcoin"></i>
                        </div>
                        <div className="content">
                          <p>Bitcoin price is high now</p>
                          <p className="sub-text text-muted">2 hrs ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-logo-usd"></i>
                        </div>
                        <div className="content">
                          <p>Payment completed</p>
                          <p className="sub-text text-muted">4 hrs ago</p>
                        </div>
                      </a>
                    </div>
                    <div className="dropdown-footer d-flex align-items-center justify-content-center">
                      <a href="#!">View all</a>
                    </div>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>

            {isLoggedIn && (
              <Dropdown className="header-img-icon">
                <Dropdown.Toggle variant="default">
                  <img src={"../img/avatar.svg"} alt="avatar" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="dropdown-header d-flex flex-column align-items-center">
                    <div className="figure mb-3">
                      <img src={"../img/avatar.svg"} alt="" />
                    </div>
                    <div className="info text-center">
                      <p className="name font-weight-bold mb-0">
                        {userData?.name} {userData?.surname}
                      </p>
                      <p className="email text-muted mb-0">{userData?.email}</p>
                      <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: "24px" }}>
                        <StarFill color="#007bff" size={12} style={{ marginRight: "5px" }} />
                        <p className="mb-0">{vip}</p>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-body">
                    <ul className="profile-nav">
                      <li className="nav-item">
                        <Link to="/profile/dashboard" className={cn([styles.headerLink, "nav-link"])}>
                          <i className="icon ion-md-person"></i>
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/profile/wallet" className={cn([styles.headerLink, "nav-link"])}>
                          <i className="icon ion-md-wallet"></i>
                          <span>Wallet</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/profile/bank-accounts" className={cn([styles.headerLink, "nav-link"])}>
                          <i className="icon ion-md-card"></i>
                          <span>Bank Accounts</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/profile/trade-history" className={cn([styles.headerLink, "nav-link"])}>
                          <i className="icon ion-md-calendar"></i>
                          <span>Trade History</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/profile/notifications" className={cn([styles.headerLink, "nav-link"])}>
                          <i className="icon ion-md-notifications"></i>
                          <span>Notifications</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/profile/security" className={cn([styles.headerLink, "nav-link"])}>
                          <i className="icon ion-md-settings"></i>
                          <span>Security</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" onClick={logoutHandler} className={cn([styles.headerLink, "nav-link red"])}>
                          <i className="icon ion-md-power"></i>
                          <span>Log Out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
