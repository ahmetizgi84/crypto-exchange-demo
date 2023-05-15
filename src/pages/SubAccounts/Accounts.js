import { useContext, useState,  useEffect } from 'react'
import ApiContext from '../../context/ApiContext'
import { Context as AuthContext } from "../../context/AuthContext";
import { Table } from 'react-bootstrap'
import { Tag } from 'antd';
import NewUserComponent from "../AddNewUser/NewUser";
import { PlusOutlined } from "@ant-design/icons";
import { Button as AntButton, Modal as AntModal, Form, Input, Select } from "antd";
import { WoynexTable } from "../../components";
import _ from "lodash";

function Accounts() {
    return (
        <>
            <Users /> 
        </>
    )
}

export default Accounts

function Users() {
    const {
        state: { isLoggedIn },
      } = useContext(AuthContext);
    const { _getSubAccounts, user, subAccounts, setSubAccounts, loading } = useContext(ApiContext)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
   
    useEffect(() => {
        if (user) {
            const payload = {
                criteria: {
                   // tenantId: user?.tenantId
                    roleId:user?.roleId
                }
            }

            _getSubAccounts(payload)
        }

    }, [user])

    /**
     * status = 1 -> Active
     * status = -1 -> Deleted
     * status = 0 -> Waiting For Approval
     * status = 2 -> Quitted
     * status = 3 -> Waiting For Verification
     * 
     */

    function statusNameParser(status) {
        let name = null
        switch (status) {
            case -1:
                name = <Tag color="error">Deleted</Tag>
                return name;
            case 0:
                name = <Tag color="warning">Waiting For Approval</Tag>
                return name;
            case 1:
                name = <Tag color="success">Active</Tag>
                return name;
            case 2:
                name = <Tag color="default">Quitted</Tag>
                return name;
            case 3:
                name = <Tag color="warning">Waiting For Verification</Tag>
                return name;

            default:
                return "Undefined"
        }

    }

    const columns = [
        {
          title: "ID",
          dataIndex: "userId",
          sorter: true,
          key: "userId",
        },
        {
          title: "First Name",
          dataIndex: "name",
          sorter: true,
          key: "name",
        },
        {
          title: "Last Name",
          dataIndex: "surname",
          key: "surname",
          sorter: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Role",
            dataIndex: "roleId",
            render: ((roleId) => roleId === 4 ? "Kurumsal" : roleId === 3 && "Bireysel"),
            key: "roleId",
          },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => statusNameParser(status),
            key: "status",
        },
        
      ];
    const handleTableChange = (pagination, filters, sorter) => {
        const orderedList = _.orderBy(subAccounts, sorter.field, sorter.order === "ascend" ? "asc" : "desc");
        setSubAccounts(orderedList);
      };
    
    return (
        <>
        <div className="card">
            <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                <h5 className="card-title  m-0 mr-3">Existing User Accounts</h5>
                <AntButton type="primary" icon={<PlusOutlined color="white" />} onClick={handleShow} />
            </div>
                <WoynexTable
                    columns={columns}
                    list={subAccounts}
                    size="small"
                    onChange={handleTableChange}
                    rowKey={(record) => record.id}
                    pageSize={8}
                    loading={loading}
                    isLoggedIn={isLoggedIn}
        />
            </div>
            <NewUserComponent show={show} handleClose={handleClose}/>  
        </div>
        </>
    )
}
