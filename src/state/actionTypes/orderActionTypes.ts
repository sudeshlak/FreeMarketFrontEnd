import * as ACTIONS from "../../constants/actions/orderActions";
import {INewStateDetails, IOrder} from "../../types/IOrder";

export interface AddNewOrder {
  type: typeof ACTIONS.ADD_NEW_ORDER
  payload: IOrder
}

export interface SetInitOrders {
  type: typeof ACTIONS.SET_INIT_ORDERS
  payload: IOrder[]
}

export interface ChangeOrderState {
  type: typeof ACTIONS.CHANGE_ORDER_STATE
  payload: INewStateDetails
}

export type orderTypes = AddNewOrder | SetInitOrders | ChangeOrderState;