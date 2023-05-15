import { useState, useEffect, useContext } from 'react'
import { Row, Col, Tab } from 'react-bootstrap';
import ApiContext from '../../context/ApiContext';
import CoinsInMyWallet from './CoinsInMyWallet'
import TransactionLimits from './TransactionLimits'
import Balances from './Balances'
import LatestTransactions from './LatestTransactions'
import { ProfileNavbar } from '../../components'

function Wallet() {
  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="wallet">
            <Row>
              <Col lg={2}>
                <ProfileNavbar />
              </Col>

              <Col lg={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="wallet">
                    <WalletComponent />
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

export default Wallet;


function WalletComponent() {
  const { _getAccountInfo, _getAccountList, myBalances, accountList } = useContext(ApiContext)
  const [activeNav, setActiveNav] = useState("")
  const [coin, setCoin] = useState({})

  useEffect(() => {
    _getAccountInfo()
    _getAccountList();
  }, [])

  // 1. when myBalance filled, set activeNav for the first balance item
  useEffect(() => {
    if (myBalances.length) {
      setActiveNav(myBalances[0].asset)
    }
  }, [myBalances])

  // 2. When activeNav is set, set relevant balance to the coin
  useEffect(() => {
    const coin = myBalances.find(balance => balance.asset === activeNav)
    setCoin(coin)
  }, [activeNav])


  return (
    <>
      <div className="wallet">
        <Row>
          <Col lg={4}>
            <CoinsInMyWallet
              activeNav={activeNav}
              setActiveNav={setActiveNav}
            />
          </Col>

          <Col lg={8}>
            <div className="tab-content">
              <div
                id="coinBTC"
                role="tabpanel"
              >
                <Balances coin={coin} />
                <LatestTransactions accountList={accountList} coin={coin} />
                <TransactionLimits />
              </div>

            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}