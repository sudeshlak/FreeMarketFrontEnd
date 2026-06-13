import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CreateCoupon from "./CreateCoupon";
import CouponPreview from "./CouponPreview";
import { ICoupon } from "../../types/ICoupon";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_COUPONS } from "../../graphQl/coupon/couponQuery";
import { confirmationBox, toast } from "../sweetalert/sweetalert";
import { DELETE_COUPON } from "../../graphQl/coupon/couponMutation";
import SampleCouponPreview from "./SampleCouponPreview";
import { CouponCreateProvider } from "./couponContext";

const Coupons = () => {
  const [coupons, setCoupons] = useState<ICoupon[] | null>(null);
  const { refetch } = useQuery(GET_ALL_COUPONS);
  const [deleteCoupon] = useMutation(DELETE_COUPON);

  async function fetchCoupons() {
    try {
      const response = await refetch();
      if (response.data) {
        setCoupons(response.data.getAllCoupons);
      }
    } catch (error) {
      toast("Failed to load coupons", "", "error");
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const renderCoupons = () => {
    if (!coupons) {
      return [];
    }
    return coupons.map((coupon: ICoupon) => {
      return (
        <CouponPreview
          key={coupon.id}
          coupon={coupon}
          handleOnDeleteCoupon={handleOnDeleteCoupon}
        />
      );
    });
  };

  const handleOnDeleteCoupon = (id: string, title: string) => {
    confirmationBox(
      "Are You sure to delete coupon: " + title,
      "Yes, delete it!",
      "No",
      "You won't be able to revert this!",
      "question",
    ).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          await deleteCoupon({
            variables: {
              id: id,
            },
          });
          toast("Coupon deleted successfully", "", "success");
          fetchCoupons();
        } catch (error) {
          toast("Failed to delete Coupon", "", "error");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Col className="coupons">
        <Row>
          <CouponCreateProvider>
            <CreateCoupon fetchCoupons={fetchCoupons} />
            <SampleCouponPreview />
          </CouponCreateProvider>
        </Row>
        <Row className="mt-3">{renderCoupons()}</Row>
      </Col>
    </React.Fragment>
  );
};

export default Coupons;
