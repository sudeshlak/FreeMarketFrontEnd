import * as ACTIONS from '../../constants/actions/cartProductsActions'
import {ICartProducts} from "../../types/ShoppingAreaTypes";
import {CartProductTypes} from "../actionTypes/cartProductsActionTypes";

const CartProductsInitialState: ICartProducts = {
  cartProducts: []
};

export function cartReducer(state = CartProductsInitialState, action: CartProductTypes): ICartProducts {
  switch (action.type) {
    case ACTIONS.ADD_CART_PRODUCT:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload]
      };

    case ACTIONS.REMOVE_CART_PRODUCT:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          cartProduct => cartProduct.id !== action.payload
        )
      };
    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartProducts: []
      };


    case ACTIONS.CHANGE_CART_PRODUCT: {
      const cartProducts = state.cartProducts.slice();
      const indexOfUpdatedItem = cartProducts.findIndex(cartProduct => cartProduct.id === action.payload.id);
      cartProducts[indexOfUpdatedItem] = action.payload;
      return {
        ...state,
        cartProducts: cartProducts
      };
    }

    default: {
      return state;
    }
  }
}