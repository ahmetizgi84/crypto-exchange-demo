import { Row, Col } from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";
import { currencyFormatter } from "../../helper/currencyFormatter";
import cn from "classnames";
import millify from "millify";

function CoinBar({ choosed = {}, defaultOptions, className }) {
  return (
    <Col md={12}>
      <Row>
        <Col md={2} xs={6}>
          {Object.keys(choosed).length <= 0 ? (
            <QuestionCircleFill color="gray" size={22} />
          ) : (
            <img src={choosed?.image} alt="coin" style={{ width: "22px", height: "22px", textAlign: "center" }} />
          )}
          <div className="balance-value asset">
            {(choosed?.baseAsset || "N/A ") + "/" + (choosed?.quoteAsset || " N/A")}
          </div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Last Price</span>
          <div className={cn(["spacer", className])}>
            {currencyFormatter(choosed?.lastPrice, defaultOptions) || "N/A"}
          </div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Change</span>
          <div className={cn([className, "spacer"])}>{choosed?.priceChangePercent || "N/A"}%</div>{" "}
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">High</span>
          <div className="balance-value spacer">{currencyFormatter(choosed?.highPrice, defaultOptions) || "N/A"}</div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Low</span>
          <div className="balance-value spacer">{currencyFormatter(choosed?.lowPrice, defaultOptions) || "N/A"}</div>
        </Col>

        <Col md={2} xs={6}>
          <span className="text-muted">Volume</span>
          <div className="balance-value spacer">{millify(choosed?.quoteVolume || 0) || "N/A"}</div>
        </Col>
      </Row>
    </Col>
  );
}

export default CoinBar;
