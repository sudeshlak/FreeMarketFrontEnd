import React from 'react';
import {Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {AppState} from "../../state/reducers";
import {changeFormData} from "../../state/actions/shippingFormActions";

type DeliveryInstructionsProps = {
  loading: boolean
};
const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = (props) => {
  const dispatch = useDispatch();
  const {loading} = props;
  const shippingForm: IShippingForm = useSelector((state: AppState) => state.shippingForm);
  const handleOnChangeDeliveryInstructions = (deliveryInstructions: string) => {
    dispatch(changeFormData({key: 'deliveryInstructions', value: deliveryInstructions}))
  }
  return (
    <Row className='delivery-instructions-area'>
      <div className='mt-1 mb-3'>
        <p className='address-title'>Add Delivery Instructions (Optional)</p>
        <Form.Control as="textarea"
                      rows={3}
                      disabled={loading}
                      value={shippingForm.deliveryInstructions}
                      onChange={(event) => {
                        handleOnChangeDeliveryInstructions(event.target.value)
                      }}
        />
      </div>
    </Row>
  );
};

export default DeliveryInstructions;