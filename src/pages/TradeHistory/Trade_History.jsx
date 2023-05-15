import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ApiContext from '../../context/ApiContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { WoynexTable } from '../../components';
import { DatePicker as AntDatePicker, Select, Button as AntButton } from 'antd';
import _ from 'lodash';
import Moment from 'react-moment';
import { currencyFormatter } from '../../helper/currencyFormatter';

const { Option } = Select;

const TradeHistory = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [pair, setPair] = useState('');
  const [side, setSide] = useState('');
  //const [currencyCode, setCurrencyCode] = useState("All");
  const { user, _getPairList, pairList, _getTradeHistory, tradeHistory, loading, setTradeHistory } =
    useContext(ApiContext);
  const {
    state: { isLoggedIn }
  } = useContext(AuthContext);

  useEffect(() => {
    //_getCurrencyCodes();
    _getPairList();
  }, []);

  const getTradeFilter = () => {
    const payload = {
      criteria: {
        startTime,
        endTime,
        tenantId: user.tenantId,
        createdUserId: user.userId,
        pair,
        side
      }
    };

    _getTradeHistory(payload);
  };

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      sorter: true,
      render: time => <Moment date={time} format="DD.MM.YYYY hh:mm:ss" />,
      key: 'time'
    },
    {
      title: 'Pair',
      dataIndex: 'pair',
      sorter: true,
      key: 'pair'
    },
    {
      title: 'Side',
      dataIndex: 'side',
      key: 'side',
      sorter: true
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price => currencyFormatter(price),
      key: 'price'
    },
    {
      title: 'Executed Qty',
      dataIndex: 'executedQty',
      key: 'executedQty'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(tradeHistory, sorter.field, sorter.order === 'ascend' ? 'asc' : 'desc');
    setTradeHistory(orderedList);
  };

  function onChangeStart(date) {
    if (date) {
      setStartTime(date._d);
    }
  }

  function onChangeEnd(date) {
    if (date) {
      setEndTime(date._d);
    }
  }

  const handleOnPair = value => {
    setPair(value);
  };

  const handleOnSide = value => {
    setSide(value);
  };

  function onSearchSelect(val) {
    console.log('search:', val);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Trade History</h5>
        <Row>
          <Col md={12}>
            <Row>
              <div className="px-3">
                <label htmlFor="selectLanguage">Start Time</label>
                <div>
                  <AntDatePicker onChange={onChangeStart} allowClear={true} />
                </div>
              </div>

              <div className="px-3">
                <label htmlFor="selectLanguage">End Time</label>
                <div>
                  <AntDatePicker onChange={onChangeEnd} />
                </div>
              </div>

              <div className="px-3">
                <label htmlFor="selectPair">Pair</label>
                <div>
                  <Select
                    showSearch
                    style={{ width: 145 }}
                    placeholder="Select pair"
                    optionFilterProp="children"
                    onChange={handleOnPair}
                    onSearch={onSearchSelect}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {pairList.map((pair, idx) => (
                      <Option key={idx} value={pair.symbol}>
                        {pair.symbol}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="px-3">
                <label htmlFor="selectPair">Side</label>
                <div>
                  <Select
                    showSearch
                    style={{ width: 145 }}
                    placeholder="Select side"
                    optionFilterProp="children"
                    onChange={handleOnSide}
                    onSearch={onSearchSelect}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    <Option value="">All</Option>
                    <Option value="Buy">Buy</Option>
                    <Option value="Sell">Sell</Option>
                  </Select>
                </div>
              </div>

              <Col md={2} className="d-flex align-items-end">
                <Row>
                  <Col md={6}>
                    <AntButton type="primary" onClick={getTradeFilter}>
                      Search
                    </AntButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={12}>
            <WoynexTable
              columns={columns}
              list={tradeHistory}
              size="small"
              onChange={handleTableChange}
              rowKey={record => record.id}
              pageSize={8}
              loading={loading}
              isLoggedIn={isLoggedIn}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TradeHistory;
