import * as ACTIONS from "../../constants/actions/couponActions";
import {IAddCoupon} from "../../types/ICoupon";

export interface addCoupon {
  type: typeof ACTIONS.ADD_COUPON
  payload: IAddCoupon
}

export interface removeCoupon {
  type: typeof ACTIONS.REMOVE_COUPON
  payload: null
}

export type CouponTypes = addCoupon|removeCoupon;