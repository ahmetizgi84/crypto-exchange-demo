import { useState, useContext, useEffect } from 'react';
import { Col, Row, Tabs, Tab, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { OpenBox, CoinList, AddressBookList, NetworkList, Card } from '../../components';
import ApiContext from '../../context/ApiContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import _ from 'lodash';

const Crypto = () => {
  const { _getCoinList, coinList, _getTransferNetwork, coinNetwork } = useContext(ApiContext);
  const [key, setKey] = useState('newAddress');
  const [show, setShow] = useState(false);
  const [coin, setCoin] = useState({});

  const [showAddressBook, showAddresBook] = useState(false);
  const [addressBook, setAddressBook] = useState({});

  const [coinNetworkModal, setCoinNetworkModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});

  const [amount, setAmount] = useState('');

  const addressBookDummy = [
    {
      title: 'My Kucoin address',
      address: '0x8542fsd5fr55ssd5t78ww6w3e1gju1r1ds',
      network: 'ETH (ERC20)'
    },

    {
      title: 'My GateIo address',
      address: '0x8542fsd5fr55ssd5t78ww6w3e1gju1r1ds',
      network: 'BTC (BEP20)'
    }
  ];

  function coinListHandler() {
    setShow(true);
  }

  useEffect(() => {
    _getCoinList();
  }, [_getCoinList]);

  useEffect(() => {
    if (coinList && coinList.length) {
      setCoin(coinList[0]);
    }
  }, [coinList]);

  useEffect(() => {
    if (coin) {
      const payload = {
        symbol: coin.symbol
      };
      _getTransferNetwork(payload);
    }
  }, [coin]);

  return (
    <div className="pl-3 mt-3">
      <Row>
        <Col md={12}>
          <h5 className="dark-text-white">Withdraw Crypto</h5>
        </Col>

        <Col md={8} xs={12}>
          <Card>
            <Row className="mb-3">
              <Col md={12} xs={12}>
                <label className="dark-text-white">Coin</label>
                <OpenBox onClick={() => coinListHandler()} asset={coin?.symbol} coinName={coin?.coinName} />
                <CoinModal show={show} setShow={setShow} setCoin={setCoin} />
              </Col>
            </Row>

            <Row className="py-4">
              <Col md={12} xs={12}>
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)} className="mb-3">
                  <Tab eventKey="newAddress" title="New Address" tabClassName="pl-0">
                    <NewAddress setShow={setCoinNetworkModal} selectedNetwork={selectedNetwork} />
                    <NetworkListModal
                      setSelectedNetwork={setSelectedNetwork}
                      coinNetwork={coinNetwork}
                      setShow={setCoinNetworkModal}
                      show={coinNetworkModal}
                    />
                  </Tab>

                  <Tab eventKey="addressList" title="Address Book">
                    <AddressBook setShow={showAddresBook} addressBook={addressBook} />
                    <AdressBookModal
                      show={showAddressBook}
                      setShow={showAddresBook}
                      addressBook={addressBookDummy}
                      setAddressBook={setAddressBook}
                    />
                  </Tab>
                </Tabs>
              </Col>
            </Row>

            {addressBook && Object.keys(addressBook).length > 0 && (
              <Row className="py-4">
                <Col md={2} xs={12}>
                  <span className="dark-text-white"> Withdraw Amount</span>
                </Col>
                <Col md={10} xs={12}>
                  <div className="form-access">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Minimal 50"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            )}

            {/**
             * @TODO
             * Hardcoded 20 value will be changed real fee value soon which will be coming from backend
             */}
            {amount && parseInt(amount) - 20 > 0 && (
              <Row className="py-4">
                <Col md={2} xs={12}>
                  <span className="dark-text-white">Receive Amount</span>
                </Col>
                <Col md={7} xs={12}>
                  <div className="form-access">
                    <div className="form-group">
                      <h4 className="dark-text-white">{parseInt(amount) - 20}</h4>
                      <label>20 USDT network fee included</label>
                    </div>
                  </div>
                </Col>
                <Col md={3} xs={12}>
                  <button className="btn btn-success btn-block">Withdraw</button>
                </Col>
              </Row>
            )}
          </Card>
        </Col>

        <Col md={4}>
          <div style={{ backgroundColor: '#FAFAFA', height: '100%' }}>Related Links</div>
        </Col>
      </Row>
    </div>
  );
};

export default Crypto;

