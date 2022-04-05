import React from 'react';
import {Col, Row,} from "react-bootstrap";
import NumberFormat from "react-number-format";

type CartSubTotalProps = {
  subTotalPrice: number
  numberOfItems:number
}

const CartSubTotal: React.FC<CartSubTotalProps> = (props) => {
  const {subTotalPrice,numberOfItems} = props;
  return (
    <Row className='cart-subtotal py-2 mx-1'>
      <Col xs={5}>Subtotal ({numberOfItems} Items)</Col>
      <Col xs={7} lg={6} className='cart-subtotal-price text-end'>
        <NumberFormat thousandSeparator={true}
                      displayType={'text'}
                      prefix={'Rs. '}
                      value={subTotalPrice}
                      decimalScale={2}
                      fixedDecimalScale={true}
        />
      </Col>
    </Row>
  );
}

export default CartSubTotal;