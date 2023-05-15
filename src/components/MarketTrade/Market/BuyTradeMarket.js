import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import ApiContext from "../../../context/ApiContext";
import DataContext from "../../../context/DataContext";
import { calculateTotalPrice, getQuantityWithRatioToBuy } from "../../../utils/misc/calculation";

function BuyTradeMarket(props) {
    const { buyPrice } = useContext(DataContext)
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const { user, _onSubmitBuy, quoteAvailableBalance } = useContext(ApiContext)
    const [buyAmount, setBuyAmount] = useState(0)
    const [buyTotalPrice, setBuyTotalPrice] = useState(0)
    const { showToast, disabled, quote, pair } = props;
    const buyTotalPriceChangeHandler = (event) => {
        const amount = event.target.value.replace(",", ".");

        if(amount) {
            setBuyAmount(amount / buyPrice);
        } else {
            setBuyAmount(amount)
        }
    }

    const getRatio = ratio => {
        const amount = getQuantityWithRatioToBuy(ratio, quoteAvailableBalance, buyPrice)
        setBuyAmount(amount)
    }

    useEffect(() => {
        const totalPrice = calculateTotalPrice(buyAmount, buyPrice)
        setBuyTotalPrice(totalPrice);
    }, [buyAmount, buyPrice])


    const onSubmitHandler = (event) => {
        event.preventDefault();
        const payload = {
            symbol: pair,
            side: 0,
            // type,
            quantity: buyAmount,
            price: buyPrice,
            // timeInForce,
            // icebergQty,
            // orderResponseType,
            customerId: user.userId,
            tenantId: user.tenantId
        }

        _onSubmitBuy(payload)

    };

    return (
        <div className="market-trade-buy">
            <form onSubmit={ onSubmitHandler }>
                <p>
                    Available: <span> {quoteAvailableBalance} {quote}</span>
                </p>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={ buyTotalPriceChangeHandler }
                        value={ buyTotalPrice }
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{quote}</span>
                    </div>
                </div>

                <ul className="market-trade-list">
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
                        <button type="submit" className="btn buy">
                            Buy
                        </button> :
                        <button type="button" onClick={showToast} className="btn buy" disabled={disabled}>
                            Log In or Sign Up
                        </button>
                }
            </form>
        </div>

    )
}

export default BuyTradeMarket