import * as ACTIONS from "../../constants/actions/productActions";
import {IProduct} from "../../types/IProduct";
import {AddNewProduct, DeleteProduct, SetInitProducts, UpdateProduct} from '../actionTypes/productsActionTypes'

export function addNewProduct(newProduct: IProduct): AddNewProduct {
  return {
    type: ACTIONS.ADD_NEW_PRODUCT,
    payload: newProduct
  }
}

export function updateProduct(newProduct: IProduct): UpdateProduct {
  return {
    type: ACTIONS.UPDATE_PRODUCT,
    payload: newProduct
  }
}

export function setInitProducts(products: IProduct[]): SetInitProducts {
  return {
    type: ACTIONS.SET_INIT_PRODUCTS,
    payload: products
  }
}

export function removeProduct(id: string): DeleteProduct {
  return {
    type: ACTIONS.DELETE_PRODUCT,
    payload: id
  }
}