import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import ApiContext from "../../../context/ApiContext";
import DataContext from "../../../context/DataContext";
import { getQuantityWithRatioToSell} from "../../../utils/misc/calculation";

function SellTradeMarket(props) {
    const { sellPrice } = useContext(DataContext)
    const { state: { isLoggedIn } } = useContext(AuthContext)
    const { user, _onSubmitSell, baseAvailableBalance } = useContext(ApiContext)
    const [sellQuantity, setSellQuantity] = useState(0)
    const [sellTotalPrice, setSellTotalPrice] = useState(0)
    const { showToast, disabled, asset, pair  } = props;

    const sellTotalPriceChangeHandler = (event) => {
        const amount = event.target.value.replace(",", ".");

        if(amount) {
            setSellQuantity(amount / sellPrice);
        } else {
            setSellQuantity(amount)
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const payload = {
            symbol: pair,
            side: 0,
           // type,
            quantity: setSellQuantity,
            price: sellPrice,
            // timeInForce,
            // icebergQty,
            // orderResponseType,
            customerId: user.userId,
            tenantId: user.tenantId
        }

        _onSubmitSell(payload)

    };

    const getRatio = ratio => {
        const quantity = getQuantityWithRatioToSell(ratio, baseAvailableBalance);
        setSellTotalPrice(quantity)
    }


    return (
        <div className="market-trade-sell">
            <form onSubmit={ onSubmitHandler }>
                <p>
                    Available: <span>{baseAvailableBalance} {asset}</span>
                </p>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={ sellTotalPriceChangeHandler }
                        value={ sellTotalPrice }
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{asset}</span>
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
                        <button type="submit" className="btn sell">
                            Sell
                        </button> :
                        <button type="button" onClick={ showToast } className="btn sell" disabled={disabled}>
                            Log In or Sign Up
                        </button>
                }
            </form>
        </div>

    )
}

export default SellTradeMarket;