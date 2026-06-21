import React from "react";
import { ICoupon } from "../../types/ICoupon";
import CouponPreview from "../couponCodes/CouponPreview";
import { Row } from "react-bootstrap";
interface CouponPreviewPopupProps {
  coupons: ICoupon[];
  handleOnCloseCouponModel: () => void;
}
function CouponPreviewPopup(props: CouponPreviewPopupProps) {
  const { coupons, handleOnCloseCouponModel } = props;

  return (
    <div className="coupons-model" onClick={handleOnCloseCouponModel}>
      <h2 className="title">Grab Your coupon today!</h2>
      <Row className="justify-content-center w-100">
        {coupons.map((coupon: ICoupon) => (
          <CouponPreview key={coupon.id} coupon={coupon} />
        ))}
      </Row>
    </div>
  );
}

export default CouponPreviewPopup;
