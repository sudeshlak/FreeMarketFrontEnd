import React from "react";
import {Row, Col} from "react-bootstrap";
import {IBillingAddress} from "../../types/IOrder";

type OrderDetailsProps = {
  billingDetails: IBillingAddress | null
}
const OrderDetails: React.FC<OrderDetailsProps> = (props) => {
  const {billingDetails} = props;

  return (
    <Row className='order-details'>
      <Col xs={12} md={6}>
        <Col className='order-item-head mb-2'>Shipping Details</Col>
        <Col className='shipping-details mx-0 px-0'>
          <Col>Full name : {billingDetails?.fullName}</Col>
          <Col>Contact number : {billingDetails?.contactNumber}</Col>
          <Col>Address : {billingDetails?.address}</Col>
          <Col>City : {billingDetails?.city}</Col>
          <Col>Country :{billingDetails?.country}</Col>
          <Col>Postal Code : {billingDetails?.postalCode}</Col>
        </Col>
      </Col>
    </Row>
  )
}

export default OrderDetails;