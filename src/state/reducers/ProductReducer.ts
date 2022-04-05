import {IProduct, IProducts} from "../../types/IProduct";
import {productTypes} from "../actionTypes/productsActionTypes";
import * as ACTIONS from "../../constants/actions/productActions";

const productsInitialState = {
  products: []
}

export function productReducer(state: IProducts = productsInitialState, action: productTypes): IProducts {
  switch (action.type) {
    case ACTIONS.ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case ACTIONS.SET_INIT_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload)
      }
    case ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product: IProduct) => {
          return (product.id === action.payload.id) ? action.payload : product;
        })
      }
    default: {
      return state;
    }
  }
}