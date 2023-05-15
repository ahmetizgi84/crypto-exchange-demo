import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { WoynexTable } from "../../components";
import _ from "lodash";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { getHumanDate } from "../../utils/misc/date";

import { OpenOrdersLogic } from "./WholeOrdersLogic";

function OpenOrders() {
  const { isLoggedIn, loading, cancelOrderHandler, openOrders, setOpenOrders } = OpenOrdersLogic();

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

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(openOrders, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setOpenOrders(orderedList);
  };

  return (
    <WoynexTable
      columns={columns}
      list={!openOrders ? [] : openOrders}
      size="small"
      onChange={handleTableChange}
      rowKey={(record) => record.orderId}
      pageSize={8}
      loading={loading}
      isLoggedIn={isLoggedIn}
    />
  );
}

export default OpenOrders;
