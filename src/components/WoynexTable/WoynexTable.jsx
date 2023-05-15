import { useContext } from "react";
import { Table } from "antd";
import { ExclamationOctagon } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ThemeContext from "../../context/ThemeContext";

const WoynexTable = (props) => {
  const { width } = useWindowDimensions();
  const { theme } = useContext(ThemeContext);
  const {
    columns,
    expandable,
    list = [],
    size = "medium",
    onChange,
    loading,
    rowKey,
    pageSize = 10,
    isLoggedIn,
  } = props;

  //console.log("width: ", width);
  const scroll = width <= 550 ? { x: 400 } : {};

  let pagi;
  if (pageSize === 0) {
    pagi = false;
  } else {
    pagi = { pageSize: pageSize };
  }

  const empty = [];
  const GuestComponent = () => {
    return (
      <div className="py-5">
        <ExclamationOctagon color={theme === "light" ? "rgba(0,0,0,0.25)" : "#6c757d"} size={36} />
        <div className="woynex-table-empty-text">Login or signup in order to see</div>
      </div>
    );
  };

  if (isLoggedIn) {
    return (
      <Table
        columns={columns}
        expandable={expandable}
        dataSource={list}
        size={size}
        onChange={onChange}
        loading={loading}
        rowKey={rowKey}
        //pagination={{ pageSize: pageSize }}
        pagination={pagi}
        scroll={scroll}
      />
    );
  }

  return (
    <Table
      columns={columns}
      expandable={expandable}
      dataSource={empty}
      size={size}
      rowKey={rowKey}
      loading={loading}
      locale={{ emptyText: <GuestComponent /> }}
      scroll={scroll}
    />
  );
};

export default WoynexTable;

WoynexTable.propTypes = {
  columns: PropTypes.array.isRequired,
  expandable: PropTypes.func,
  list: PropTypes.array.isRequired,
  size: PropTypes.string,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  //   rowKey: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  isLoggedIn: PropTypes.bool.isRequired,
};
