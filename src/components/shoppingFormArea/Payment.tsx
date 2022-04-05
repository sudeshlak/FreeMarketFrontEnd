import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {AppState} from "../../state/reducers";
import {changeFormData} from "../../state/actions/shippingFormActions";

type PaymentMethodsProps = {
  loading: boolean
};

const Payment: React.FC<PaymentMethodsProps> = (props) => {
    const dispatch = useDispatch();
    const {loading} = props;
    const shippingForm: IShippingForm = useSelector((state: AppState) => state.shippingForm);

    const handleOnClickCredit = () => {
      if (loading) {
        return;
      }
      dispatch(changeFormData({key: 'paymentMethode', value: 'onlinePayment'}));
      dispatch(changeFormData({key: 'paymentMethodeError', value: ''}));
    };

    const handleOnClickMoney = () => {
      if (loading) {
        return;
      }
      dispatch(changeFormData({key: 'paymentMethode', value: 'cashOnDelivery'}));
      dispatch(changeFormData({key: 'paymentMethodeError', value: ''}));
    };

    return (
      <div className="payment-method-main-text">
        <h5>Payment Methods</h5>
        <Row className='flex-fill justify-content-around'>
          <Col xs={11} sm={5}
               className={"mt-2 credit-card-bg " + (shippingForm.paymentMethode === "onlinePayment" && "selected-card")}
               onClick={handleOnClickCredit}>
            <i className="far fa-credit-card"/>
            <div>
              <label className="payment-label-name">Credit/Debit Card</label>
            </div>
          </Col>
          <Col xs={11} sm={5}
               className={"mt-2 credit-card-bg " + (shippingForm.paymentMethode === "cashOnDelivery" && "selected-card")}
               onClick={handleOnClickMoney}>
            <i className="far fa-money-bill-alt"/>
            <div>
              <label className="payment-label-name">Cash on Delivery</label>
            </div>
          </Col>
          <div>

            {shippingForm.paymentMethodeError &&
            <span className="validate-payment-method"> Please select your payment method</span>
            }
          </div>
        </Row>
      </div>
    )
  }
;

export default Payment;