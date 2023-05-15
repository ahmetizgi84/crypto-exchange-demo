import { Tabs as AntTabs } from "antd";
import { RecentTradesSocketProvider } from "../../context/RecentTradesSocketContext";
import { WholeOrdersLogic } from "./WholeOrdersLogic";
import OpenOrders from "./OpenOrders";
import OrderHistory from "./OrderHistory";
import RecentTrades from "./RecentTrades";

const { TabPane } = AntTabs;

function HistoryOrder() {
  WholeOrdersLogic();

  return (
    <>
      <div className="history-order">
        {/* <AntTabs defaultActiveKey="open-orders"> */}
        <AntTabs defaultActiveKey="recent-trades">
          <TabPane tab="Open Orders" key="open-orders">
            <OpenOrders />
          </TabPane>

          <TabPane tab="Order history" key="order-history">
            <OrderHistory />
          </TabPane>

          <TabPane tab="Recent Trades" key="recent-trades">
            <RecentTradesSocketProvider>
              <RecentTrades />
            </RecentTradesSocketProvider>
          </TabPane>
        </AntTabs>
      </div>
    </>
  );
}

export default HistoryOrder;
