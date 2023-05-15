import { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { WoynexTable } from "../../components";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { currencyFormatter } from "../../helper/currencyFormatter";

function OpenOrders() {
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);
  const { loading, openOrders, setOpenOrders, _cancelAnOpenOrder } = useContext(ApiContext);

  const columns = [
    {
      title: "Date",
      dataIndex: "time",
      sorter: true,
      render: (time) => getHumanDate(time),
      key: "time",
    },
    {
      title: "Pair",
      dataIndex: "symbol",
      sorter: true,
      render: (symbol) => `${symbol}`,
      key: "symbol",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: true,
    },
    {
      title: "Side",
      dataIndex: "side",
      key: "side",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => currencyFormatter(price),
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "origQty",
      key: "origQty",
    },
    {
      title: "",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) =>
        openOrders.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => cancelOrderHandler(record)}>
            <Button type="primary" icon={<DeleteOutlined />} size="sm" danger />
          </Popconfirm>
        ) : null,
    },
  ];

  const cancelOrderHandler = (order) => {
    console.log("order: ", order);
    const payload = {
      symbol: order.symbol,
      origClientOrderId: order.clientOrderId,
      orderId: order.orderId,
      // newClientOrderId: order.clientOrderId
    };
    _cancelAnOpenOrder(payload);
  };

  const getHumanDate = (time) => {
    let fullDate = new Date(time);
    return fullDate.toLocaleString();
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(openOrders, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setOpenOrders(orderedList);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-2">Open Orders</h5>
        <div>
          <WoynexTable
            columns={columns}
            list={openOrders}
            size="small"
            onChange={handleTableChange}
            rowKey={(record) => record.orderId}
            pageSize={5}
            loading={loading}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </div>
  );
}

export default OpenOrders;
