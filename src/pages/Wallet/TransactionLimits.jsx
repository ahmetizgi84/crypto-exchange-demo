import { useEffect, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { WoynexTable } from "../../components";
import styles from "./Wallet.module.css";
import cn from "classnames";
import { currencyFormatter } from "../../helper/currencyFormatter";

function TransactionLimits() {
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);
  const { _getTierLimitList, tierLimitList, loading } = useContext(ApiContext);

  useEffect(() => {
    _getTierLimitList();
  }, []);

  const columns = [
    {
      title: "Period",
      dataIndex: "period",
      render: (period) => period + " Days",
      key: "period",
    },
    {
      title: "Amount Per Transactions",
      dataIndex: "amountPerTrx",
      key: "amountPerTrx",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (totalAmount) => currencyFormatter(totalAmount),
      key: "totalAmount",
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Transaction Limits</h5>
        <div className={cn([styles.li, styles.btn, "wallet-Limits"])}>
          <WoynexTable
            columns={columns}
            list={tierLimitList}
            size="small"
            //onChange={handleTableChange}
            rowKey={(record) => record.id}
            pageSize={8}
            loading={loading}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionLimits;
