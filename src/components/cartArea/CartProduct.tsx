import React from 'react';
import {Col, Row} from "react-bootstrap";
import {Trash} from "react-feather";
import NumberFormat from 'react-number-format';
import {useDispatch} from "react-redux";
import {removeCartProduct} from "../../state/actions/cartActions";
import {smallCentsWithPrefix} from "../../util/uiComponents";
import DisplayImage from "../displayImage/DisplayImage";

type CartProductProps = {
  name: string
  id: string
  qty: number
  price: number
  image: string
}

const CardProduct: React.FC<CartProductProps> = (props) => {
  const dispatch = useDispatch();
  const handleOnDeleteCartItem = (id: string) => {
    dispatch(removeCartProduct(id));
  }
  return (
    <Row className='cart-product py-2 mx-1'>
      <Col xs={4}>
        <DisplayImage image={props.image} className={'cart-product-image'}/>
      </Col>
      <Col xs={8}>
        <Row>
          <Col className='cart-product-name pt-1' xs={10}>
            {props.name}
          </Col>
          <Col className='cart-product-delete-btn' xs={2}><Trash size='1em'
                                                                 onClick={() => handleOnDeleteCartItem(props.id)}
          />
          </Col>
        </Row>
        <Row className='py-2'>
          <Col xs={3} className='cart-product-qty'>
            Qty.{props.qty}
          </Col>
          <Col xs={8} className='cart-product-price text-end'>
            <NumberFormat thousandSeparator={true}
                          displayType={'text'}
                          prefix={'Rs. '}
                          value={props.qty * (props.price)}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          renderText={smallCentsWithPrefix}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CardProduct;