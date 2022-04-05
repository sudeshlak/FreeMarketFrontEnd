import React, {useState} from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {Eye, EyeOff} from "react-feather"
import PasswordStrength from "./PasswordStrength";

type BillingAddressFormPwdProps = {
  password : string
  handlePassword: (inputpassword: string ) => void
  loading: boolean
};

const BillingAddressFormPwd: React.FC<BillingAddressFormPwdProps> = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {loading} = props;

  const handleOnShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordChange = (password: string) => {
    props.handlePassword(password);
  };

  return (
    <React.Fragment>
      <Form.Row className='password-area pt-1'>
        <Form.Group as={Col} xs={12} sm={12} className='password-group pr-0' controlId='validationCustomPassword'>
          <Form.Label>Choose your password*</Form.Label>
          <InputGroup className='password-append'>
            <Form.Control
              required
              type={isPasswordVisible ? 'text' : 'password'}
              disabled={loading}
              value={props.password ? props.password : ''}
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
        <PasswordStrength password={props.password}/>
      </Form.Row>
    </React.Fragment>
  );
}

export default BillingAddressFormPwd;