import { useEffect, useContext } from "react";
import { Tabs as AntTabs, Checkbox } from 'antd';
import ApiContext from "../../context/ApiContext";
import { Context as AuthContext } from '../../context/AuthContext'
import { Popconfirm, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { WoynexTable } from "..";
import _ from 'lodash'
import { currencyFormatter } from "../../helper/currencyFormatter";
import { urlParser } from '../../utils/urlParser'

const { TabPane } = AntTabs;

function HistoryOrder() {
  const { pair } = urlParser(window.location.href)
  const { state: { isLoggedIn } } = useContext(AuthContext)
  const { _fetchOpenOrders, _fetchOrderHistory, _getOrderHistory } = useContext(ApiContext)

  useEffect(() => {

    if (isLoggedIn && pair) {
      const params = {
        symbol: pair
      }

      const payload = {
        criteria: {

        },
      };

      _fetchOpenOrders(params)
      _fetchOrderHistory(params)
      _getOrderHistory(payload)

    }
  }, [isLoggedIn, pair])




  return (
    <>
      <div className="history-order mt15">

        <AntTabs defaultActiveKey="open-orders">

          <TabPane tab="Open Orders" key="open-orders">
            <OpenOrders />
          </TabPane>

          <TabPane tab="Order history" key="order-history">
            <OrderHistory />
          </TabPane>

        </AntTabs>

      </div>
    </>
  )
}

export default HistoryOrder

function OpenOrders() {
  const { state: { isLoggedIn } } = useContext(AuthContext)
  const { loading, openOrders, setOpenOrders, _cancelAnOpenOrder } = useContext(ApiContext)

  const cancelOrderHandler = (order) => {
    console.log("order: ", order)
    const payload = {
      symbol: order.symbol,
      origClientOrderId: order.clientOrderId,
      orderId: order.orderId
      // newClientOrderId: order.clientOrderId
    }
    _cancelAnOpenOrder(payload)
  }

  const getHumanDate = (time) => {
    let fullDate = new Date(time);
    return fullDate.toLocaleString()
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'time',
      sorter: true,
      render: (time => getHumanDate(time)),
      key: 'time'
    },
    {
      title: 'Pair',
      dataIndex: 'symbol',
      sorter: true,
      render: symbol => `${symbol}`,
      key: 'symbol'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true
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
      title: 'Amount',
      dataIndex: 'origQty',
      key: 'origQty'
    },
    {
      title: '',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) =>
        openOrders.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => cancelOrderHandler(record)}>
            <Button type="primary" icon={<DeleteOutlined />} size="sm" danger />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(openOrders, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setOpenOrders(orderedList)
  };

  return (
    <WoynexTable
      columns={columns}
      list={openOrders}
      size="small"
      onChange={handleTableChange}
      rowKey={record => record.orderId}
      pageSize={8}
      loading={loading}
      isLoggedIn={isLoggedIn}
    />
  )
}




function OrderHistory() {

  const { state: { isLoggedIn } } = useContext(AuthContext)
  const { orderHistory, loading, orderHistoryAll, orderHistoryList, setOrderHistoryList } = useContext(ApiContext)

  const columns = [
    {
      title: 'Date',
      dataIndex: 'time',
      sorter: true,
      render: (time => getHumanDate(time)),
      key: 'time',
      responsive: ['md'],
    },
    {
      title: 'Pair',
      dataIndex: 'symbol',
      sorter: true,
      render: symbol => `${symbol}`,
      key: 'symbol',
      responsive: ['md'],
    },
    {
      title: 'Side',
      dataIndex: 'isBuyer',
      render: (isBuyer => {
        return isBuyer ? <div style={{ color: 'var(--c-buy-grey)' }}>BUY</div> : <div style={{ color: '#ff231f' }}  >SELL</div>
      }),
      sorter: true,
      key: 'isBuyer',
      responsive: ['md'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => currencyFormatter(price),
      responsive: ['md'],
    },
    {
      title: 'Amount',
      dataIndex: 'qty',
      key: 'qty',
      responsive: ['md'],
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: ((text, record, index) => (record.qty * record.price).toFixed(2)),
      responsive: ['md'],
    },

  ];

  const getHumanDate = (time) => {
    let fullDate = new Date(time);
    return fullDate.toLocaleString()
  }

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(orderHistoryList, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setOrderHistoryList(orderedList)
  };

  /**
   *
   * @TODO
   * Bütün liste geldikten sonra seçili olanın gösterilmesi için filtre kullanılacak ve setOrderHistoryList e gerek kalmayacak!
   */
  const onChange = (e) => {
    //console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      setOrderHistoryList(orderHistory)
    } else {
      setOrderHistoryList(orderHistoryAll)
    }
  }

  return (
    <>
      <Checkbox name="" onChange={onChange} style={{ marginLeft: "8px", marginBottom: "16px" }}>
        Bring the selected choice
      </Checkbox>
      <WoynexTable
        columns={columns}
        list={orderHistoryList}
        size="small"
        onChange={handleTableChange}
        rowKey={record => record.id}
        pageSize={8}
        loading={loading}
        isLoggedIn={isLoggedIn}
      />
    </>
  )

}

