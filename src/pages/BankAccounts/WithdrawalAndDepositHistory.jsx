import { useContext, useEffect } from "react";
import { Tabs as AntTabs } from "antd";
import { WoynexTable } from "../../components";
import { Context as AuthContext } from "../../context/AuthContext";
import { getHumanDate } from "../../utils/misc/date";
import { StatusTypes } from "../constants";
import ApiContext from "../../context/ApiContext";

const { TabPane } = AntTabs;

function WithdrawAndDepositHistory() {
  const { _getFiatTransaction, fiatTransaction, loading, user } = useContext(ApiContext);
  const withdrawal = 1;
  const deposit = 2;
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);

  useEffect(() => {
    const payload = {
      criteria: {
        status: 1,
        tenantId: user.tenantId,
        createdUserId: user.userId,
      }
    };
    _getFiatTransaction(payload);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-2 mr-3">History</h5>
        <AntTabs defaultActiveKey="withdraw">
          <TabPane tab="Withdrawal History" key="withdraw">
            <WithdrawHistory fiatTransaction={ fiatTransaction.filter(transaction => transaction.side==withdrawal) } isLoggedIn={ isLoggedIn } loading={ loading } />
          </TabPane>

          <TabPane tab="Deposit History" key="deposit">
            <DepositHistory fiatTransaction={ fiatTransaction.filter(transaction => transaction.side==deposit) } isLoggedIn={ isLoggedIn } loading={ loading } />
          </TabPane>
        </AntTabs>
      </div>
    </div>
  );
}

export default WithdrawAndDepositHistory;

function WithdrawHistory(props) {
const { fiatTransaction, isLoggedIn, loading } = props;
  const columns = [
    {
      title: "Currency",
      dataIndex: "symbol",
      sorter: true,
      key: "symbol",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      key: "status",
      render: (status) => getStatus(status),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Bank",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "IBAN",
      dataIndex: "iban",
      key: "iban",
    },
    {
      title: "Date",
      dataIndex: "transferDate",
      render: (transferDate) => getHumanDate(transferDate),
      key: "transferDate",
    },
  ];

  const getStatus = (status) => {
    return StatusTypes.find(statusType => statusType.key == status).value;
  };

  return (
    <WoynexTable
      columns={ columns }
      list={ fiatTransaction }
      size="small"
      rowKey={(record) => record.id}
      pageSize={8}
      loading={ loading }
      isLoggedIn={ isLoggedIn }
    />
  );
}

function DepositHistory(props) {
  const { fiatTransaction, isLoggedIn, loading } = props;

  const getStatus = (status) => {
    return StatusTypes.find(statusType => statusType.key == status).value;
  };

  const columns = [
    {
      title: "Currency",
      dataIndex: "symbol",
      sorter: true,
      key: "symbol",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      key: "status",
      render: (status) => getStatus(status),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "transferDate",
      key: "transferDate",
      render: (transferDate) => getHumanDate(transferDate),
    },
  ];

  return (
    <WoynexTable
      columns={columns}
      list={ fiatTransaction }
      size="small"
      rowKey={(record) => record.id}
      pageSize={8}
      loading={ loading }
      isLoggedIn={ isLoggedIn }
    />
  );
}
