import React from 'react';
import {Col, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";

type CartDiscountProps = {
  discount: number
}
const CartDiscount: React.FC<CartDiscountProps> = (props) => {
  const {discount}=props;
  return (
    <Row className='cart-discount mx-1'>
      <Col xs={4}>Discount</Col>
      <Col xs={8} lg={7} className='cart-discount-price text-end'>
        <NumberFormat thousandSeparator={true}
                      displayType={'text'}
                      prefix={'Rs. '}
                      value={discount}
                      decimalScale={2}
                      fixedDecimalScale={true}
        />
      </Col>
    </Row>
  );
}

export default CartDiscount;