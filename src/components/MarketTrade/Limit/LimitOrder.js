import BuyTradeOrder from "./BuyTradeOrder";
import SellTradeOrder from "./SellTradeOrder";
import { Row, Col } from 'react-bootstrap'
import {urlParser} from "../../../utils/urlParser";

function LimitOrder(props) {
    const { quote, asset, pair } = urlParser(window.location.href)
    const { showToast, disabled } = props;
    return (
        <div className="p-2 pb-4">
            <Row>
                <Col md={6}>
                    <BuyTradeOrder
                        showToast={showToast}
                        disabled={disabled}
                        quote={quote}
                        asset={asset}
                        pair={pair}
                    />

                </Col>

                <Col md={6}>
                    <SellTradeOrder
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

export default LimitOrder;