function CoinModal({ show, setShow, setCoin }) {
  const { coinList } = useContext(ApiContext);
  const [listCoin, setListCoin] = useState([]);

  useEffect(() => {
    if (coinList && coinList.length > 0) {
      setListCoin([...coinList]);
    }
  }, [coinList]);

  const onClickHandler = item => {
    setCoin(item);
    setShow(false);
  };

  const handleChange = event => {
    let filtertext = event.target.value;
    filtertext = filtertext ? filtertext.toUpperCase() : '';

    let filteredData = _.filter(coinList, item => {
      return item.symbol.includes(filtertext);
    });

    let sortedData = filteredData.sort((a, b) => (a.symbol > b.symbol ? 1 : -1));
    setListCoin(sortedData);
  };

  return (
    <Modal backdrop="static" scrollable={true} animation={false} show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="dark-text-white">Select coin to withdraw</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-access px-3">
          <div className="form-group">
            <input type="text" name="search" className={'form-control'} placeholder="Search" onChange={handleChange} />
          </div>
        </div>
        <div className="my-3">
          <CoinList list={listCoin} onClick={onClickHandler} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

function NewAddress({ setShow, selectedNetwork }) {
  let val = {};
  let schema;

  if (selectedNetwork && Object.keys(selectedNetwork).length > 0) {
    val = {
      key: selectedNetwork?.networkCode,
      value: selectedNetwork?.label
    };

    let incomingRegex = selectedNetwork.addressVerificationRegex;
    let parsedRegex = incomingRegex.replace('/', '');
    let oldRegex = parsedRegex.replace('/', '');
    const newRegex = new RegExp(oldRegex);

    schema = yup.object().shape({
      address: yup
        .string()
        .required('Required field')
        .matches(
          newRegex,
          'The withdrawal address format is wrong. Please check the withdrawal address length and character content and try again'
        ),
      amount: yup.string().required('Required field')
    });
  }

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    enableReinitialize: true,

    initialValues: {
      address: '',
      amount: ''
    },

    onSubmit: values => {
      submitForm(values);
    },

    validationSchema: schema
  });

  const submitForm = values => {
    console.log('values: ', values);
  };

  return (
    <div className="form-default">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="dark-text-white">Network</label>
          <OpenBox onClick={() => setShow(true)} withoutIcon plainText="Select withdrawal network" value={val} />
        </div>

        <div className="form-group">
          <label className="dark-text-white">Address</label>
          <input
            type="text"
            name="address"
            className={cn(['form-control', errors.address && touched.address && 'is-invalid'])}
            placeholder="Enter address here"
            value={values.address || ''}
            onChange={handleChange('address')}
            disabled={selectedNetwork && Object.keys(selectedNetwork).length > 0 ? false : true}
          />
          {errors.address && touched.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="form-group">
          <label className="dark-text-white">Amount</label>
          <input
            type="text"
            name="amount"
            className={cn(['form-control', errors.amount && touched.amount && 'is-invalid'])}
            placeholder="Enter amount"
            value={values.amount || ''}
            onChange={handleChange('amount')}
            disabled={selectedNetwork && Object.keys(selectedNetwork).length > 0 ? false : true}
          />
          {errors.amount && touched.amount && <div className="invalid-feedback">{errors.amount}</div>}
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block btn-warning"
            disabled={selectedNetwork && Object.keys(selectedNetwork).length > 0 ? false : true}>
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

function NetworkListModal({ show, setShow, coinNetwork, setSelectedNetwork }) {
  const onPressHandler = item => {
    setSelectedNetwork(item);
    setShow(false);
  };

  console.log('coinNetwork: ', coinNetwork);

  return (
    <Modal backdrop="static" scrollable={true} animation={false} show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="dark-text-white">Select network</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-access px-3">
          <div className="form-group">
            <p>Ensure the network matches the addresses network entered to avoid withdrawal losses.</p>
          </div>
        </div>
        <div className="my-3 ">
          {coinNetwork.length > 0 ? (
            <NetworkList list={coinNetwork} onPress={onPressHandler} />
          ) : (
            <div className="text-center">No data found!</div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

function AddressBook({ setShow, addressBook }) {
  return (
    <div className="form-access">
      <div className="form-group">
        <label>Address Book</label>
        <OpenBox
          onClick={() => setShow(true)}
          plain
          plainText={addressBook.title}
          placeholder="Select from address book"
        />
        {addressBook && Object.keys(addressBook).length > 0 && (
          <>
            <Row className="mt-3">
              <Col md={3} xs={12}>
                Address
              </Col>
              <Col md={9} xs={12}>
                {addressBook.address}
              </Col>
            </Row>

            <Row className="mt-1">
              <Col md={3} xs={12}>
                Network
              </Col>
              <Col md={9} xs={12}>
                {addressBook.network}
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

function AdressBookModal({ show, setShow, addressBook, setAddressBook }) {
  const onPressHandler = item => {
    setAddressBook(item);
    setShow(false);
  };

  return (
    <Modal backdrop="static" scrollable={true} animation={false} show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="dark-text-white">Select from Address Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addressBook.length ? (
          <Row className="">
            <Col md={12} className="mt-3 mb-3">
              <AddressBookList addressBookList={addressBook} onPress={onPressHandler} />
            </Col>
          </Row>
        ) : (
          <Row className="mx-auto text-center">
            <Col md={12} className="mt-3 mb-3">
              <Search size={42} />
            </Col>

            <Col className="mt-3 mb-3" md={12}>
              Easily access your saved addresses for withdrawals. Label and save each address.
            </Col>

            <Col md={12} className="mt-3 mb-5">
              <Link to="/security">
                <button className="btn btn-danger">Add Withdrawal Address</button>
              </Link>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}
