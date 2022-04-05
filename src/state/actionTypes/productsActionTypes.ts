import * as ACTIONS from "../../constants/actions/productActions";
import {IProduct} from "../../types/IProduct";

export interface AddNewProduct {
  type: typeof ACTIONS.ADD_NEW_PRODUCT
  payload: IProduct
}

export interface SetInitProducts {
  type: typeof ACTIONS.SET_INIT_PRODUCTS
  payload: IProduct[]
}

export interface DeleteProduct {
  type: typeof ACTIONS.DELETE_PRODUCT
  payload: string
}

export interface UpdateProduct {
  type: typeof ACTIONS.UPDATE_PRODUCT
  payload: IProduct
}

export type productTypes = AddNewProduct|SetInitProducts|DeleteProduct|UpdateProduct;