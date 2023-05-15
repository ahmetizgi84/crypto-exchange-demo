import BuyTradeStop from "./BuyTradeStop";
import SellTradeStop from "./SellTradeStop";
import { Row, Col } from 'react-bootstrap'
import {urlParser} from "../../../utils/urlParser";

function LimitStop(props) {
    const { showToast, disabled } = props;
    const { quote, asset, pair } = urlParser(window.location.href)

    return (
        <div className="p-2">
            <Row >
                <Col md={6}>
                    <BuyTradeStop
                        showToast={showToast}
                        disabled={disabled}
                        quote={quote}
                        asset={asset}
                        pair={pair}
                    />
                </Col>

                <Col md={6}>
                    <SellTradeStop
                        showToast={showToast}
                        disabled={disabled}
                        quote={quote}
                        asset={asset}
                        pair={pair}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default LimitStop;