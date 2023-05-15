import { useContext, useEffect } from "react";
import ApiContext from "../../context/ApiContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Moment from "react-moment";
import "moment-timezone";
import _ from "lodash";
import { WoynexTable } from "../../components";

function LoginActivity() {
  const { _getUserLoginActivity, userLoginActivity, user, loading } = useContext(ApiContext);
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      _getUserLoginActivity();
    }
  }, [user]);

  const columns = [
    {
      title: "Type - Location",
      dataIndex: "type",
      key: "type",
      render: (_, record, __) => {
        return (
          <>
            <h6 className="card-title mb-1">{record.type}</h6>
            <div className="text-muted">{record.locationName}</div>
          </>
        );
      },
    },
    {
      title: () => <div className="text-right">IP - Date</div>,
      dataIndex: "locationName",
      key: "locationName",
      render: (_, record, __) => {
        return (
          <div className="text-right">
            <h6 className="card-title mb-1">{record.ipAddress}</h6>
            <div className="text-muted">
              <Moment date={record.createdDate} format="DD.MM.YYYY hh:mm:ss" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-2">Login Activity</h5>
        <WoynexTable
          columns={columns}
          list={userLoginActivity}
          size="small"
          rowKey={(record) => record.id}
          pageSize={5}
          loading={loading}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}

export default LoginActivity;
