import React from 'react';
import {Col, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";

type CheckoutAreaProps = {
  subTotalPrice: number,
  discountPercentage:number|undefined
}

const TotalBill: React.FC<CheckoutAreaProps> = (props) => {
  const {subTotalPrice, discountPercentage} = props;
  const total = () => {
    return discountPercentage ? (subTotalPrice - (subTotalPrice * discountPercentage / 100)) : subTotalPrice;
  }
  return (
    <Row className='mx-4 total-bill py-2'>
      <Col className='total-bill-label'>Est.Total</Col>
      <Col className='text-end total-bill-price'>
        <NumberFormat value={total()}
                      thousandSeparator={true}
                      displayType='text'
                      prefix={'Rs. '}
                      decimalScale={2}
                      fixedDecimalScale={true}
        />
      </Col>
    </Row>
  );
}

export default TotalBill;