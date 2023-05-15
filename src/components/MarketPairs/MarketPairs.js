import { useState, useContext, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import constants from '../../common/constants';
import { MarketPairsSocketProvider } from '../../context/MarketPairsSocketContext';
import MarketPairsSocketContext from '../../context/MarketPairsSocketContext';
import DataContext from '../../context/DataContext';
import ApiContext from '../../context/ApiContext';
import { Context as AuthContext } from '../../context/AuthContext';
import _ from 'lodash';
import SkeletonMarketList from '../Skeletons/SkeletonMarketList';
import { urlParser } from '../../utils/urlParser';
import { Spinner } from 'react-bootstrap';
import marketPairsData from '../../mocks/marketPairsData.json';
//import { List } from "react-virtualized";

function MarketPairs() {
  return (
    <MarketPairsSocketProvider>
      <MarketPairsChild />
    </MarketPairsSocketProvider>
  );
}

export default MarketPairs;

function MarketPairsChild() {
  //const { setMarket } = useContext(DataContext)
  const { data, loading } = useContext(MarketPairsSocketContext);

  //const {pair} = urlParser(window.location.href)
  const [marketListData, setMarketListData] = useState(marketPairsData);
  const [filterText, setFilterText] = useState('');
  const [tabKey, setTabKey] = useState('');

  // useEffect(() => {
  //   const initialPair = data?.find(mrkt => mrkt.symbol === pair) || {}
  //   setMarket(initialPair)
  // }, [data])

  const tabKeys = [
    { key: 'FAVORITE', title: <StarFill color="var(--c-footerlinkcolor)" size={14} /> },
    { key: 'ALL', title: 'ALL' },
    { key: 'BTC', title: 'BTC' },
    { key: 'USDT', title: 'USDT' },
    { key: 'TRY', title: 'TRY' }
  ];

  const handleTabSelect = key => {
    let tempText = '';
    switch (key) {
      case 'ALL':
        tempText = '';
        setFilterText(tempText);
        break;
      case 'BTC':
        tempText = 'BTC';
        setFilterText(tempText);
        break;
      case 'USDT':
        tempText = 'USDT';
        setFilterText(tempText);
        break;
      case 'TRY':
        tempText = 'TRY';
        setFilterText(tempText);
        break;
      case 'FAVORITE':
        setFilterText('');
        break;
      default:
        break;
    }
    setTabKey(key);
  };

  const handleChange = event => {
    let filtertext = event.target.value;
    filtertext = filtertext ? filtertext.toUpperCase() : '';
    setFilterText(filtertext);
  };

  // useEffect(() => {
  //   filterPairs(filterText, tabKey);
  // }, [filterText, tabKey, data]);

  function filterPairs(filterText, tabKey) {
    if (tabKey === 'FAVORITE') {
      const favoriteList = data.filter(market => market.isFavorite);
      setMarketListData(favoriteList);
    } else {
      let filteredData = _.filter(data, item => {
        return item.symbol.includes(filterText);
      });

      let sortedData = filteredData.sort((a, b) => (a.symbol > b.symbol ? 1 : -1));
      setMarketListData(sortedData);
    }
  }

  /**
   *
   * strict mode error:
   * This is an error probably from a library (React-Bootstrap) we are using to say that the ReactDOM.findDOMNode
   * function is now deprecated but it still works (it may be removed in the future).
   * In StrictMode, the error will show up but it is not advisable to remove StrictMode
   * because of the error!
   * It is better to ignore this error or reach out to the library causing this by reporting the issue.
   *
   * https://github.com/react-bootstrap/react-bootstrap/issues/3518
   */

  /**
   * @TODO
   * Large List olduğunda hali hazırda kullanılan table yapısını
   *  performansı artırmak için react-virtualized yapısına geçecek.
   */

  /*
  const renderItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    return (
      <tr
        key={key}
        style={style}
      //onClick={() => trclick(item)}
      >
        <td>
          <i className="icon ion-md-star"></i>{" "}
          {marketListData[index].symbol || marketListData[index].s}
        </td>
        <td
          className={renderChangeColor(
            (marketListData[index].lastPrice || 0).toFixed(2)
          )}
        >
          {marketListData[index].lastPrice || "N/A"}
        </td>
        <td
          className={renderChangeColor(
            (marketListData[index].priceChangePercent || 0).toFixed(2)
          )}
        >
          {(marketListData[index].priceChangePercent || 0).toFixed(2)}%
        </td>
      </tr>
    )
  }

    <List
        width={460}
        height={900}
        rowCount={marketListData.length}
        rowHeight={36}
        rowRenderer={renderItem}
      /> 
  */

  return (
    <div className="market-pairs">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            <i className="icon ion-md-search"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-describedby="inputGroup-sizing-sm"
          onChange={handleChange}
          value={filterText}
        />
      </div>
      <Tabs defaultActiveKey="ALL" onSelect={key => handleTabSelect(key)}>
        {tabKeys.map(tab => (
          <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
            {marketListData === null || loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(n => (
                <SkeletonMarketList key={n} />
              ))
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '50%' }}>Pair</th>
                    <th style={{ width: '25%' }}>Last Price</th>
                    <th style={{ width: '25%' }}>Change%</th>
                    <th style={{ width: '10%' }}>
                      <StarFill color="var(--c-footerlinkcolor)" size={14} />
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketListData === null ? (
                    <tr>
                      <td colSpan="3">
                        <Spinner animation="border" />
                      </td>
                    </tr>
                  ) : marketListData.length === 0 ? (
                    <tr>
                      <td colSpan="3">No data found</td>
                    </tr>
                  ) : (
                    marketListData.length > 0 && <Rows rowData={marketListData} />
                  )}
                </tbody>
              </table>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

function Rows({ rowData }) {
  const { pair } = urlParser(window.location.href);
  const {
    state: { isLoggedIn }
  } = useContext(AuthContext);
  const { allPairsList } = useContext(MarketPairsSocketContext);
  const { favorites, user, _addUserPairFavorite, _getBaseAssetAvailableBalance, _getQuoteAssetAvailableBalance } =
    useContext(ApiContext);
  const { setPair, setMarket, setBuyPrice, setSellPrice, market } = useContext(DataContext);

  useEffect(() => {
    const initialPair = rowData.find(mrkt => mrkt.symbol === pair) || {};
    setMarket(initialPair);
    setBuyPrice(initialPair.lastPrice);
    setSellPrice(initialPair.lastPrice);

    if (user) {
      _getBaseAssetAvailableBalance({
        userId: user.userId,
        tenantId: user.tenantId,
        coin: initialPair.baseAsset
      });

      _getQuoteAssetAvailableBalance({
        userId: user.userId,
        tenantId: user.tenantId,
        coin: initialPair.quoteAsset
      });
    }
  }, []);

  function trclick(event) {
    const vEvent = _.find(allPairsList, function (o) {
      return o.symbol === event.symbol;
    });

    setPair(event.symbol);
    setMarket(event);
    setBuyPrice(event.lastPrice);
    setSellPrice(event.lastPrice);

    const browserUrl = window.location.origin;
    if (browserUrl === 'http://localhost:3000') {
      window.history.pushState(
        {},
        null,
        browserUrl + '/pro/' + event.symbol + '_' + vEvent.baseAsset + '_' + vEvent.quoteAsset
      );
    } else {
      window.history.pushState(
        {},
        null,
        constants.WoynexUrl + '/pro/' + event.symbol + '_' + vEvent.baseAsset + '_' + vEvent.quoteAsset
      );
    }

    if (user) {
      _getBaseAssetAvailableBalance({
        userId: user.userId,
        tenantId: user.tenantId,
        coin: vEvent.baseAsset
      });

      _getQuoteAssetAvailableBalance({
        userId: user.userId,
        tenantId: user.tenantId,
        coin: vEvent.quoteAsset
      });
    }
  }

  function renderChangeColor(value) {
    if (value > 0) return 'green';
    else if (value < 0) return 'red';
    return 'gray';
  }

  const addFavourites = market => {
    if (isLoggedIn) {
      const isExist = favorites.some(fav => fav.pair === market.symbol);
      let payload = {
        tenantId: user?.tenantId,
        createdUserId: user?.userId,
        pair: market.symbol
      };
      if (isExist) {
        payload.status = false;
        _addUserPairFavorite(payload);
      } else {
        payload.status = true;
        _addUserPairFavorite(payload);
      }
    }
  };

  if (rowData.length <= 0) {
    return (
      <tr>
        <td colSpan="4" className="text-center">
          No data found
        </td>
      </tr>
    );
  }

  return rowData.map((parite, i) => {
    const isHighlighted = parite === market;
    return (
      <tr key={parite.symbol ? parite.symbol : parite.s} className={isHighlighted ? 'table-active' : ''}>
        {/* <td onClick={() => trclick(parite)} style={{ width: "50%" }}> */}
        <td style={{ width: '50%' }}>
          {parite?.image && (
            <img
              style={{ width: '18px', height: '18px', marginRight: '10px' }}
              src={parite.image}
              alt={parite.symbol}
            />
          )}
          {parite.symbol || parite.s}
        </td>

        {/* <td onClick={() => trclick(parite)} style={{ width: "25%" }}> */}
        <td style={{ width: '25%' }}>{parite.lastPrice || 'N/A'}</td>

        <td
          // onClick={() => trclick(parite)}
          className={renderChangeColor((parite.priceChangePercent || 0).toFixed(2))}
          style={{ width: '25%' }}>
          {(parite.priceChangePercent || 0).toFixed(2)}%
        </td>

        {parite?.isFavorite ? (
          // <td onClick={() => addFavourites(parite)} style={{ width: "10%" }}>
          <td style={{ width: '10%' }}>
            {/* <i className="icon ion-md-star" style={{ color: '#007bff' }}></i> */}
            <StarFill color="#007bff" size={14} />
          </td>
        ) : (
          // <td onClick={() => addFavourites(parite)} style={{ width: "10%" }}>
          <td style={{ width: '10%' }}>
            <Star color="var(--c-footerlinkcolor)" size={14} />
          </td>
        )}
      </tr>
    );
  });
}
