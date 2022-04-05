import React, {useState} from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {Eye, EyeOff} from "react-feather"
import PasswordStrength from "./PasswordStrength";
import {useDispatch, useSelector} from "react-redux";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {AppState} from "../../state/reducers";
import {changeFormData} from "../../state/actions/shippingFormActions";
import {calcStrength} from "./validations";

type BillingAddressFormPwdProps = {
  loading: boolean
}
const BillingAddressFormPwd: React.FC<BillingAddressFormPwdProps> = (props) => {
  const {loading} = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const shippingForm: IShippingForm = useSelector((state: AppState) => state.shippingForm);

  const handleOnShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordChange = (password: string) => {
    dispatch(changeFormData({key: 'passWord', value: password}));
    if (calcStrength(password)<5) {
      dispatch(changeFormData({key: 'passWordError', value: 'Use strong password'}));
      return;
    }
    dispatch(changeFormData({key: 'passWordError', value: ''}));
  };

  return (
    <React.Fragment>
      <Form.Row className='password-area'>
        <Form.Group as={Col} xs={12} sm={12} className='password-group' controlId={'billingAddressPassword'}>
          <Form.Label>Choose your password</Form.Label>
          <InputGroup className='password-append'>
            <Form.Control
              value={shippingForm.passWord}
              disabled={loading}
              required
              type={isPasswordVisible ? 'text' : 'password'}
              className='append-control'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text onClick={handleOnShowPassword}>
                <i className='eye-icon'>
                  {isPasswordVisible ? <Eye className='icon'/> : <EyeOff/>}
                </i>
              </InputGroup.Text>
            </InputGroup.Append>
            <Form.Control.Feedback
              type="invalid">
              Please type a strong password
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row className='password-strength'>
        <PasswordStrength password={shippingForm.passWord}/>
      </Form.Row>
      <Form.Row className='error-message pl-1'>
        {shippingForm.passWordError && shippingForm.passWordError}
      </Form.Row>
    </React.Fragment>
  );
}

export default BillingAddressFormPwd;