import * as ACTIONS from "../../constants/actions/orderActions";
import {AddNewOrder, ChangeOrderState, SetInitOrders} from "../actionTypes/orderActionTypes";
import {INewStateDetails, IOrder} from "../../types/IOrder";

export function addNewOrder(newOrder: IOrder): AddNewOrder {
  return {
    type: ACTIONS.ADD_NEW_ORDER,
    payload: newOrder
  }
}

export function setInitOrders(orders: IOrder[]): SetInitOrders {
  return {
    type: ACTIONS.SET_INIT_ORDERS,
    payload: orders
  }
}

export function changeOrderState(newStateDetails: INewStateDetails): ChangeOrderState {
  return {
    type: ACTIONS.CHANGE_ORDER_STATE,
    payload: newStateDetails
  }
}