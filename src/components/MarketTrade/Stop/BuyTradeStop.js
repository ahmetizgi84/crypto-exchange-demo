import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import ApiContext from "../../../context/ApiContext";
import DataContext from "../../../context/DataContext";
import { urlParser } from '../../../utils/urlParser'
import { calculateTotalPrice, getQuantityWithRatioToBuy } from "../../../utils/misc/calculation";

function BuyTradeStop(props) {
    const { buyPrice, setBuyPrice } = useContext(DataContext)
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const { user, _onSubmitBuy,quoteAvailableBalance } = useContext(ApiContext)
    const [buyQuantity, setBuyQuantity] = useState(0)
    const [buyTotalPrice, setBuyTotalPrice] = useState(0)
    const [buyStopPrice, setBuyStopPrice] = useState(0)
    const { showToast, disabled, quote, asset, pair } = props

    const priceChangeHandler = (event) => {
        const price = event.target.value.replace(",", ".");
        setBuyPrice(price)
    }

    const buyAmountChangeHandler = (event) => {
        const quantity = event.target.value.replace(",", ".");
        setBuyQuantity(quantity)
    }

    const buyTotalPriceChangeHandler = (event) => {
        const quantity = event.target.value.replace(",", ".");

        if (quantity) {
            setBuyQuantity(quantity / buyPrice);
        } else {
            setBuyQuantity(quantity)
        }
    }

    const getRatio = ratio => {
        const currentBalance = 100;

        const quantity = getQuantityWithRatioToBuy(ratio, currentBalance, buyPrice);
        setBuyQuantity(quantity);
    }

    useEffect(() => {
        const totalPrice = calculateTotalPrice(buyQuantity, buyPrice);
        setBuyTotalPrice(totalPrice)

    }, [buyQuantity, buyPrice])

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (user) {
            const payload = {
                symbol: pair,
                side: 0,
                type: 'limit',
                quantity: buyQuantity,
                price: buyPrice,
                // timeInForce,
                // icebergQty,
                // orderResponseType,
                customerId: user.userId,
                tenantId: user.tenantId
            }

            _onSubmitBuy(payload)
        }
    };

    const stopPriceChangeHandler = (event) => {
        const price = event.target.value.replace(",", ".");
        setBuyStopPrice(price)
    };

    return (
        <div className="market-trade-buy">
            <form onSubmit={onSubmitHandler}>
                <p>
                    Available: <span>{quoteAvailableBalance} {quote}</span>
                </p>
                <div className="input-group">
                    <input
                        type="number"
                        lang="en"
                        className="form-control"
                        placeholder="Stop"
                        name="stop"
                        onChange={stopPriceChangeHandler}
                        value={buyStopPrice}
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
                        className="form-control"
                        placeholder="Price (XXXXX.XX)"
                        name="buy"
                        onChange={priceChangeHandler}
                        value={buyPrice}
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
                        onChange={buyAmountChangeHandler}
                        required
                        value={buyQuantity}
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
                        onChange={buyTotalPriceChangeHandler}
                        value={buyTotalPrice}
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
                        <button type="submit" className="btn buy" style={{ margin: "0px" }}>
                            Buy
                        </button> :
                        <button type="button" onClick={showToast} className="btn buy" disabled={disabled} style={{ margin: "0px" }}>
                            Log In or Sign Up
                        </button>
                }
            </form>
        </div>

    )
}

export default BuyTradeStop