import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { urlParser } from '../utils/urlParser'


export default function TradingChart() {
  const { pair } = urlParser(window.location.href)

  return (
    <div className="main-chart mb15">
      <TradingViewWidget
        symbol={`BINANCE:${pair}`}
        theme={Themes.DARK}
        locale="en"
        autosize
      />
    </div>
  );
}
