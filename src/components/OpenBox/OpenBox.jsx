import React from "react";
import styles from "./OpenBox.module.css";
import { ChevronDown, Coin } from "react-bootstrap-icons";
import cn from "classnames";

const OpenBox = (props) => {
  const {
    onClick,
    leftIcon = <Coin size={20} />,
    asset = "BTC",
    coinName = "Bitcoin",
    withoutIcon = false,
    value = {},
    plain = false,
    plainText = "",
    disabled = false,
    placeholder = "Select",
  } = props;

  if (withoutIcon) {
    return (
      <div  className={cn([styles.openBoxContainer, "openBox-container dark-text-white"])} onClick={onClick}>
        {value && Object.keys(value).length > 0 ? (
          <div className={styles.leftWithoutCoin}>
            <div className={styles.assetWithoutCoin}>{value.key}</div>
            <div className={styles.centerWithoutCoin}>{value.value}</div>
          </div>
        ) : (
          <div className={styles.plainTextEmpty}>{plainText}</div>
        )}

        <div className={styles.right}>
          <ChevronDown size={14} />
        </div>
      </div>
    );
  }

  if (plain) {
    return (
      <div className={styles.openBoxContainer} onClick={onClick}>
        {plainText === "" ? (
          <div className={styles.plainTextEmpty}>{placeholder}</div>
        ) : (
          <div className={styles.plainText}>{plainText}</div>
        )}
        <div className={styles.right}>
          <ChevronDown size={14} />
        </div>
      </div>
    );
  }

  if (disabled) {
    return (
      <div className={styles.disabledOpenBoxContainer} onClick={onClick}>
        <div className={styles.plainTextEmpty}>Select coin</div>

        <div className={styles.right}>
          <ChevronDown size={14} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn([styles.openBoxContainer, "openBox-container dark-text-white"])} onClick={onClick}>
      <div className={styles.left} >
        <div className={styles.coinIcon}>{leftIcon}</div>
        <div className={styles.asset}>{asset}</div>
      </div>

      <div className={styles.center}>{coinName}</div>

      <div className={styles.right}>
        <ChevronDown size={14} />
      </div>
    </div>
  );
};

export default OpenBox;
