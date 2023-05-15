import { Container, Row, Col } from 'react-bootstrap'
import { Col as AntCol, Row as AntRow, Tabs as AntTabs, Input } from 'antd'
import cn from "classnames"
import { BasicExchangeAsks, BasicExchangeBids } from '../../components'
import { MarketPairsSocketProvider } from '../../context/MarketPairsSocketContext'

import { BasicLogic } from './BasicLogic'
import { CoinBarLogic } from './CoinBarLogic'
import WholeOrders from './WholeOrders'
import CoinBar from './CoinBar'

const { TabPane } = AntTabs;

function BasicExchange() {

    return (
        <Container className="basic-exchange">
            <AntRow className="basic-exchange-header p-2 mt-2">
                <MarketPairsSocketProvider>
                    <CoinBar />
                </MarketPairsSocketProvider>
            </AntRow>


            <AntRow className="basic-exchange-content">
                <AntCol md={6} xs={24} className='px-2'>
                    <BasicBuySell />
                </AntCol>

                <AntCol md={9} xs={24} className='px-2'>
                    <BasicExchangeAsks />
                </AntCol>

                <AntCol md={9} xs={24} className='px-2'>
                    <BasicExchangeBids />
                </AntCol>
            </AntRow>

            <AntRow className="basic-exchange-table-container px-2">
                <AntCol md={24} xs={24} >
                    <WholeOrders />
                </AntCol>
            </AntRow>


        </Container>
    )
}

export default BasicExchange



function BasicBuySell() {
    return (
        <div className="order-book">
            <AntTabs defaultActiveKey="buy">
                <TabPane tab="Buy" key="buy">
                    <Buy />
                </TabPane>
                <TabPane tab="Sell" key="sell">
                    <Sell />
                </TabPane>
            </AntTabs>
        </div>
    )
}



