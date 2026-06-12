import React from "react";
import CouponPreview from "./CouponPreview";
import { emptyCouponState, useCouponCreateContext } from "./couponContext";
import { ICoupon, ICouponState } from "../../types/ICoupon";

const SampleCouponPreview: React.FC = (props) => {
  //useContext tells React that the SampleCouponPreview component wants to read the CouponContext.
  const couponState: ICouponState | null = useCouponCreateContext();
  console.log(couponState);
  const coupon: ICoupon = {
    id: couponState.id.value,
    title: couponState.title.value,
    fromDate: couponState.fromDate,
    toDate: couponState.toDate,
    couponCode: couponState.couponCode.value,
    discountPercentage: couponState.discountPercentage.value,
  };
  return <CouponPreview coupon={coupon} />;
};

export default SampleCouponPreview;
