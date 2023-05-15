import { useState, useEffect, useContext } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import ApiContext from '../../context/ApiContext';
import DataContext from '../../context/DataContext';
import _ from 'lodash';
import { Switch, Pagination } from 'antd';
import { coinIcons } from '../../assets/icons';
import { Spinner } from 'react-bootstrap';

function CoinsInMyWallet(props) {
  const { myBalances, balances, setBalances } = useContext(ApiContext);
  const { activeNav, setActiveNav } = props;
  const [postsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const { zeroBalanceChecked, setZeroBalanceChecked, isHiding, setIsHiding } = useContext(DataContext);

  useEffect(() => {
    if (zeroBalanceChecked) {
      updateList(zeroBalanceChecked);
    }
  }, [zeroBalanceChecked]);

  const updateList = nextChecked => {
    if (nextChecked) {
      const filteredBalances = balances.filter(balance => balance.availableBalance > 0);
      return filteredBalances;
    } else {
      return myBalances;
    }
  };

  const handleZeroBalanceChange = nextChecked => {
    setZeroBalanceChecked(nextChecked);
    updateList(nextChecked);
  };

  // Search
  const onTextChangeHandler = event => {
    let filtertext = event.target.value;
    filtertext = filtertext ? filtertext.toUpperCase() : '';

    let filteredData = _.filter(myBalances, item => {
      return item.asset.includes(filtertext);
    });
    setBalances(filteredData);
  };

  function starifyNumber(number) {
    if (isHiding) {
      let stringified = number.toString();
      let numberLength = stringified.length;
      let starString = '';
      for (let index = 0; index < numberLength; index++) {
        starString += '*';
      }
      return starString;
    } else {
      return number;
    }
  }

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBalances = updateList(zeroBalanceChecked).slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Nav
      variant="pills"
      className="settings-nav"
      onSelect={selectedKey => setActiveNav(selectedKey)}
      activeKey={activeNav}>
      <Row className="my-3 mx-3 border-bottom">
        <Col md={7}>
          <div className="form-group">
            <Switch
              checkedChildren="✔"
              unCheckedChildren="✖"
              checked={zeroBalanceChecked}
              onChange={handleZeroBalanceChange}
              className="react-switch"
            />
            <label>Hide zero balances</label>
          </div>
        </Col>

        <Col md={5}>
          <div className="form-group">
            <Switch
              checkedChildren="✔"
              unCheckedChildren="✖"
              checked={isHiding}
              onChange={() => setIsHiding(prevState => !prevState)}
              className="react-switch"
            />
            <label>Hide balances</label>
          </div>
        </Col>

        <Col md={12}>
          <div className="form-access">
            <div className="form-group">
              <input
                type="text"
                name="search"
                className={'form-control desc'}
                placeholder="Search"
                onChange={onTextChangeHandler}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Nav.Item>
        {currentBalances === null ? (
          <Spinner animation="border" />
        ) : currentBalances.length === 0 ? (
          <div className="text-center desc">Wallet is empty</div>
        ) : (
          currentBalances?.map((balance, idx) => {
            const asset = balance.asset;
            let found = coinIcons.find(ci => ci.asset === asset);
            const image = found?.image;
            const woynex = coinIcons.find(ci => ci.symbol === 'WOYNEX');
            return (
              <Nav.Link
                key={idx}
                eventKey={balance.asset}
                className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <img src={image ? image : woynex?.image} alt={asset} />
                  <div>
                    <h2>{balance.asset}</h2>
                    <p>{balance.asset}</p>
                  </div>
                </div>
                <div>
                  <h3>{starifyNumber(balance.availableBalance)}</h3>
                  <p className="text-right">
                    <i className="icon ion-md-lock"></i> {starifyNumber(balance.locked)}
                  </p>
                </div>
              </Nav.Link>
            );
          })
        )}
      </Nav.Item>

      <Row className="my-3 mx-3 mx-auto">
        <Col md={12}>
          <Pagination
            defaultCurrent={1}
            total={updateList(zeroBalanceChecked).length}
            onChange={paginate}
            showSizeChanger={false}
            className="paginateLink"
          />
        </Col>
      </Row>
    </Nav>
  );
}

export default CoinsInMyWallet;
