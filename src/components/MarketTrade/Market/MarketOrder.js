import BuyTradeMarket from "./BuyTradeMarket";
import SellTradeMarket from "./SellTradeMarket";
import { Row, Col } from 'react-bootstrap'
import {urlParser} from "../../../utils/urlParser";


function MarketOrder(props) {
    const { showToast, disabled } = props;
    const { quote, asset, pair } = urlParser(window.location.href)

    return (
        <div className="p-2 pb-4">
            <Row>
                <Col md={6}>
                    <BuyTradeMarket
                        showToast={showToast}
                        disabled={disabled}
                        quote={quote}
                        asset={asset}
                        pair={pair}
                    />
                </Col>

                <Col md={6}>
                    <SellTradeMarket
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

export default MarketOrder;