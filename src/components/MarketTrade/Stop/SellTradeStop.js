import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import ApiContext from "../../../context/ApiContext";
import DataContext from "../../../context/DataContext";
import { urlParser } from '../../../utils/urlParser'
import { calculateTotalPrice, getQuantityWithRatioToSell } from "../../../utils/misc/calculation";


function SellTradeStop(props) {
    const { quote, asset, pair } = urlParser(window.location.href)
    const { sellPrice, setSellPrice } = useContext(DataContext)
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const { user, _onSubmitSell, baseAvailableBalance } = useContext(ApiContext)
    const [sellQuantity, setSellQuantity] = useState(0)
    const [sellTotalPrice, setSellTotalPrice] = useState(0)
    const [sellStopPrice, setSellStopPrice] = useState(0)
    const { showToast, disabled } = props;

    const sellPriceChangeHandler = (event) => {
        const price = event.target.value.replace(",", ".");
        setSellPrice(price)
    }

    const sellStopPriceChangeHandler = (event) => {
        const price = event.target.value.replace(",", ".");
        setSellStopPrice(price)
    }

    const sellAmountChangeHandler = (event) => {
        const quantity = event.target.value.replace(",", ".");
        setSellQuantity(quantity)
    }

    const getRatio = ratio => {
        const quantity = getQuantityWithRatioToSell(ratio, 100);
        setSellQuantity(quantity)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const payload = {
            symbol: pair,
            side: 1,
            //type,
            quantity: sellQuantity,
            price: sellPrice,
            // timeInForce,
            // icebergQty,
            // orderResponseType,
            customerId: user.userId,
            tenantId: user.tenantId
        }

        _onSubmitSell(payload)
    };


    const sellTotalPriceChangeHandler = (event) => {
        const quantity = event.target.value.replace(",", ".");

        if (quantity) {
            setSellQuantity(quantity / sellPrice);
        } else {
            setSellQuantity(quantity)
        }
    }

    useEffect(() => {
        const totalPrice = calculateTotalPrice(sellQuantity, sellPrice)
        setSellTotalPrice(totalPrice)
    }, [sellQuantity, sellPrice])

    return (
        <div className="market-trade-buy">
            <form onSubmit={onSubmitHandler}>
                <p>
                    Available: <span>{baseAvailableBalance} {asset}</span>
                </p>
                <div className="input-group">
                    <input
                        type="number"
                        lang="en"
                        min="0.01"
                        step="0.01"
                        pattern="([0-9]{1,3}).([0-9]{1,3})"
                        className="form-control"
                        placeholder="Spot"
                        name="buy"
                        onChange={sellStopPriceChangeHandler}
                        value={sellStopPrice}
                        required
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{quote}</span>
                    </div>
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        lang="en"
                        min="0.01"
                        step="0.01"
                        pattern="([0-9]{1,3}).([0-9]{1,3})"
                        className="form-control"
                        placeholder="Price (XXXXX.XX)"
                        name="buy"
                        onChange={sellPriceChangeHandler}
                        value={sellPrice}
                        required
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{quote}</span>
                    </div>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Amount (X.XXXXX)"
                        onChange={sellAmountChangeHandler}
                        required
                        value={sellQuantity}
                    />

                    <div className="input-group-append">
                        <span className="input-group-text">{asset}</span>
                    </div>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={sellTotalPrice}
                        onChange={sellTotalPriceChangeHandler}
                    />
                </div>

                <ul className="market-trade-list" style={{ marginBottom: '20px' }}>
                    <li>
                        <a onClick={() => getRatio(0.25)}>25%</a>
                    </li>
                    <li>
                        <a onClick={() => getRatio(0.50)} >50%</a>
                    </li>
                    <li>
                        <a onClick={() => getRatio(0.75)}>75%</a>
                    </li>
                    <li>
                        <a onClick={() => getRatio(1)}>100%</a>
                    </li>
                </ul>
                {
                    isLoggedIn ?
                        <button type="submit" className="btn sell" style={{ margin: "0px" }}>
                            Sell
                        </button> :
                        <button type="button" onClick={showToast} className="btn sell" disabled={disabled} style={{ margin: "0px" }}>
                            Log In or Sign Up
                        </button>
                }
            </form>
        </div>

    )
}

export default SellTradeStop