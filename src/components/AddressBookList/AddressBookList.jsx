import React from "react";
import PropTypes from "prop-types";
import styles from "./AddressBookList.module.css";
import cn from "classnames";

const AddressBookList = ({ addressBookList, onPress }) => {
  return addressBookList?.map((item, idx) => {
    return (
      <div key={idx} className={cn([styles.listContainer, "addressBookList-container"])} onClick={() => onPress(item)}>
        <div className={cn([styles.title, "dark-text-white"])}>{item.title}</div>

        <div className={styles.addressContainer}>
          <div className={styles.subTitle}>Address</div>
          <div className={cn([styles.address, "dark-text-white"])}>{item.address}</div>
        </div>

        <div className={styles.addressContainer}>
          <div className={styles.subTitle}>Network</div>
          <div className={cn([styles.address, "dark-text-white"])}>{item.network}</div>
        </div>
      </div>
    );
  });
};

export default AddressBookList;

AddressBookList.propTypes = {
  addressBookList: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};
