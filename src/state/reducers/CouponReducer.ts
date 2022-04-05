import * as ACTIONS from "../../constants/actions/couponActions";
import {CouponTypes} from "../actionTypes/couponActionTypes";
import {IAddCoupon} from "../../types/ICoupon";

const couponInitialState = null

export function couponReducer(state: null | IAddCoupon = couponInitialState, action: CouponTypes): null |
  IAddCoupon {
  switch (action.type) {
    case ACTIONS.ADD_COUPON:
      return {discountPercentage: action.payload.discountPercentage, title: action.payload.title}

    case ACTIONS.REMOVE_COUPON: {
      return null
    }
    default: {
      return state;
    }
  }
}