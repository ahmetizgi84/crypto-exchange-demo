

export const urlParser = (url = "BTCUSDT_BTC_USDT") => {

    const where = url.split("/").slice(-2)[0]

    if (where === "pro" || where === "basic" || where === "fast") {
        const firstSplit = url.split("/").slice(-1)[0]
        const secondSplit = firstSplit.split("_")

        return {
            pair: secondSplit[0],
            asset: secondSplit[1],
            quote: secondSplit[2]
        }
    }

    return {
        pair: "BTCUSDT",
        asset: "BTC",
        quote: "USDT"
    }

}

export default urlParser



