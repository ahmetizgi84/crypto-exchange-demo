import React from "react";
import styles from "./CoinList.module.css";
import { Coin } from "react-bootstrap-icons";
import cn from "classnames";
const CoinList = (props) => {
  const { list = [], onClick } = props;

  const onClickHandler = (item) => {
    onClick(item);
  };

  return list?.map((item, idx) => {
    return (
      <div key={idx} className={cn([styles.listContainer, "coinList-container "])} onClick={() => onClickHandler(item)}>
        <div className={styles.iconContainer}>
          <Coin size={32} />
        </div>
        <div className={styles.coinContainer}>
          <div className={styles.symbol}>{item.symbol}</div>
          <div className={styles.coinName}>{item.coinName}</div>
        </div>
      </div>
    );
  });
};

export default CoinList;
