import * as ACTIONS from '../../constants/actions/cartProductsActions'
import {AddCartProduct, RemoveCartProduct, ChangeCartProduct, ClearCart} from '../actionTypes/cartProductsActionTypes';
import {IProduct} from "../../types/IProduct";

export function addCartProduct(newItem: IProduct):AddCartProduct {
  return {
    type: ACTIONS.ADD_CART_PRODUCT,
    payload: newItem
  }
}

export function removeCartProduct(id: string): RemoveCartProduct {
  return {
    type: ACTIONS.REMOVE_CART_PRODUCT,
    payload: id
  }
}

export function changeCartProduct(changeItem: IProduct): ChangeCartProduct {
  return {
    type: ACTIONS.CHANGE_CART_PRODUCT,
    payload: changeItem
  }
}

export function clearCartAction(): ClearCart {
  return {
    type: ACTIONS.CLEAR_CART,
    payload: null
  }
}