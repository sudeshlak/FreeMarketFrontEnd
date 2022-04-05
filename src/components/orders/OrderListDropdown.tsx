import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { SelectStatusType } from '../../types/AdminOrderListType';
import {styleSelect} from "../createProduct/CreateProductConstants";

type OrderListDropdownProps = {
  status: SelectStatusType[]
  activeStatus: SelectStatusType
  handleOnActiveStatus: (selected: SelectStatusType | null) => void
}

const OrderListDropdown:React.FC<OrderListDropdownProps> = (props) => {
  return (
    <Row className='order-list-dropdown'>
      <Col xs={6} md={2}>
        <label>Status : </label>
      </Col>
      <Col xs={8} sm={6} md={4} className='pb-2'>
        <Select options={props.status}
                allowCreateWhileLoading
                isClearable={false}
                isSearchable={true}
                styles={styleSelect}
                onChange={ (selected: SelectStatusType | null) => {
                        props.handleOnActiveStatus(selected);
                    }
                }
                defaultValue={props.activeStatus}
        />
        </Col>
    </Row>
  )
};

export default OrderListDropdown;