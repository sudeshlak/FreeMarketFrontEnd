import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import CreateCoupon from "./CreateCoupon";
import CouponPreview from "./CouponPreview";
import {ICoupon} from "../../types/ICoupon";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_COUPONS} from "../../graphQl/coupon/couponQuery";
import {confirmationBox, toast} from "../sweetalert/sweetalert";
import {DELETE_COUPON} from "../../graphQl/coupon/couponMutation";

const Coupons = () => {
  const [coupons, setCoupons] = useState<ICoupon[] | null>(null);
  const {refetch} = useQuery(GET_ALL_COUPONS);
  const [deleteCoupon] = useMutation(DELETE_COUPON);
  useEffect(() => {
    refetch().then(({data}) => {
      if (data) {
        setCoupons(data.getAllCoupons);
      }
    }).catch((error) => {
      toast('Failed to load coupons', '', 'error');
    })
  }, [refetch]);

  const renderCoupons = () => {
    if (!coupons) {
      return [];
    }
    return coupons.map((coupon: ICoupon) => {
      return <CouponPreview key={coupon.id}
                            coupon={coupon}
                            handleOnDeleteCoupon={handleOnDeleteCoupon}/>
    })
  }
  const handleOnDeleteCoupon = (id: string, title: string) => {
    confirmationBox('Are You sure to delete coupon: ' + title,
      'Yes, delete it!',
      'No',
      'You won\'t be able to revert this!',
      'question').then(({isConfirmed}) => {
      if (isConfirmed) {
        deleteCoupon({
          variables: {
            id: id,
          }
        }).then(async ({data}) => {
          if (data) {
            if (coupons) {
              setCoupons(coupons.filter((coupon: ICoupon) => {
                return coupon.id !== data.deleteCoupon.id
              }));
            }
            toast('Coupon :' + data.deleteCoupon.title + ' deleted successfully', '', 'success');
          }
        }).catch((error) => {
          toast('Failed to delete Coupon', '', 'error');
        });
      }
    })
  }
  return (
    <React.Fragment>
      <Col className='coupons'>
        <Row>
          <CreateCoupon setCoupons={setCoupons}
                        coupons={coupons}/>
        </Row>
        <Row className='mt-3'>
          {renderCoupons()}
        </Row>
      </Col>
    </React.Fragment>
  );
}

export default Coupons;