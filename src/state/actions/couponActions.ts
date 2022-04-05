import * as ACTIONS from "../../constants/actions/couponActions";
import {CouponTypes} from "../actionTypes/couponActionTypes";
import {IAddCoupon} from "../../types/ICoupon";

export function addCoupon(coupon: IAddCoupon): CouponTypes {
  return {
    type: ACTIONS.ADD_COUPON,
    payload: coupon
  }
}

export function removeCoupon(): CouponTypes {
  return {
    type: ACTIONS.REMOVE_COUPON,
    payload: null
  }
}