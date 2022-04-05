import React from 'react';
import {Col, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";

type CartTotalProps = {
  totalPrice: number
}

const CartTotal: React.FC<CartTotalProps> = (props) => {
  const {totalPrice} = props;
  return (
    <Row className='cart-Total py-3 mx-1'>
      <Col xs={4}>Est.Total</Col>
      <Col xs={8} lg={7} className='cart-Total-price text-end'>
        <NumberFormat thousandSeparator={true}
                      displayType={'text'}
                      prefix={'Rs. '}
                      value={totalPrice}
                      decimalScale={2}
                      fixedDecimalScale={true}
        />
      </Col>
    </Row>
  );
}

export default CartTotal;