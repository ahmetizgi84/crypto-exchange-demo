import { useState, useEffect, useContext, memo } from 'react';
import Moment from 'react-moment';
import { Col, Row } from 'react-bootstrap';
import woynexApi from '../../api/woynexApi';
import ApiContext from '../../context/ApiContext';
import styles from '../Profile/Profile.module.css';
import cn from 'classnames';

function Info() {
  const { user } = useContext(ApiContext);
  const [tenant, setTenant] = useState({});

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {
    const payload = {
      email: user?.email,
      tenantId: user?.tenantId
    };
    try {
      const {
        data: { data }
      } = await woynexApi.post('tenant/get', payload);
      //console.log("response.data: ", data)
      setTenant({ ...data });
    } catch (error) {
      console.log('error occured while fetching tenant data: ', error.response);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">General Information</h5>
        <div className="settings-profile">
          <Row className="align-items-center mb-4">
            <Col xs={2} lg={1} className="pr-0">
              <img src={'../img/company.png'} alt="avatar" width={90} />
            </Col>
            <Col xs={10} lg={3} className="pr-0">
              <h5 className="card-header-title mb-0">{tenant?.tenantName}</h5>
              <label className="text-muted mb-0">
                Register Date:
                <span className="card-title mb-0">
                  <Moment date={tenant?.createdDate} format="DD.MM.YYYY" />
                </span>
              </label>
            </Col>
          </Row>

          <Row>
            <Col md={6} xs={12}>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Company Name:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.tenantName || ''}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Website:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.website || ''}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Company Email Address:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.email || '-'}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Work Phone Number:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.phoneNumber || '-'}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Subject Of Activity:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.subjectOfActivity || '-'}</h5>
              </div>
            </Col>

            <Col md={6} xs={12}>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Trade Registration No:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.tradeRegisterNumber || '-'}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Tax Office:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.taxOffice || ''}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Tax Number:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.taxNumber || ''}</h5>
              </div>
              <div className={cn(['personInfo'])}>
                <label className="text-muted">Address:</label>
                <h5 className={cn([styles.subtitle, 'card-title mb-0'])}>{tenant?.address || '-'}</h5>
              </div>
            </Col>
          </Row>
          {/* <form onSubmit={submitHandler} > */}
          <form>
            <div className="form-row mt-4">
              {/* <div className="col-md-6">
                                    <label htmlFor="selectLanguage">Language</label>
                                    <select
                                        id="selectLanguage"
                                        className="custom-select"
                                    >
                                        <option defaultValue>English</option>
                                        <option>Mandarin Chinese</option>
                                        <option>Spanish</option>
                                        <option>Arabic</option>
                                        <option>Russian</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="selectCurrency">Currency</label>
                                    <select
                                        id="selectCurrency"
                                        className="custom-select"
                                    >
                                        <option defaultValue>USD</option>
                                        <option>EUR</option>
                                        <option>GBP</option>
                                        <option>CHF</option>
                                    </select>
                                </div> */}
              {/* <div className="col-md-12">
                                    <input type="submit" value="Update" />
                                </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(Info);
