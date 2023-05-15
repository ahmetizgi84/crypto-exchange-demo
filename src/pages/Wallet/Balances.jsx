import { NavLink } from 'react-router-dom';
// import _ from "lodash";

function Balances(props) {
  const { coin } = props;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Balances</h5>
        <ul>
          <li className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="icon ion-md-cash"></i>
              <h2>Total Equity</h2>
            </div>
            <div>
              <h3>
                {coin?.total} {coin?.asset}
              </h3>
            </div>
          </li>
          <li className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="icon ion-md-checkmark"></i>
              <h2>Available Margin</h2>
            </div>
            <div>
              <h3>
                {coin?.free} {coin?.asset}
              </h3>
            </div>
          </li>
        </ul>
        <NavLink to={`/deposit/${coin?.asset}`}>
          <button className="btn green">Deposit</button>
        </NavLink>

        <NavLink to={`/withdraw`}>
          {/* to={`/withdraw/${coin?.asset}`}> */}
          <button className="btn red">Withdraw</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Balances;
