import React, {useState} from 'react';
import {Col, Row, Image} from "react-bootstrap";
import CartProductList from "./CartProductList";
import CartSubTotal from "./CartSubTotal";
import CartDiscount from "./CartDiscount";
import CartTotal from "./CartTotal";
import emptyCart from "../../assets/images/emptyCart.png";
import {IProduct} from "../../types/IProduct";
import {useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import {Redirect} from "react-router-dom";

const CartArea: React.FC = () => {
  const cartItems: IProduct[] = useSelector((state: AppState) => state.cartProducts.cartProducts);
  const subTotalPrice = cartItems.reduce((total: number, b: IProduct) =>
    total + ((b.regular_price - b.discount_price) * b.quantity), 0);
  const discount: number = 0;
  const [isRedirectCheckout, setIsRedirectCheckout] = useState(false);
  const onclickRouteCheckout = () => {
    setIsRedirectCheckout(true);
  }
  const RenderCartArea = () => {
    if (!cartItems || cartItems.length === 0) {
      return (
        <div className='empty-cart'>
          <Col xs={12} className='px-4 text-center'><Image src={emptyCart} className='empty-cart-image'/></Col>
          <Col xs={12} className='empty-cart-row-1'>Your Cart is empty</Col>
          <Col xs={12} className='empty-cart-row-2'>Add items to your cart :)</Col>
        </div>
      );
    } else {
      return (
        <div className='non-empty-cart'>
          <CartProductList cartItems={cartItems}
          />
          <CartSubTotal
            numberOfItems={cartItems ? cartItems.length : 0}
            subTotalPrice={subTotalPrice}/>
          <CartDiscount discount={discount}/>
          <CartTotal totalPrice={subTotalPrice - discount}/>
          <Row className='mx-1'>
            <Col>
              {isRedirectCheckout && <Redirect to='/checkout'/>}
              <button className='cart-checkout-btn' onClick={onclickRouteCheckout}>Checkout</button>
            </Col>
          </Row>
        </div>
      );
    }
  }

  return (
    <React.Fragment>{RenderCartArea()}</React.Fragment>
  );
}

export default CartArea;