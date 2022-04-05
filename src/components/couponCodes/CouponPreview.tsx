import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {ICoupon} from "../../types/ICoupon";

type CouponPreviewProps = {
  coupon: ICoupon
  handleOnDeleteCoupon: (id: string, title: string) => void
}
const CouponPreview: React.FC<CouponPreviewProps> = (props) => {
  const {coupon, handleOnDeleteCoupon} = props;

  return (
    <Col xs={12} md={4} lg={3} className='p-1'>
      <Row>
        <Col className='coupon-preview m-3'>
          <Row className='pt-2'>
            <Col className='coupon-preview-delete-btn-col text-end'>
              <Button className='coupon-preview-delete-btn btn-danger'
                      onClick={() => handleOnDeleteCoupon(coupon.id, coupon.title)}
                      size='sm'>Delete</Button>
            </Col>
          </Row>
          <Row>
            <Col className='coupon-discount-percentage text-center'>
              {coupon.discountPercentage}% OFF
            </Col>
          </Row>
          <Row className='coupon-code-row'>
            <Col className='coupon-code-col  text-center'>
              {coupon.couponCode}
            </Col>
          </Row>
          <Row className='coupon-preview-title-row'>
            <Col className='coupon-preview-title-col text-center'>
              {coupon.title}
            </Col>
          </Row>
          <Row className='coupon-preview-dates-row'>
            <Col xs={2} className='coupon-preview-dates-text px-0'>
              From
            </Col>
            <Col xs={3} className='coupon-preview-dates-col text-center px-0'>
              {coupon.fromDate.stringDate}
            </Col>
            <Col xs={2} className='coupon-preview-dates-text px-0'>
              To
            </Col>
            <Col xs={4} className='coupon-preview-dates-col text-center px-0'>
              {coupon.toDate.stringDate}
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CouponPreview;