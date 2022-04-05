import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Select from "react-select";
import {styleSelect} from "./OrderListConstant";
import {SelectStatusType} from "../../types/AdminOrderListType";
import UserOrderListTable from "./UserOrderListTable";

const UserOrders = () => {
  const [activeStatus, setActiveStatus] = useState<SelectStatusType>({label: 'All', value: 0});

  const status: SelectStatusType[] = [
    {value: 0, label: 'All'},
    {value: 1, label: 'Requested'},
    {value: 2, label: 'Approved'},
    {value: 3, label: 'Rejected'},
  ];

  const handleOnActiveStatus = (statusSelected: SelectStatusType | null) => {
    if (!statusSelected) {
      return;
    }
    setActiveStatus(statusSelected);
  };

  return (
    <React.Fragment>
      <Col className='user-orders'>
        <Row>
          <Col className='user-orders-header'>My Orders</Col>
        </Row>
        <Row className='user-orders-list'>
          <Col className='order-list-dropdown'>
            <Row>
              <Col xs={4} sm={2} md={2}>
                <label>Status : </label>
              </Col>
              <Col xs={8} sm={3} md={3}>
                <Select options={status}
                        allowCreateWhileLoading
                        isClearable={false}
                        isSearchable={true}
                        styles={styleSelect}
                        onChange={(selected: SelectStatusType | null) => {
                          handleOnActiveStatus(selected);
                        }
                        }
                        defaultValue={activeStatus}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <UserOrderListTable activeStatus={activeStatus}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
}

export default UserOrders;