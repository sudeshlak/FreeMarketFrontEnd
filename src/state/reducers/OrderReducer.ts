import {IOrder} from "../../types/IOrder";
import {orderTypes} from "../actionTypes/orderActionTypes";
import * as ACTIONS from "../../constants/actions/orderActions";

const orderInitialState = {
  orders: []
};

export function orderReducer(state: { orders: IOrder[] } = orderInitialState, action: orderTypes): { orders: IOrder[] } {
  switch (action.type) {
    case ACTIONS.SET_INIT_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case ACTIONS.ADD_NEW_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.payload]
      }
    }
    case ACTIONS.CHANGE_ORDER_STATE:
      return {
        ...state,
        orders: [...state.orders.map((order: IOrder) => {
          return (order.id === action.payload.id) ? {...order, status: action.payload.newState} : order
        })]
      }
    default: {
      return state;
    }
  }
}