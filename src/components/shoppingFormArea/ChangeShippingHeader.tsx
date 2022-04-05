import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import ChangingShippingAddress from "./ChangingShippingAddress";
import {useDispatch, useSelector} from "react-redux";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {AppState} from "../../state/reducers";
import {changeFormData} from "../../state/actions/shippingFormActions";

type ChangeShippingHeaderProps = {
  loading: boolean
}

const ChangeShippingHeader: React.FC<ChangeShippingHeaderProps> = (props) => {
  const dispatch = useDispatch();
  const {loading} = props;
  const shippingForm: IShippingForm = useSelector((state: AppState) => state.shippingForm);

  const handleSetAddressOption = (sameAddress: boolean) => {
    dispatch(changeFormData({key: 'changeShippingAddress', value: sameAddress}));
  };

  return (
    <Row className='change-shipping-address-area'>
      <Col xs={12} sm={12} className='pt-4 change-shipping-header'>
        <p className='address-title'>Change Shipping Address</p>
      </Col>
      <Col xs={12} sm={12} className='mb-3 address-radio-area'>
        <Form.Check
          type='radio'
          name='address-group'
          label='Same as user address'
          id='same'
          disabled={loading}
          className='form-check'
          custom
          defaultChecked={!shippingForm.changeShippingAddress}
          onClick={() => handleSetAddressOption(false)}
        />
        <Form.Check
          type='radio'
          name='address-group'
          disabled={loading}
          label='Change shipping address'
          id='other'
          className='form-check'
          custom
          defaultChecked={shippingForm.changeShippingAddress}
          onClick={() => handleSetAddressOption(true)}
        />
      </Col>
      {shippingForm.changeShippingAddress && <Col xs={12} className='other-address'>
          <ChangingShippingAddress loading={loading}/>
      </Col>}
    </Row>
  );
};

export default ChangeShippingHeader;