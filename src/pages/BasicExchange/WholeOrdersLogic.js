import { useEffect, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { urlParser } from "../../utils/urlParser";

function WholeOrdersLogic() {
    const { pair } = urlParser(window.location.href);
    const { _fetchOpenOrders, _fetchOrderHistory, _getOrderHistory } = useContext(ApiContext);

    useEffect(() => {
        if (pair) {
            const params = {
                symbol: pair,
            };

            const payload = {
                criteria: {},
            };

            _fetchOpenOrders(params);
            _fetchOrderHistory(params);
            _getOrderHistory(payload);
        }
    }, [pair]);


    return null
}


function OrderHistoryLogic() {
    const { state: { isLoggedIn } } = useContext(AuthContext);
    const { loading, orderHistoryList, setOrderHistoryList } = useContext(ApiContext);

    return {
        isLoggedIn,
        loading,
        orderHistoryList,
        setOrderHistoryList
    }
}




function OpenOrdersLogic() {
    const { state: { isLoggedIn } } = useContext(AuthContext);
    const { loading, openOrders, setOpenOrders, _cancelAnOpenOrder } = useContext(ApiContext);

    const cancelOrderHandler = (order) => {
        const payload = {
            symbol: order.symbol,
            origClientOrderId: order.clientOrderId,
            orderId: order.orderId,
        };
        _cancelAnOpenOrder(payload);
    };

    return {
        isLoggedIn,
        loading,
        cancelOrderHandler,
        openOrders,
        setOpenOrders,
    }
}

export { WholeOrdersLogic, OrderHistoryLogic, OpenOrdersLogic }
