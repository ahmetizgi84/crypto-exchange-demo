import { useEffect, useContext } from "react";
import ApiContext from "../../context/ApiContext";
import { Modal as AntModal, Button as AntButton, Popconfirm } from "antd";
import { DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { WoynexTable } from "../../components";
import _ from "lodash";

import WhitelistAddressLogic from "./WhitelistAddressLogic";
import WhitelistAddressModal from "./WhitelistAddressModal";
import WhitelistAddressActivateModal from "./WhitelistAddressActivateModal";

function WhitelistAddresses() {
  const {
    logicState,
    isLoggedIn,
    setUniversalAddress,
    setWhitelistAddressModal,
    handleCheckBoxOnChange,
    setOriginAddressType,
    getTransferNetworkByAsset,
    setShow,
  } = WhitelistAddressLogic();
  const { isWhitelistAddressModalOpen, isUniversalAddressChecked, optionOriginAddressType, show } = logicState;

  const {
    user,
    _getCoinList,
    _getCoreParameters,
    _fetchWhitelistAddresses,
    wlAddresses,
    setWlAddresses,
    loading,
    _deleteWhitelistAddress,
  } = useContext(ApiContext);

  const handleWhitelistAddressModalClose = () => {
    setWhitelistAddressModal(false);
  };

  useEffect(() => {
    const payload = {
      keyCode: optionOriginAddressType,
      status: 1,
    };
    _getCoreParameters(payload);
    _getCoinList();
  }, []);

  useEffect(() => {
    const payload = {
      criteria: { tenantId: user?.tenantId },
    };
    _fetchWhitelistAddresses(payload);
  }, []);

  const columns = [
    {
      title: "Address label",
      dataIndex: "label",
      sorter: true,
      key: "label",
      width: "18%",
    },
    {
      title: "Coin",
      dataIndex: "coin",
      sorter: true,
      key: "coin",
      width: "18%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "18%",
    },
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
      sorter: true,
      width: "18%",
    },
    {
      title: "Address origin",
      dataIndex: "originType",
      key: "originType",
      width: "18%",
    },
    {
      title: "",
      dataIndex: "operation",
      key: "operation",
      width: "10%",
      render: (_, record) =>
        wlAddresses.length >= 1 ? (
          <>
            <Popconfirm title="Sure to delete?" onConfirm={() => _deleteWhitelistAddress({ id: record.id })}>
              <AntButton type="primary" icon={<DeleteOutlined />} size="sm" danger />
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const orderedList = _.orderBy(wlAddresses, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
    setWlAddresses(orderedList);
  };

  function showToast() {
    AntModal.confirm({
      title: "You are about to activate whitelist Addresses",
      icon: <ExclamationCircleOutlined />,
      content:
        "When this function is turned on, your account will only be able to withdraw to whitelisted withdrawal addresses.",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => setShow(true),
    });
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h5 className="card-title m-0">Whitelist Addresses</h5>
              <small className="d-block">If turned on, you can withdraw only to whitelisted addresses.</small>
            </div>
            <AntButton type="primary" icon={<PlusOutlined />} onClick={() => setWhitelistAddressModal(true)} />
          </div>

          <div className="text-right">
            <AntButton type="primary" size="medium" onClick={showToast}>
              Activate
            </AntButton>
          </div>
        </div>

        <WoynexTable
          columns={columns}
          list={wlAddresses}
          size="small"
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          pageSize={8}
          loading={loading}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <WhitelistAddressModal
        isWhitelistAddressModalOpen={isWhitelistAddressModalOpen}
        handleWhitelistAddressModalClose={handleWhitelistAddressModalClose}
        isUniversalAddressChecked={isUniversalAddressChecked}
        handleCheckBoxOnChange={handleCheckBoxOnChange}
        optionOriginAddressType={optionOriginAddressType}
        setOriginAddressType={setOriginAddressType}
        getTransferNetworkByAsset={getTransferNetworkByAsset}
      />

      <WhitelistAddressActivateModal show={show} setShow={setShow} />
    </div>
  );
}

export default WhitelistAddresses;

/**
 *
 * @TODO
 * network seçildiğinde network statei içine regex geliyor, o kullanılacak
 * address origin modalında select exhange combosu seçiliyor fakat comboya yansımıyor, düzeltielcek
 */
