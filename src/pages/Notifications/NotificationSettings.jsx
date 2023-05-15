import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Switch } from "antd";
import ApiContext from "../../context/ApiContext";
import { Button as AntButton, message } from "antd";

function NotificationSettings() {
  const { user, _updateUser } = useContext(ApiContext);
  const [emailPermissions, setEmailPermissions] = useState([]);
  const [notificationPermissions, setNotificationPermissions] = useState([]);
  const [isGdprApproved, setIsGdprApproved] = useState(false);

  useEffect(() => {
    const isGdpr = user.isGdprApproved;
    setIsGdprApproved(isGdpr);
  }, [user]);

  /**
   * As soon as user state changes, or user state fills up,
   * calling 'createEmailPermissions' and 'createNotificationPermissions' functions
   * this functions have an array in order to map whole permissions
   */
  useEffect(() => {
    createEmailPermissions();
    createNotificationPermissions();
  }, [user]);

  function createEmailPermissions() {
    // const tempEmailPermissions = [
    //   {
    //     text: "Once enabled, you will receive login and password status emails",
    //     data: [
    //       {
    //         id: 1,
    //         title: "Login successful",
    //         value: user?.email_LoginSuccessful,
    //         permissionType: "email_LoginSuccessful",
    //       },
    //       {
    //         id: 2,
    //         title: "Login failed",
    //         value: user?.email_LoginFailed,
    //         permissionType: "email_LoginFailed",
    //       },
    //       {
    //         id: 3,
    //         title: "Login new device",
    //         value: user?.email_LoginNewDevice,
    //         permissionType: "email_LoginNewDevice",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 4,
    //         title: "Password reset",
    //         value: user?.email_PasswordReset,
    //         permissionType: "email_PasswordReset",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 5,
    //         title: "Password reset request",
    //         value: user?.email_PasswordResetRequest,
    //         permissionType: "email_PasswordResetRequest",
    //         isDisabled: true,
    //       },
    //     ],
    //   },
    //   {
    //     text: "Once enabled, you will receive whitelist and blacklist status emails",
    //     data: [
    //       {
    //         id: 1,
    //         title: "Whitelist account remove",
    //         value: user?.email_WhitelistAccountRemove,
    //         permissionType: "email_WhitelistAccountRemove",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 2,
    //         title: "Whitelist account add",
    //         value: user?.email_WhitelistAccountAdd,
    //         permissionType: "email_WhitelistAccountAdd",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 3,
    //         title: "Whitelist IP add",
    //         value: user?.email_WhitelistIPAdd,
    //         permissionType: "email_WhitelistIPAdd",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 4,
    //         title: "Whitelist IP remove",
    //         value: user?.email_WhitelistIPRemove,
    //         permissionType: "email_WhitelistIPRemove",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 5,
    //         title: "Blacklist account remove",
    //         value: user?.email_BlacklistAccountRemove,
    //         permissionType: "email_BlacklistAccountRemove",
    //       },
    //       {
    //         id: 6,
    //         title: "Blacklist account add",
    //         value: user?.email_BlacklistAccountAdd,
    //         permissionType: "email_BlacklistAccountAdd",
    //       },
    //       {
    //         id: 7,
    //         title: "Blacklist IP add",
    //         value: user?.email_BlacklistIPAdd,
    //         permissionType: "email_BlacklistIPAdd",
    //       },
    //       {
    //         id: 8,
    //         title: "Blacklist IP remove",
    //         value: user?.email_BlacklistIPRemove,
    //         permissionType: "email_BlacklistIPRemove",
    //       },
    //     ],
    //   },
    //   {
    //     text: "Once enabled, you will receive order and currency status emails",
    //     data: [
    //       {
    //         id: 1,
    //         title: "Buy order",
    //         value: user?.email_BuyOrder,
    //         permissionType: "email_BuyOrder",
    //       },
    //       {
    //         id: 2,
    //         title: "Sell order",
    //         value: user?.email_SellOrder,
    //         permissionType: "email_SellOrder",
    //       },
    //       {
    //         id: 3,
    //         title: "Order cancelled",
    //         value: user?.email_OrderCancelled,
    //         permissionType: "email_OrderCancelled",
    //       },
    //       {
    //         id: 4,
    //         title: "Order completed",
    //         value: user?.email_OrderCompleted,
    //         permissionType: "email_OrderCompleted",
    //       },
    //       {
    //         id: 5,
    //         title: "Deposit fiat currency",
    //         value: user?.email_DepositFiatCurrency,
    //         permissionType: "email_DepositFiatCurrency",
    //       },
    //       {
    //         id: 6,
    //         title: "Withdraw fiat currency",
    //         value: user?.email_WithdrawFiatCurrency,
    //         permissionType: "email_WithdrawFiatCurrency",
    //         isDisabled: true,
    //       },
    //       {
    //         id: 7,
    //         title: "Deposit crypto currency",
    //         value: user?.email_DepositCryptoCurrency,
    //         permissionType: "email_DepositCryptoCurrency",
    //       },
    //       {
    //         id: 8,
    //         title: "Withdraw crypto currency",
    //         value: user?.email_WithdrawCryptoCurrency,
    //         permissionType: "email_WithdrawCryptoCurrency",
    //         isDisabled: true,
    //       },
    //     ],
    //   },
    //   {
    //     text: "Once enabled, you will receive promotion and announcement emails",
    //     data: [
    //       {
    //         id: 1,
    //         title: "Public announcement",
    //         value: user?.email_PublicAnnouncement,
    //         permissionType: "email_PublicAnnouncement",
    //       },
    //       {
    //         id: 2,
    //         title: "Promotion",
    //         value: user?.email_Promotion,
    //         permissionType: "email_Promotion",
    //       },
    //     ],
    //   },
    // ];

    const tempEmailPermissions = [
      {
        id: 1,
        title: "Login successful",
        value: user?.email_LoginSuccessful,
        permissionType: "email_LoginSuccessful",
        groupId: 0,
      },
      {
        id: 2,
        title: "Login failed",
        value: user?.email_LoginFailed,
        permissionType: "email_LoginFailed",
        groupId: 0,
      },
      {
        id: 3,
        title: "Login new device",
        value: user?.email_LoginNewDevice,
        permissionType: "email_LoginNewDevice",
        isDisabled: true,
        groupId: 0,
      },
      {
        id: 4,
        title: "Password reset",
        value: user?.email_PasswordReset,
        permissionType: "email_PasswordReset",
        isDisabled: true,
        groupId: 0,
      },
      {
        id: 5,
        title: "Password reset request",
        value: user?.email_PasswordResetRequest,
        permissionType: "email_PasswordResetRequest",
        isDisabled: true,
        groupId: 0,
      },
      {
        id: 6,
        title: "Public announcement",
        value: user?.email_PublicAnnouncement,
        permissionType: "email_PublicAnnouncement",
        groupId: 3,
      },
      {
        id: 7,
        title: "Promotion",
        value: user?.email_Promotion,
        permissionType: "email_Promotion",
        groupId: 3,
      },
      {
        id: 8,
        title: "Buy order",
        value: user?.email_BuyOrder,
        permissionType: "email_BuyOrder",
        groupId: 1,
      },
      {
        id: 9,
        title: "Sell order",
        value: user?.email_SellOrder,
        permissionType: "email_SellOrder",
        groupId: 1,
      },
      {
        id: 10,
        title: "Order cancelled",
        value: user?.email_OrderCancelled,
        permissionType: "email_OrderCancelled",
        groupId: 1,
      },
      {
        id: 11,
        title: "Order completed",
        value: user?.email_OrderCompleted,
        permissionType: "email_OrderCompleted",
        groupId: 1,
      },
      {
        id: 12,
        title: "Deposit fiat currency",
        value: user?.email_DepositFiatCurrency,
        permissionType: "email_DepositFiatCurrency",
        groupId: 1,
      },
      {
        id: 13,
        title: "Withdraw fiat currency",
        value: user?.email_WithdrawFiatCurrency,
        permissionType: "email_WithdrawFiatCurrency",
        isDisabled: true,
        groupId: 1,
      },
      {
        id: 14,
        title: "Deposit crypto currency",
        value: user?.email_DepositCryptoCurrency,
        permissionType: "email_DepositCryptoCurrency",
        groupId: 1,
      },
      {
        id: 15,
        title: "Withdraw crypto currency",
        value: user?.email_WithdrawCryptoCurrency,
        permissionType: "email_WithdrawCryptoCurrency",
        isDisabled: true,
        groupId: 1,
      },
      {
        id: 16,
        title: "Whitelist account remove",
        value: user?.email_WhitelistAccountRemove,
        permissionType: "email_WhitelistAccountRemove",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 17,
        title: "Whitelist account add",
        value: user?.email_WhitelistAccountAdd,
        permissionType: "email_WhitelistAccountAdd",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 18,
        title: "Whitelist IP add",
        value: user?.email_WhitelistIPAdd,
        permissionType: "email_WhitelistIPAdd",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 19,
        title: "Whitelist IP remove",
        value: user?.email_WhitelistIPRemove,
        permissionType: "email_WhitelistIPRemove",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 20,
        title: "Blacklist account remove",
        value: user?.email_BlacklistAccountRemove,
        permissionType: "email_BlacklistAccountRemove",
        groupId: 2,
      },
      {
        id: 21,
        title: "Blacklist account add",
        value: user?.email_BlacklistAccountAdd,
        permissionType: "email_BlacklistAccountAdd",
        groupId: 2,
      },
      {
        id: 22,
        title: "Blacklist IP add",
        value: user?.email_BlacklistIPAdd,
        permissionType: "email_BlacklistIPAdd",
        groupId: 2,
      },
      {
        id: 23,
        title: "Blacklist IP remove",
        value: user?.email_BlacklistIPRemove,
        permissionType: "email_BlacklistIPRemove",
        groupId: 2,
      },
    ];

    setEmailPermissions([...tempEmailPermissions]);
  }

  function createNotificationPermissions() {
    const tempNotificationPermissions = [
      {
        id: 1,
        title: "Login successful",
        value: user?.push_LoginSuccessful,
        permissionType: "push_LoginSuccessful",
        groupId: 0,
      },
      {
        id: 2,
        title: "Login failed",
        value: user?.push_LoginFailed,
        permissionType: "push_LoginFailed",
        groupId: 0,
      },
      {
        id: 3,
        title: "Login new device",
        value: user?.push_LoginNewDevice,
        permissionType: "push_LoginNewDevice",
        isDisabled: true,
        groupId: 0,
      },
      {
        id: 4,
        title: "Password reset",
        value: user?.push_PasswordReset,
        permissionType: "push_PasswordReset",
        isDisabled: true,
        groupId: 0,
      },
      {
        id: 5,
        title: "Password reset request",
        value: user?.push_PasswordResetRequest,
        permissionType: "push_PasswordResetRequest",
        isDisabled: true,
        groupId: 0,
      },
      {
        id: 6,
        title: "Public announcement",
        value: user?.push_PublicAnnouncement,
        permissionType: "push_PublicAnnouncement",
        groupId: 3,
      },
      {
        id: 7,
        title: "Promotion",
        value: user?.push_Promotion,
        permissionType: "push_Promotion",
        groupId: 3,
      },
      {
        id: 8,
        title: "Buy order",
        value: user?.push_BuyOrder,
        permissionType: "push_BuyOrder",
        groupId: 1,
      },
      {
        id: 9,
        title: "Sell order",
        value: user?.push_SellOrder,
        permissionType: "push_SellOrder",
        groupId: 1,
      },
      {
        id: 10,
        title: "Order cancelled",
        value: user?.push_OrderCancelled,
        permissionType: "push_OrderCancelled",
        groupId: 1,
      },
      {
        id: 11,
        title: "Order completed",
        value: user?.push_OrderCompleted,
        permissionType: "push_OrderCompleted",
        groupId: 1,
      },
      {
        id: 12,
        title: "Deposit fiat currency",
        value: user?.push_DepositFiatCurrency,
        permissionType: "push_DepositFiatCurrency",
        groupId: 1,
      },
      {
        id: 13,
        title: "Withdraw fiat currency",
        value: user?.push_WithdrawFiatCurrency,
        permissionType: "push_WithdrawFiatCurrency",
        isDisabled: true,
        groupId: 1,
      },
      {
        id: 14,
        title: "Deposit crypto currency",
        value: user?.push_DepositCryptoCurrency,
        permissionType: "push_DepositCryptoCurrency",
        groupId: 1,
      },
      {
        id: 15,
        title: "Withdraw crypto currency",
        value: user?.push_WithdrawCryptoCurrency,
        permissionType: "push_WithdrawCryptoCurrency",
        isDisabled: true,
        groupId: 1,
      },
      {
        id: 16,
        title: "Whitelist account remove",
        value: user?.push_WhitelistAccountRemove,
        permissionType: "push_WhitelistAccountRemove",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 17,
        title: "Whitelist account add",
        value: user?.push_WhitelistAccountAdd,
        permissionType: "push_WhitelistAccountAdd",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 18,
        title: "Whitelist IP add",
        value: user?.push_WhitelistIPAdd,
        permissionType: "push_WhitelistIPAdd",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 19,
        title: "Whitelist IP remove",
        value: user?.push_WhitelistIPRemove,
        permissionType: "push_WhitelistIPRemove",
        isDisabled: true,
        groupId: 2,
      },
      {
        id: 20,
        title: "Blacklist account remove",
        value: user?.push_BlacklistAccountRemove,
        permissionType: "push_BlacklistAccountRemove",
        groupId: 2,
      },
      {
        id: 21,
        title: "Blacklist account add",
        value: user?.push_BlacklistAccountAdd,
        permissionType: "push_BlacklistAccountAdd",
        groupId: 2,
      },
      {
        id: 22,
        title: "Blacklist IP add",
        value: user?.push_BlacklistIPAdd,
        permissionType: "push_BlacklistIPAdd",
        groupId: 2,
      },
      {
        id: 23,
        title: "Blacklist IP remove",
        value: user?.push_BlacklistIPRemove,
        permissionType: "push_BlacklistIPRemove",
        groupId: 2,
      },
    ];

    setNotificationPermissions([...tempNotificationPermissions]);
  }

  /**
   *
   * toggle email permissions
   */
  const changeEmailPermissionHandler = (item) => {
    const tempEmailPermissions = [...emailPermissions];
    let found = tempEmailPermissions.find((temp) => temp === item);
    found.value = !item.value;
    setEmailPermissions(tempEmailPermissions);
  };

  /**
   *
   * toggle notification permissions
   */
  const changeNotificationPermissionHandler = (item) => {
    const tempNotificationPermissions = [...notificationPermissions];
    let found = tempNotificationPermissions.find((temp) => temp === item);
    found.value = !item.value;
    setNotificationPermissions(tempNotificationPermissions);
  };

  const changeIsGdprStatus = (status) => {
    setIsGdprApproved(status);
  };

  /**
   *
   * when user clicks 'Save My Preferences' button, this function will be fired
   * in order to update user email & notification permissions
   */
  const updatePermissionsHandler = async (event) => {
    event.preventDefault();

    let tempUser = { ...user };
    tempUser.isGdprApproved = isGdprApproved;

    if (emailPermissions.length) {
      emailPermissions.map((email) => {
        tempUser[email.permissionType] = email.value;
      });
    }
    if (notificationPermissions.length) {
      notificationPermissions.map((notify) => {
        tempUser[notify.permissionType] = notify.value;
      });
    }

    _updateUser(tempUser);
  };

  function emailGroupCard(listData, groupId) {
    const list = listData.filter((data) => data.groupId === groupId);
    return list?.map((item) => {
      return (
        <li key={item.id}>
          <Switch
            id={`email-${item.id}`}
            onChange={() => changeEmailPermissionHandler(item)}
            checked={item.value || false}
            disabled={item.isDisabled}
            className="mr-3"
          />
          <div className="notification-info">
            <p>{item.title}</p>
          </div>
        </li>
      );
    });
  }

  function notificationGroupCard(listData, groupId) {
    const list = listData.filter((data) => data.groupId === groupId);
    return list?.map((item) => {
      return (
        <li key={item.id}>
          <Switch
            id={`email-${item.id}`}
            onChange={() => changeNotificationPermissionHandler(item)}
            checked={item.value || false}
            disabled={item.isDisabled}
            className="mr-3"
          />
          <div className="notification-info">
            <p>{item.title}</p>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="mb-3 notification">
            <h6 className="mb-0 notification-title" > <i className="icon ion-md-mail" ></i> Email</h6>
          </div>
          <div className="settings-notification ">
            <Row>
              <Col lg={3} className="border-right">
                <h6 className="mb-3 sub-title ">Authentication</h6>
                <ul>{emailPermissions && emailGroupCard(emailPermissions, 0)}</ul>
              </Col>

              <Col lg={3} className="border-right">
                <h6 className="mb-3 sub-title">Transaction</h6>
                <ul>{emailPermissions && emailGroupCard(emailPermissions, 1)}</ul>
              </Col>

              <Col lg={3} className="border-right">
                <h6 className="mb-3 sub-title">Security</h6>
                <ul>{emailPermissions && emailGroupCard(emailPermissions, 2)}</ul>
              </Col>

              <Col lg={3} className="border-right">
                <h6 className="mb-3 sub-title">Announcement</h6>
                <ul>{emailPermissions && emailGroupCard(emailPermissions, 3)}</ul>
              </Col>
            </Row>

            {/* notifications */}
            <div className="my-3 notification" >
              <h6 className="mb-0 notification-title"><i className="icon ion-md-notifications" ></i> Notifications</h6>
            </div>
            <Row>
              <Col lg={3} className="border-right">
                <ul>{notificationPermissions && notificationGroupCard(notificationPermissions, 0)}</ul>
              </Col>

              <Col lg={3} className="border-right">
                <ul>{notificationPermissions && notificationGroupCard(notificationPermissions, 1)}</ul>
              </Col>

              <Col lg={3} className="border-right">
                <ul>{notificationPermissions && notificationGroupCard(notificationPermissions, 2)}</ul>
              </Col>

              <Col lg={3} className="border-right">
                <ul>{notificationPermissions && notificationGroupCard(notificationPermissions, 3)}</ul>
              </Col>
            </Row>
          </div>

          <Row className="mt-5">
            <form onSubmit={updatePermissionsHandler}>
              <Col lg={5}>
                <div className="custom-control custom-checkbox form-group">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="form-checkbox-c-3"
                    checked={isGdprApproved || false}
                    onChange={() => changeIsGdprStatus(!isGdprApproved)}
                    required
                  />
                  <label className="custom-control-label" htmlFor="form-checkbox-c-3">
                    In the context of <Link to="/terms-and-conditions">GDPR Clarification Text</Link>, I agree to
                    receive commercial electronic messages via e-mail, telephone and electronic communication channels,
                    regarding Products and Services.
                  </label>
                </div>

                <AntButton key="submit" htmlType="submit" type="primary" medium="size">
                  Save my Preferences
                </AntButton>
              </Col>
            </form>
          </Row>
        </div>
      </div>
    </>
  );
}

export default NotificationSettings;
