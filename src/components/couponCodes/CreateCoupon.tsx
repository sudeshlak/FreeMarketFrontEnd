import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { ICouponState } from "../../types/ICoupon";
import { ClipLoader } from "react-spinners";
import { useMutation } from "@apollo/client";
import { CREATE_COUPON } from "../../graphQl/coupon/couponMutation";
import { toast } from "../sweetalert/sweetalert";
import {
  useCouponCreateContext,
  useCouponCreateDispatchContext,
} from "./couponContext";

type CreateCouponProps = {
  fetchCoupons: () => void;
};
const CreateCoupon: React.FC<CreateCouponProps> = (props) => {
  const dispatch = useCouponCreateDispatchContext();
  const couponState: ICouponState | null = useCouponCreateContext();
  const { fetchCoupons } = props;
  const [addCoupon] = useMutation(CREATE_COUPON);
  const [loading, setLoading] = useState<boolean>(false);

  const override = {
    marginLeft: "20px",
  };

  const handleOnSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      await addCoupon({
        variables: {
          newCoupon: {
            title: couponState.title.value,
            fromDate: couponState.fromDate.stringDate,
            toDate: couponState.toDate.stringDate,
            discountPercentage: couponState.discountPercentage.value,
            couponCode: couponState.couponCode.value,
          },
        },
      });
      clearForm();
      setLoading(false);
      fetchCoupons();
    } catch (error) {
      toast("Failed to create Coupon", "", "error");
      setLoading(false);
    }
  };

  const clearForm = () => {
    dispatch({ type: "clearForm" });
  };

  const validateForm = () => {
    let couponTitleError: string = "";
    let couponCodeError: string = "";
    let couponFromDateError: string = "";
    let couponDiscountPercentageError: string = "";
    let couponToDateError: string = "";
    if (!couponState.title.value) {
      couponTitleError = "Required";
    }
    if (!couponState.toDate.stringDate) {
      couponToDateError = "Required";
    }
    if (!couponState.fromDate.stringDate) {
      couponFromDateError = "Required";
    }
    if (
      couponState.toDate.numberDate &&
      couponState.fromDate.numberDate &&
      couponState.toDate.numberDate - couponState.fromDate.numberDate < 0
    ) {
      couponToDateError = "Invalid date";
      couponFromDateError = "Invalid date";
    }
    if (!couponState.couponCode.value) {
      couponCodeError = "Required";
    }
    if (
      !couponState.discountPercentage.value ||
      couponState.discountPercentage.value < 1 ||
      couponState.discountPercentage.value > 100
    ) {
      couponDiscountPercentageError =
        "Invalid percentage,Should be between 0-100";
    }
    return !(
      couponTitleError ||
      couponFromDateError ||
      couponToDateError ||
      couponCodeError ||
      couponDiscountPercentageError
    );
  };

  const generateCouponCode = (length: number) => {
    let result: string = "";
    let characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";
    let charactersLength: number = characters.length;
    for (let i: number = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleOnChangeCouponTitle = (couponTitle: string) => {
    dispatch({
      type: "setTitle",
      payload: {
        value: couponTitle,
        error: !couponTitle ? "Required" : "",
      },
    });
  };

  const handleOnChangeFromDate = (fromDate: string, dateAsNumber: number) => {
    let fromDateError: string = "";
    if (!fromDate) {
      fromDateError = "Required";
    } else if (
      couponState.toDate.numberDate &&
      couponState.toDate.numberDate - dateAsNumber < 0
    ) {
      fromDateError = "Invalid date";
    }
    dispatch({
      type: "setFromDate",
      payload: {
        stringDate: fromDate,
        numberDate: dateAsNumber,
        error: fromDateError,
      },
    });
  };

  const handleOnChangeToDate = (toDate: string, dateAsNumber: number) => {
    let toDateError: string = "";
    if (!toDate) {
      toDateError = "Required";
    } else if (
      couponState.fromDate.numberDate &&
      dateAsNumber - couponState.fromDate.numberDate < 0
    ) {
      toDateError = "Invalid date";
    }
    dispatch({
      type: "setToDate",
      payload: {
        stringDate: toDate,
        numberDate: dateAsNumber,
        error: toDateError,
      },
    });
  };

  const handleOnClickGenerate = () => {
    dispatch({
      type: "setCouponCode",
      payload: {
        value: generateCouponCode(8),
        error: "",
      },
    });
  };

  const handleOnChangeCouponDiscountPercentage = (
    discountPercentage: number | null,
  ) => {
    let discountPercentageError: string = "";
    if (!discountPercentage) {
      discountPercentageError = "Required";
    } else if (discountPercentage < 0 || discountPercentage > 100) {
      discountPercentageError = "Invalid percentage,Should be between 0-100";
    }
    dispatch({
      type: "setDiscountPercentage",
      payload: {
        value: discountPercentage,
        error: discountPercentageError,
      },
    });
  };

  return (
    <React.Fragment>
      <Col xs={12} className="px-0 create-coupon-title">
        Create Coupon
      </Col>
      <Col xs={12} md={6} xl={4} className="create-coupon">
        <Form onSubmit={handleOnSubmitForm}>
          <Form.Group className="mb-3" controlId="formGroupCouponTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              disabled={loading}
              value={couponState.title.value}
              placeholder="Enter title"
              onChange={(event) => {
                handleOnChangeCouponTitle(event.target.value);
              }}
            />
            <Row>
              <span className="error-message">{couponState.title.error}</span>
            </Row>
          </Form.Group>
          <Row>
            <Form.Group
              as={Col}
              className="pr-0"
              controlId="formGroupCouponCode"
            >
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={couponState.couponCode.value}
                placeholder="Generate coupon code"
                disabled={true}
              />
              <Row>
                <span className="error-message">
                  {couponState.couponCode.error}
                </span>
              </Row>
            </Form.Group>
            <Col xs={4} className="text-end generate-coupon-code-btn-col">
              <Button
                className="btn-dark generate-coupon-code-btn"
                disabled={loading}
                onClick={() => handleOnClickGenerate()}
              >
                Generate
              </Button>
            </Col>
          </Row>
          <Form.Group
            as={Col}
            className="px-0"
            controlId="formGroupCouponDiscountPercentage"
          >
            <Form.Label>Discount Percentage</Form.Label>
            <NumberFormat
              className="form-control py-1"
              suffix="%"
              disabled={loading}
              onValueChange={(values) => {
                handleOnChangeCouponDiscountPercentage(
                  values.floatValue ? values.floatValue : null,
                );
              }}
              value={couponState.discountPercentage.value}
            />
            <Row>
              <span className="error-message">
                {couponState.discountPercentage.error}
              </span>
            </Row>
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Valid from</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                disabled={loading}
                value={couponState.fromDate.stringDate}
                onChange={(event) => {
                  handleOnChangeFromDate(
                    event.target.value,
                    (event.target as HTMLInputElement).valueAsNumber,
                  );
                }}
              />
              <Row>
                <span className="error-message">
                  {couponState.fromDate.error}
                </span>
              </Row>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Valid to</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                disabled={loading}
                value={couponState.toDate.stringDate}
                onChange={(event) => {
                  handleOnChangeToDate(
                    event.target.value,
                    (event.target as HTMLInputElement).valueAsNumber,
                  );
                }}
              />
              <Row>
                <span className="error-message">
                  {couponState.toDate.error}
                </span>
              </Row>
            </Form.Group>
          </Row>
          <Row className="my-2">
            <Col className="text-end">
              <Button type="submit" className="btn-success create-coupon-btn">
                Create Coupon
                <ClipLoader
                  color={"#ffffff"}
                  loading={loading}
                  cssOverride={override}
                  size={13}
                />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </React.Fragment>
  );
};

export default CreateCoupon;
