import { useState } from "react";
import { useHistory } from 'react-router-dom'
import { Tabs as AntTabs } from "antd";
import { makeToast } from "../../utils/makeToast";
import LimitOrder from "./Limit/LimitOrder";
import MarketOrder from "./Market/MarketOrder";
import LimitStop from "./Stop/LimitStop";

const { TabPane } = AntTabs;

function MarketTrade() {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false)

  /**
   *
   * check for market filters
   filters: [
   {filterType: 'PRICE_FILTER', maxPrice: 1000000, minPrice: 0.01, tickSize: 0.01}
   {filterType: 'PERCENT_PRICE', multiplierUp: 5, multiplierDown: 0.2, avgPriceMins: 5}
   {filterType: 'LOT_SIZE', maxQty: 9000, minQty: 0.00001, stepSize: 0.00001}
   {filterType: 'MIN_NOTIONAL', minNotional: 10, applyToMarket: true, avgPriceMins: 5}
   {filterType: 'ICEBERG_PARTS', limit: 10}
   {filterType: 'MARKET_LOT_SIZE', maxQty: 110.18157013, minQty: 0, stepSize: 0}
   {filterType: 'MAX_NUM_ORDERS', maxNumOrders: 200}
   {filterType: 'MAX_NUM_ALGO_ORDERS', maxNumAlgoOrders: 5}
   ]

   check for permissions
   permissions: [
   "SPOT"
   "MARGIN"
   ]
   */

  const showToast = () => {
    setDisabled(true)
    makeToast("error", "Lütfen önce giriş yapınız.")
    setTimeout(() => {
      setDisabled(false)
      history.push('/login')
    }, 3200);
  }

  return (
      <>
        <div className="market-trade">
          <AntTabs defaultActiveKey="limit" >
            <TabPane tab="Limit" key="limit">
              <LimitOrder
                  showToast={ showToast }
                  disabled={ disabled }
              />
            </TabPane>
            <TabPane tab="Market" key="market">
              <MarketOrder
                  showToast={ showToast }
                  disabled={ disabled }
              />
            </TabPane>
            <TabPane tab="Stop" key="stop">
              <LimitStop
                  showToast={ showToast }
                  disabled={ disabled }
              />
            </TabPane>
          </AntTabs>
        </div>
      </>
  )
}

export default MarketTrade;