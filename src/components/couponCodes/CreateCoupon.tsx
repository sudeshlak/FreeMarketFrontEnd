import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";
import {ICoupon, IDate} from "../../types/ICoupon";
import {css} from "@emotion/react";
import {ClipLoader} from "react-spinners";
import {useMutation} from "@apollo/client";
import {CREATE_COUPON} from "../../graphQl/coupon/couponMutation";
import {toast} from "../sweetalert/sweetalert";

type CreateCouponProps = {
  setCoupons: (coupon: ICoupon[] | null) => void
  coupons: ICoupon[] | null
}
const CreateCoupon: React.FC<CreateCouponProps> = (props) => {
  const {setCoupons, coupons} = props;
  const [addCoupon] = useMutation(CREATE_COUPON);
  const [couponTitle, setCouponTitle] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponFromDate, setCouponFromDate] = useState<IDate>({
    stringDate: '',
    numberDate: null
  });
  const [couponToDate, setCouponToDate] = useState<IDate>({
    stringDate: '',
    numberDate: null
  });
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState<number | null>(null);
  const [couponTitleError, setCouponTitleError] = useState<string>('');
  const [couponCodeError, setCouponCodeError] = useState<string>('');
  const [couponFromDateError, setCouponFromDateError] = useState<string>('');
  const [couponToDateError, setCouponToDateError] = useState<string>('');
  const [couponDiscountPercentageError, setCouponDiscountPercentageError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const override = css`
    margin-left: 20px;
  `;
  const handleOnSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    addCoupon({
      variables: {
        newCoupon: {
          title: couponTitle,
          fromDate: couponFromDate,
          toDate: couponToDate,
          discountPercentage: couponDiscountPercentage,
          couponCode: couponCode
        }
      }
    }).then(({data}) => {
      if (!coupons) {
        setCoupons([data.addCoupon]);
      } else {
        setCoupons([...coupons, data.addCoupon]);
      }
      setLoading(false);
      clearForm();
    }).catch((error) => {
      toast('Failed to create Coupon', '', 'error');
      setLoading(false);
    });
  }
  const clearForm = () => {
    setCouponTitle('');
    setCouponToDate({stringDate: '', numberDate: null});
    setCouponFromDate({stringDate: '', numberDate: null});
    setCouponCode('');
    setCouponDiscountPercentage(null);

  }
  const validateForm = () => {
    let couponTitleError: string = '';
    let couponCodeError: string = '';
    let couponFromDateError: string = '';
    let couponDiscountPercentageError: string = '';
    let couponToDateError: string = '';
    if (!couponTitle) {
      couponTitleError = 'Required';
    }
    if (!couponFromDate.stringDate) {
      couponFromDateError = 'Required';
    } else if (couponToDate.numberDate && couponFromDate.numberDate &&
      ((couponToDate.numberDate - couponFromDate.numberDate) < 0)) {
      couponToDateError = 'Invalid date';
    }
    if (!couponToDate.stringDate) {
      couponToDateError = 'Required';
    } else if (couponToDate.numberDate && couponFromDate.numberDate &&
      ((couponToDate.numberDate - couponFromDate.numberDate) < 0)) {
      couponToDateError = 'Required';
    }
    if (!couponCode) {
      couponCodeError = 'Required';
    }
    if (!couponDiscountPercentage || couponDiscountPercentage < 1 || couponDiscountPercentage > 100) {
      couponDiscountPercentageError = 'Invalid percentage,Should be between 0-100';
    }
    setCouponTitleError(couponTitleError);
    setCouponFromDateError(couponFromDateError);
    setCouponToDateError(couponToDateError);
    setCouponCodeError(couponCodeError);
    setCouponDiscountPercentageError(couponDiscountPercentageError);
    return !(couponTitleError || couponFromDateError || couponToDateError || couponCodeError
      || couponDiscountPercentageError);
  }

  const generateCouponCode = (length: number) => {
    let result: string = '';
    let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?';
    let charactersLength: number = characters.length;
    for (let i: number = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  const handleOnChangeCouponTitle = (couponTitle: string) => {
    setCouponTitleError('');
    setCouponTitle(couponTitle);
    if (!couponTitle) {
      setCouponTitleError('Required');
    }
  }
  const handleOnChangeFromDate = (fromDate: string, dateAsNumber: number) => {
    setCouponFromDateError('');
    setCouponToDateError('');
    setCouponFromDate({
      stringDate: fromDate,
      numberDate: dateAsNumber
    });
    if (!fromDate) {
      setCouponFromDateError('Required');
    } else if (couponToDate.numberDate && ((couponToDate.numberDate - dateAsNumber) < 0)) {
      setCouponToDateError('Invalid date');
    }
  }
  const handleOnChangeToDate = (toDate: string, dateAsNumber: number) => {
    setCouponToDateError('');
    setCouponToDate({
      stringDate: toDate,
      numberDate: dateAsNumber
    });
    if (!toDate) {
      setCouponToDateError('Required');
    } else if (couponFromDate.numberDate && ((dateAsNumber - couponFromDate.numberDate) < 0)) {
      setCouponToDateError('Invalid date');
    }
  }
  const handleOnClickGenerate = () => {
    setCouponCode(generateCouponCode(8));
    setCouponCodeError('');
  }
  const handleOnChangeCouponDiscountPercentage = (discountPercentage: number | null) => {
    setCouponDiscountPercentageError('');
    setCouponDiscountPercentage(discountPercentage);
    setCouponDiscountPercentageError('')
    if ((discountPercentage && discountPercentage < 0) || (discountPercentage && discountPercentage > 100)) {
      setCouponDiscountPercentageError('Invalid percentage,Should be between 0-100');
    }
  }
  return (
    <React.Fragment>
      <Col xs={12} className='px-0 create-coupon-title'>Create Coupon</Col>
      <Col xs={12} md={6} xl={4} className='create-coupon'>
        <Form onSubmit={handleOnSubmitForm}>
          <Form.Group className="mb-3" controlId="formGroupCouponTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control size='sm'
                          type="text"
                          disabled={loading}
                          value={couponTitle}
                          placeholder="Enter title"
                          onChange={(event) => {
                            handleOnChangeCouponTitle(event.target.value)
                          }}
            />
            <Row><span className='error-message'>{couponTitleError && couponTitleError}</span></Row>
          </Form.Group>
          <Row>
            <Form.Group as={Col} className='pr-0' controlId="formGroupCouponCode">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control size='sm'
                            type="text"
                            value={couponCode}
                            placeholder="Generate coupon code"
                            disabled={true}
              />
              <Row><span className='error-message'>{couponCodeError && couponCodeError}</span></Row>
            </Form.Group>
            <Col xs={4} className='text-end generate-coupon-code-btn-col'>
              <Button className='btn-dark generate-coupon-code-btn'
                      disabled={loading}
                      onClick={() => handleOnClickGenerate()}
              >Generate</Button>
            </Col>
          </Row>
          <Form.Group as={Col} className='px-0' controlId="formGroupCouponDiscountPercentage">
            <Form.Label>Discount Percentage</Form.Label>
            <NumberFormat className='form-control py-1'
                          suffix='%'
                          disabled={loading}
                          onValueChange={(values) => {
                            handleOnChangeCouponDiscountPercentage(values.floatValue ? values.floatValue : null)
                          }}
                          value={couponDiscountPercentage ? couponDiscountPercentage : ''}
            />
            <Row><span
              className='error-message'>{couponDiscountPercentageError && couponDiscountPercentageError}</span></Row>
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Valid from</Form.Label>
              <Form.Control size='sm'
                            type="date"
                            disabled={loading}
                            value={couponFromDate.stringDate}
                            onChange={(event) => {
                              handleOnChangeFromDate(event.target.value, (event.target as HTMLInputElement).valueAsNumber)
                            }}
              />
              <Row><span className='error-message'>{couponFromDateError && couponFromDateError}</span></Row>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Valid to</Form.Label>
              <Form.Control size='sm'
                            type="date"
                            disabled={loading}
                            value={couponToDate.stringDate}
                            onChange={(event) => {
                              handleOnChangeToDate(event.target.value, (event.target as HTMLInputElement).valueAsNumber)
                            }}
              />
              <Row><span className='error-message'>{couponToDateError && couponToDateError}</span></Row>
            </Form.Group>
          </Row>
          <Row className='my-2'>
            <Col className='text-end'>
              <Button type='submit' className='btn-success create-coupon-btn'>Create Coupon
                <ClipLoader color={'#ffffff'} loading={loading} css={override} size={13}/>
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </React.Fragment>
  );
};

export default CreateCoupon;