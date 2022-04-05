import * as ACTIONS from '../../constants/actions/cartProductsActions'
import {IProduct} from "../../types/IProduct";

export interface AddCartProduct {
  type: typeof ACTIONS.ADD_CART_PRODUCT
  payload: IProduct
}

export interface RemoveCartProduct {
  type: typeof ACTIONS.REMOVE_CART_PRODUCT
  payload: string
}

export interface ChangeCartProduct {
  type: typeof ACTIONS.CHANGE_CART_PRODUCT
  payload: IProduct
}
export interface ClearCart {
  type: typeof ACTIONS.CLEAR_CART
  payload: null
}

export type CartProductTypes = ChangeCartProduct | RemoveCartProduct | AddCartProduct |ClearCart;