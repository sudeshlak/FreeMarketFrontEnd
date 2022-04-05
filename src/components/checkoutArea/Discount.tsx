import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {toast} from "../sweetalert/sweetalert";
import {useMutation} from "@apollo/client";
import {GET_ONE_COUPON} from "../../graphQl/coupon/couponMutation";
import {IProduct} from "../../types/IProduct";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import {X} from "react-feather";
import {addCoupon, removeCoupon} from "../../state/actions/couponActions";
import {IAddCoupon} from "../../types/ICoupon";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";
const override = css`
  margin-left: 5px;
  margin-top: 2px`;

const Discount: React.FC = () => {
  const coupon: IAddCoupon|null = useSelector((state: AppState) => state.coupon);
  const dispatch = useDispatch();
  const [couponError, setCouponError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [getOneCoupon] = useMutation(GET_ONE_COUPON);
  const productList: IProduct[] = useSelector((state: AppState) => state.cartProducts.cartProducts);
  const handleOnSubmitDiscountCode = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (productList.length === 0) {
      toast('Add products to the cart', '', 'info');
      setLoading(false);
      return;
    }
    if (!discountCode) {
      setCouponError('Enter correct coupon code.');
      setLoading(false);
      return;
    }
    getOneCoupon({
      variables: {
        couponCode: discountCode
      }
    }).then(({data}) => {
      const currentDate: number = new Date().getTime();
      if (data.getOneCoupon.toDate.numberDate < currentDate || data.getOneCoupon.fromDate.numberDate > currentDate) {
        setCouponError('Invalid coupon code.');
        setLoading(false);
        return;
      }
      dispatch(addCoupon({discountPercentage:data.getOneCoupon.discountPercentage,title:data.getOneCoupon.title}));
      setCouponError('');
      setDiscountCode('');
      toast('Coupon ' + data.getOneCoupon.title + ' added to your order Successfully.', '', 'success');
      setLoading(false);
    }).catch((error) => {
      setCouponError('Failed to add coupon code.');
      setLoading(false);
    });
  }
  const handleOnChangeCouponCode = (couponCode: string) => {
    setDiscountCode(couponCode);
  }
  const handleOnRemoveCoupon=()=>{
    dispatch(removeCoupon());
  }
  return (
    <Col>
      <Form onSubmit={handleOnSubmitDiscountCode}>
        <Row className='px-1 discount'>
          <Col xs={12} md={{span: 6, offset: 6}} sm={12} className='text-end'>
            <Row>
              <Col xs={4} md={4} className='discount-label text-end mt-2'>
                <span>Have a discount code?</span>
              </Col>
              <Col className='form-column' xs={5} sm={5} md={5} lg={5} xl={6}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control size="sm"
                                disabled={!(!coupon)}
                                className="checkout-discount"
                                value={discountCode}
                                onChange={(event) =>
                                  handleOnChangeCouponCode(event.target.value)}
                  />
                  {
                    coupon &&
                      <Col className='coupons-message-col px-0'>
                          <span className='coupons-message'>{coupon.discountPercentage}% OFF ({coupon.title})
                              <X onClick={()=>handleOnRemoveCoupon()} className='remove-coupon-icon' size={'1.2em'}/>
                          </span>
                      </Col>
                  }
                  {
                    couponError &&
                      <Col className='coupons-message-col px-0 text-danger'>
                          <span className='coupons-message'>{couponError}
                          </span>
                      </Col>
                  }
                </Form.Group>
              </Col>
              <Col xs={1} sm={3} md={3} lg={2}>
                <Button disabled={!(!coupon)} className='discount-apply-btn' type='submit'>APPLY
                  <ClipLoader color={'#ffffff'} loading={loading} css={override} size={13}/>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

export default Discount;