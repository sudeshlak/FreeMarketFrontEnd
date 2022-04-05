import React from 'react';
import {IBillingAddress, IOrder} from "../../types/IOrder";
import {Col, Row} from "react-bootstrap";

type OrderShippingDetailsProps = {
  billingDetails: IBillingAddress | null
  order: IOrder | null
}

const OrderShippingDetails: React.FC<OrderShippingDetailsProps> = (props) => {
  const {billingDetails} = props;
  return (
    <Row>
      <Col xs={12} md={6}>
        <Col className='order-item-head mb-2'>Shipping Details</Col>
        <Col className='shipping-details mx-0 px-0'>
          <Col>Full name : {billingDetails?.fullName}</Col>
          <Col>Contact number : {billingDetails?.contactNumber}</Col>
          <Col>Address : {billingDetails?.address}</Col>
          <Col>City : {billingDetails?.city}</Col>
          <Col>Country :{billingDetails?.country}</Col>
          <Col>Postal Code : {billingDetails?.postalCode}</Col>
          {props.order?.deliveryInstructions &&
          <Col>Delivery Instructions  : {props.order?.deliveryInstructions}</Col>
          }
        </Col>
      </Col>
    </Row>
  );
}

export default OrderShippingDetails;