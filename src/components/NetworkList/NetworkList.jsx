import React from "react";
import styles from "./NetworkList.module.css";
import PropTypes from "prop-types";
import cn from "classnames";

const NetworkList = ({ list, onPress }) => {
  const onClickHandler = (item) => {
    onPress(item);
  };
    
  return list?.map((network, idx) => {
    return (
      <div className={cn([styles.listContainer, "networkList-container "])} key={idx} onClick={() => onClickHandler(network)}>
        <div className={cn([styles.title, "dark-text-white"])}>{network.networkCode}</div>
        <div className={cn([styles.subTitle, "dark-text-white"])}>{network.label}</div>
      </div>
    );
  });
};

export default NetworkList;

NetworkList.propTypes = {
  list: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};
