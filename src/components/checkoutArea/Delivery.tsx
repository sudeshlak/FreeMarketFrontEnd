import React from 'react';
import {Col, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";

type DiscountProps = {
  subTotalPrice: number
  discountPercentage:number|undefined
}
const Discount: React.FC<DiscountProps> = (props) => {
  const { subTotalPrice,discountPercentage} = props;
  const discount = () => {
    return discountPercentage ? (subTotalPrice * discountPercentage / 100) : 0
  }
  return (
    <Row className='mx-4 delivery py-3'>
      <Col className='delivery-label'>Discount</Col>
      <Col className='text-end delivery-price'>
        <NumberFormat value={discount()}
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

export default Discount;