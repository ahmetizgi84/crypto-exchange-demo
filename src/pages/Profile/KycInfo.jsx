import { useContext } from "react";
import ApiContext from "../../context/ApiContext";

function KycInfo() {
  const { user } = useContext(ApiContext);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">KYC (ID Verification)</h5>
        <div className="settings-profile">
          <div className="form-row">
            <div className="col-md-6">
              <label className="mb-1 text-muted" htmlFor="currentPass">
                Type:
              </label>
              <h5 className="card-title mb-0">
                {user?.roleId === 3 ? "Individual" : user?.roleId === 4 && "Corporate"}
              </h5>
            </div>

            <div className="col-md-6">
              <label className="mb-1 text-muted" htmlFor="newPass">
                Fullname:
              </label>
              <h5 className="card-title mb-0">{user?.tenantName}</h5>
            </div>

            <div className="col-md-6">
              <label className="mb-1 text-muted" htmlFor="currentPass">
                City:
              </label>
              {/* <div>{user?.cityId}</div> */}
              <h5 className="card-title mb-0">Ankara</h5>
            </div>

            <div className="col-md-6">
              <label className="mb-1 text-muted" htmlFor="newPass">
                Country:
              </label>
              {/* <div>{user?.countyId}</div> */}
              <h5 className="card-title mb-0">Turkey</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KycInfo;
