import React from 'react';
import CartProduct from "./CartProduct";
import {IProduct} from "../../types/IProduct";

type CartProductListProps = {
  cartItems: IProduct[] | null
}

const CartProductList: React.FC<CartProductListProps> = (props) => {

  const renderCartProducts = () => {
    if (!props.cartItems) {
      return;
    }
    if (props.cartItems.length === 0) {
      return;
    }
    return props.cartItems.map((cartItem: IProduct) => {
      return <CartProduct name={cartItem.title}
                          id={cartItem.id}
                          qty={cartItem.quantity}
                          price={cartItem.regular_price-cartItem.discount_price}
                          key={cartItem.id}
                          image={cartItem.image}
      />
    });
  }

  return (
    <div className='class-product-list'>
      {renderCartProducts()}
    </div>
  );
}

export default CartProductList;