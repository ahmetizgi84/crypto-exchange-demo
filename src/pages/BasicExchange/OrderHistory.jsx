import { WoynexTable } from "../../components";
import _ from "lodash";
import { currencyFormatter } from "../../helper/currencyFormatter";
import { getHumanDate } from "../../utils/misc/date";
import { OrderHistoryLogic } from "./WholeOrdersLogic";

function OrderHistory() {
  const { isLoggedIn, loading, orderHistoryList, setOrderHistoryList } = OrderHistoryLogic();

  const columns = [
    {
      title: "Date",
      dataIndex: "time",
      sorter: true,
      render: (time) => getHumanDate(time),
      key: "time",
      responsive: ["md"],
    },
    {
      title: "Pair",
      dataIndex: "symbol",
      sorter: true,
      render: (symbol) => `${symbol}`,
      key: "symbol",
      responsive: ["md"],
    },
    {
      title: "Side",
      dataIndex: "isBuyer",
      render: (isBuyer) => {
        return isBuyer ? <div style={{ color: "#26de81" }}>BUY</div> : <div style={{ color: "#ff231f" }}>SELL</div>;
      },
      sorter: true,
      key: "isBuyer",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => currencyFormatter(price),
      responsive: ["md"],
    },
    {
      title: "Amount",
      dataIndex: "qty",
      key: "qty",
      responsive: ["md"],
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, record, __) => (record.qty * record.price).toFixed(2),
      responsive: ["md"],
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(orderHistoryList, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setOrderHistoryList(orderedList);
  };

  return (
    <WoynexTable
      columns={columns}
      list={orderHistoryList}
      size="small"
      onChange={handleTableChange}
      rowKey={(record) => record.id}
      pageSize={8}
      loading={loading}
      isLoggedIn={isLoggedIn}
    />
  );
}

export default OrderHistory;