function Buy() {
    const {
        state: { value },
        changeBtnState,
        isLoggedIn,
        exchangeState,
        handleAmountChange,
        handleTotalPriceChange,
        handlePriceChange,
        handleLimitTotalChange,
    } = BasicLogic()

    // const { quote, asset } = CoinBarLogic();

    //console.log(quote, asset)


    return (
        <div className="px-2">
            <Row className="mb-4">
                <Col md={6} xs={6} className='pr-1'>
                    <button
                        className={cn(["btn-block basic-exchange-button", value === "limit" && "active"])}
                        onClick={() => changeBtnState({ type: "SET_LIMIT", payload: "limit" })}
                    >
                        LIMIT
                    </button>
                </Col>
                <Col md={6} xs={6} className='pl-1'>
                    <button
                        className={cn(["btn-block basic-exchange-button", value === "market" && "active"])}
                        onClick={() => changeBtnState({ type: "SET_MARKET", payload: "market" })}
                    >
                        MARKET
                    </button>
                </Col>
            </Row>
            {
                value === "limit" ?
                    <Row className="mb-3">
                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Price"
                                size="middle"
                                type="number"
                                prefix="Price:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.price === 0 ? "" : exchangeState.price}
                                onChange={(e) => handlePriceChange(e.target.value)}
                            />
                        </Col>

                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Amount"
                                size="middle"
                                type="number"
                                prefix="Amount:"
                                suffix={exchangeState.pair.asset}
                                value={exchangeState.amount === 0 ? "" : exchangeState.amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                            />
                        </Col>

                        <Col md={12}>
                            <Input
                                placeholder="Total"
                                size="middle"
                                type="number"
                                prefix="Total:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.total === 0 ? "" : exchangeState.total}
                                onChange={(e) => handleLimitTotalChange(e.target.value)}
                            />
                        </Col>
                    </Row> :
                    <Row className="mb-3">
                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Market price"
                                size="middle"
                                type="number"
                                prefix="Price:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.marketPrice === 0 ? "" : exchangeState.marketPrice}
                                disabled
                            />
                        </Col>

                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Estimated amount"
                                size="middle"
                                type="number"
                                prefix="Amount:"
                                suffix={exchangeState.pair.asset}
                                value={exchangeState.estimatedAmount === 0 ? "" : exchangeState.estimatedAmount}
                                disabled
                            />
                        </Col>

                        <Col md={12}>
                            <Input
                                placeholder="Total"
                                size="middle"
                                type="number"
                                prefix="Total:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.marketTotal === 0 ? "" : exchangeState.marketTotal}
                                onChange={(e) => handleTotalPriceChange(e.target.value)}
                            />
                        </Col>
                    </Row>
            }

            <Row>
                <Col md={12}>
                    {isLoggedIn ? (
                        <button
                            type="button"
                            className="btn buy"
                        //disabled={Object.keys(choosed).length <= 0 && true}
                        //onClick={() => history.push("/login")}
                        >
                            BUY
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn buy"
                        //disabled={Object.keys(choosed).length <= 0 && true}
                        //onClick={() => history.push("/login")}
                        >
                            LOGIN OR SIGNUP
                        </button>
                    )}

                </Col>
            </Row>
        </div>
    )
}

function Sell() {
    const { state: { value }, changeBtnState, isLoggedIn, exchangeState, handleAmountChange, handleTotalPriceChange, handlePriceChange, handleLimitTotalChange } = BasicLogic()

    return (
        <div className="px-2">
            <Row className="mb-4">
                <Col md={6} xs={6} className='pr-1'>
                    <button
                        className={cn([" btn-block basic-exchange-button", value === "limit" && "active"])}
                        onClick={() => changeBtnState({ type: "SET_LIMIT", payload: "limit" })}
                    >
                        LIMIT
                    </button>
                </Col>
                <Col md={6} xs={6} className='pl-1'>
                    <button
                        className={cn(["btn-block basic-exchange-button", value === "market" && "active"])}
                        onClick={() => changeBtnState({ type: "SET_MARKET", payload: "market" })}
                    >
                        MARKET
                    </button>
                </Col>
            </Row>

            {
                value === "limit" ?
                    <Row className="mb-3">
                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Price"
                                size="middle"
                                type="number"
                                prefix="Price:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.price === 0 ? "" : exchangeState.price}
                                onChange={(e) => handlePriceChange(e.target.value)}
                            />
                        </Col>

                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Amount"
                                size="middle"
                                type="number"
                                prefix="Amount:"
                                suffix={exchangeState.pair.asset}
                                value={exchangeState.amount === 0 ? "" : exchangeState.amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                            />
                        </Col>

                        <Col md={12}>
                            <Input
                                placeholder="Total"
                                size="middle"
                                type="number"
                                prefix="Total:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.total === 0 ? "" : exchangeState.total}
                                onChange={(e) => handleLimitTotalChange(e.target.value)}
                            />
                        </Col>
                    </Row> :
                    <Row className="mb-3">
                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Market price"
                                size="middle"
                                type="number"
                                prefix="Price:"
                                suffix={exchangeState.pair.quote}
                                value={exchangeState.marketPrice === 0 ? "" : exchangeState.marketPrice}
                                disabled
                            />
                        </Col>

                        <Col md={12} className="mb-3">
                            <Input
                                placeholder="Estimated amount"
                                size="middle"
                                type="number"
                                prefix="Amount:"
                                suffix={exchangeState.pair.asset}
                                value={exchangeState.estimatedAmount === 0 ? "" : exchangeState.estimatedAmount}
                                disabled
                            />
                        </Col>

                        <Col md={12}>
                            <Input
                                placeholder="Total"
                                size="middle"
                                type="number"
                                prefix="Total:"
                                suffix="USDT"
                                value={exchangeState.marketTotal === 0 ? "" : exchangeState.marketTotal}
                                onChange={(e) => handleTotalPriceChange(e.target.value)}
                            />
                        </Col>
                    </Row>
            }

            <Row>
                <Col md={12}>
                    {isLoggedIn ? (
                        <button
                            type="button"
                            className="btn sell"
                        //disabled={Object.keys(choosed).length <= 0 && true}
                        //onClick={() => history.push("/login")}
                        >
                            BUY
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn sell"
                        //disabled={Object.keys(choosed).length <= 0 && true}
                        //onClick={() => history.push("/login")}
                        >
                            LOGIN OR SIGNUP
                        </button>
                    )}

                </Col>
            </Row>
        </div>
    )
}


