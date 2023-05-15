const getQuantityWithRatioToBuy = (ratio, currentBalance, price) => {
    const balance = currentBalance * ratio;
    return balance / price;
}

export default getQuantityWithRatioToBuy;
