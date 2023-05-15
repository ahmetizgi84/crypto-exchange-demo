import { useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
// import OrderBookSocketContext from "../../context/OrderBookSocketContext";
import { OrderBookSocketProvider } from "../../context/OrderBookSocketContext";
import ThemeContext from "../../context/ThemeContext";
import processData from "../../utils/depthChartDataProcessor";
import depthChartBids from "../../mocks/orderBookBidsData.json";
import depthChartAsks from "../../mocks/orderBookAsksData.json";

exporting(Highcharts);

// bids sıralaması - yeşil
// price -> küçükten büyüğe
// quantity -> küçükten büyüğe

// asks sıralaması - kırmızı
// price -> küçükten büyüğe
// quantity -> büyükten küçüğe

// ask price artıp bittiği yerden (56130.40) bids price artarak devam ediyor
// ask quantity azalıp bittiği yerden (0.0015) bids quantity artarak devam ediyor

const DepthChart = () => {
  return (
    <OrderBookSocketProvider>
      <Chart />
    </OrderBookSocketProvider>
  );
};

export default DepthChart;

function Chart() {
  // const { depthChartAsks, depthChartBids } = useContext(OrderBookSocketContext)
  const { theme } = useContext(ThemeContext);

  let options = {
    chart: {
      type: "area",
      zoomType: "xy",
      backgroundColor: theme === "light" ? "#fff" : "#131722",
    },
    title: {
      text: null,
    },
    xAxis: {
      visible: true,
      gridLineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      plotLines: [
        {
          color: "#888",
          // value: 56.743,
          width: 1,
          label: {
            text: "Actual price",
            rotation: 90,
          },
        },
      ],
      title: {
        text: "Price",
      },
    },
    yAxis: [
      {
        visible: true,
        // lineWidth: 1,
        gridLineWidth: 0,
        // gridLineColor: 'transparent',
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        labels: {
          align: "left",
          x: 8,
        },
      },
      {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        labels: {
          align: "right",
          x: -8,
        },
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillOpacity: 0.2,
        lineWidth: 1,
        step: "center",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
      valueDecimals: 2,
    },
    series: [
      {
        name: "Bids",
        data: processData(depthChartBids, true),
        color: "#26de8163", // yeşil alan - bids
        lineWidth: 2,
      },
      {
        name: "Asks",
        data: processData(depthChartAsks, false),
        color: "#de262663", // kırmızı alan - asks
        lineWidth: 2,
      },
    ],
  };
  return (
    <div className="market-news mt15">
      <h2 className="heading">Depth Chart</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
