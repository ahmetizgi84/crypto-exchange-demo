import { useState, useEffect } from 'react';
import { useContext } from 'react';
// import exchangeApi from "../../api/exchangeApi";
import ApiContext from '../../context/ApiContext';
import { Context as AuthContext } from '../../context/AuthContext';
import _ from 'lodash';
import { WoynexTable } from '../../components';
import { currencyFormatter } from '../../helper/currencyFormatter';

function LatestTransactions(props) {
  const { accountList, coin } = props;
  const [address, setAddress] = useState({});
  const [latestTransactions, setLatestTransactions] = useState([]);
  const {
    state: { isLoggedIn }
  } = useContext(AuthContext);
  const { loading } = useContext(ApiContext);

  useEffect(() => {
    if (accountList.length) {
      const address = accountList?.find(account => account.coin === coin?.asset) || {};
      setAddress(address);
    }
  }, [accountList, coin]);

  useEffect(() => {
    if (Object.keys(address).length) {
      // const params = {
      //   criteria: {
      //     tenantId: address.tenantId,
      //     coinId: address.coinId,
      //   },
      // };
      //_getAccountHistoryList(params)
    }
  }, [address]);

  // const _getAccountHistoryList = async (params) => {
  //   try {
  //     const { data } = await exchangeApi.post("/AccountHistory/List", params);
  //     //console.log("response data: ", data)
  //     if (data.success) {
  //       setLatestTransactions(data.data.list);
  //     }
  //   } catch (error) {
  //     console.log("Error occured in _getAccountHistoryList(ApiContext): ", error.response);
  //   }
  // };

  const columns = [
    {
      title: 'NO.',
      dataIndex: 'no.',
      key: 'no.',
      sorter: true
    },
    {
      title: 'Date',
      dataIndex: 'time',
      render: time => getHumanDate(time),
      key: 'time',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      //render: (symbol) => `${symbol}`,
      key: 'symbol',
      sorter: true
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: amount => currencyFormatter(amount),
      key: 'amount'
    }
  ];
  const getHumanDate = time => {
    let fullDate = new Date(time);
    return fullDate.toLocaleString();
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const latestTransactions = _.orderBy(latestTransactions, sorter.field, sorter.order === 'ascend' ? 'asc' : 'desc');
    setLatestTransactions(latestTransactions);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Latest Transactions</h5>

        <div className="wallet-history">
          <WoynexTable
            columns={columns}
            list={latestTransactions}
            size="small"
            onChange={handleTableChange}
            rowKey={record => record.orderId}
            pageSize={5}
            loading={loading}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </div>
  );
}
export default LatestTransactions;
