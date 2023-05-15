import { useState, useContext, useEffect } from "react";
import ApiContext from "../../context/ApiContext";
import { Col, Row } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";

const colors = ["#E38627", "#C13C37", "#6A2135"];

function BalanceDetails() {
  const { _getAccountList, accountList, _getCurrentPrice } = useContext(ApiContext);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [wholeBalances, setWholeBalances] = useState([]);
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const [totalBtcBalance, setTotalBtcBalance] = useState(0);

  useEffect(() => {
    _getAccountList();
  }, []);

  useEffect(() => {
    if (accountList && accountList.length > 0) {
      setTotalUsdBalance(0);
      calculateUsdBalance();
    }
  }, [accountList]);

  function calculateUsdBalance() {
    let total = 0;
    let tempList = [...accountList];
    tempList.map(async (item) => {
      if (item.coin === "BTC") {
        const btcPrice = await _getCurrentPrice();
        total += item.totalBalance * btcPrice;
      }
      const usdPrice = await _getCurrentPrice("USDTTRY");
      total += item.totalBalance * usdPrice;
      // console.log("total: ", total);
      setTotalUsdBalance(total.toFixed(3));
    });
  }

  useEffect(() => {
    if (totalUsdBalance > 0) {
      setTotalBtcBalance(0);
      calculateBtcBalance();
    }
  }, [totalUsdBalance]);

  async function calculateBtcBalance() {
    const btcPrice = await _getCurrentPrice();
    const btcBalance = (totalUsdBalance / btcPrice).toFixed(8);
    setTotalBtcBalance(btcBalance);
  }

  useEffect(() => {
    if (accountList && accountList.length > 0) {
      let tempList = [...accountList];
      tempList.map((item, idx) => {
        if (item.coin === "BTC") {
        }
        item.title = item.coin;
        item.value = item.totalBalance;
        item.color = colors[idx];
      });
      setWholeBalances(tempList);
    } else {
      setWholeBalances([{ title: "No Available Balance", value: 100, color: "#ddd" }]);
    }
  }, [accountList]);

  const data = wholeBalances.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "grey",
      };
    }
    return entry;
  });

  const shiftSize = 6;
  const lineWidth = 60;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-2">Balance Details</h5>
        <Row style={{ marginBottom: 40 }}>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <div className="text-muted">Account Balance:</div>
                <span className="balance-title">{totalBtcBalance} </span>
                <label>BTC</label>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={12}>
                <div className="text-muted">Estimated Value:</div>
                <span className="balance-value">≅ ${totalUsdBalance}</span>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <PieChart
              data={data}
              radius={PieChart.defaultProps.radius - shiftSize}
              segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
              segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
              segmentsShift={(index) => (index === selected ? 6 : 1)}
              animate
              style={{ height: "180px" }}
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
              labelPosition={100 - lineWidth / 2}
              labelStyle={{
                fontSize: "10px",
                fill: "#fff",
                opacity: 0.75,
                pointerEvents: "none",
              }}
              onClick={(_, index) => {
                setSelected(index === selected ? undefined : index);
              }}
              onMouseOver={(_, index) => {
                setHovered(index);
              }}
              onMouseOut={() => {
                setHovered(null);
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BalanceDetails;
