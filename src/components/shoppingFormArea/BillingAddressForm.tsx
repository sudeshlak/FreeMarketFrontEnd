import React from "react";
import {Col, Form, FormControl, Image, InputGroup, Row} from "react-bootstrap";
import Select from 'react-select';
import {CountrySelect} from "../../types/ShoppingAreaTypes";
import BillingAddressFormPwd from "./BillingAddressFormPwd";
import {customStyles} from "../../constants/ShippingForm";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import {changeFormData} from "../../state/actions/shippingFormActions";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {
  isNotEmpty,
  validateEmail,
  validateOnlyLetters,
  validateOnlyNumbers,
  validateOnlyNumbersAndLetters
} from "./validations";

type BillingAddressFormProps = {
  loading: boolean
};

const BillingAddressForm: React.FC<BillingAddressFormProps> = (props) => {
  const dispatch = useDispatch();
  const {loading} = props;
  const shippingForm: IShippingForm = useSelector((state: AppState) => state.shippingForm);

  const Country: CountrySelect[] = [
    {value: 'United States of America', label: 'United States of America'},
    {value: 'Australia', label: 'Australia'},
    {value: 'Sri Lanka', label: 'Sri Lanka'},
    {value: 'Singapore', label: 'Singapore'},
    {value: 'India', label: 'India'}
  ];

  const countryCode = () => {
    if (shippingForm.country?.value === 'United States of America') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg"/><span
        className="country-code">+1</span></div>;
    } else if (shippingForm.country?.value === 'Australia') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/as.svg"/><span
        className="country-code">+61</span></div>;
    } else if (shippingForm.country?.value === 'Sri Lanka') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/lk.svg"/><span
        className="country-code">+94</span></div>;
    } else if (shippingForm.country?.value === 'Singapore') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/sg.svg"/><span
        className="country-code">+65</span></div>;
    } else if (shippingForm.country?.value === 'India') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/in.svg"/><span
        className="country-code">+91</span></div>;
    }
  }

  const countrySelect: CountrySelect[] = Country.map(
    (country) => {
      return {value: country.value, label: country.label}
    }
  );

  const handleOnCountry = (country: CountrySelect | null) => {
    if (!country) {
      return;
    }
    dispatch(changeFormData({key: 'country', value: country}));
  }

  const handleOnEmailChanged = (inputEmail: string) => {
    dispatch(changeFormData({key: 'email', value: inputEmail}));
    if (!validateEmail(inputEmail)) {
      dispatch(changeFormData({key: 'emailError', value: 'Enter valid email address'}));
      return;
    }
    dispatch(changeFormData({key: 'emailError', value: ''}));
  }

  const handleOnCityChanged = (inputCity: string) => {
    dispatch(changeFormData({key: 'city', value: inputCity}));
    if (!validateOnlyLetters(inputCity)) {
      dispatch(changeFormData({key: 'cityError', value: 'Enter valid city'}));
      return;
    }
    dispatch(changeFormData({key: 'cityError', value: ''}));
  }

  const handleOnAddressChanged = (inputAddress: string) => {
    dispatch(changeFormData({key: 'address', value: inputAddress}));
    if (!validateOnlyNumbersAndLetters(inputAddress)) {
      dispatch(changeFormData({key: 'addressError', value: 'Enter valid address'}));
      return;
    }
    dispatch(changeFormData({key: 'addressError', value: ''}));
  }

  const handleOnPostalCodeChanged = (inputPostalCode: string) => {
    dispatch(changeFormData({key: 'postalCode', value: inputPostalCode}));
    if (!isNotEmpty(inputPostalCode)) {
      dispatch(changeFormData({key: 'postalCodeError', value: 'Enter valid postal code'}));
      return;
    }
    dispatch(changeFormData({key: 'postalCodeError', value: ''}));
  }

  const handleOnFullNameChanged = (inputFullName: string) => {
    dispatch(changeFormData({key: 'fullName', value: inputFullName}));
    if (!validateOnlyLetters(inputFullName)) {
      dispatch(changeFormData({key: 'fullNameError', value: 'Enter valid full name'}));
      return;
    }
    dispatch(changeFormData({key: 'fullNameError', value: ''}));
  }

  const handleOnContactNumberChanged = (inputContactNumber: string) => {
    dispatch(changeFormData({key: 'contactNumber', value: inputContactNumber}));
    if (!validateOnlyNumbers(inputContactNumber)) {
      dispatch(changeFormData({key: 'contactNumberError', value: 'Enter valid contact number'}));
      return;
    }
    dispatch(changeFormData({key: 'contactNumberError', value: ''}));
  }

  const handleOnReEmailChanged = (inputReEmail: string) => {
    dispatch(changeFormData({key: 'retypeEmail', value: inputReEmail}));
    if (shippingForm.email !== inputReEmail && shippingForm.email !== null) {
      dispatch(changeFormData({key: 'retypeEmailError', value: 'Email and Retype Email should be equal'}));
      return;
    }
    dispatch(changeFormData({key: 'retypeEmailError', value: ''}));
  };

  return (
    <div className='billing-address-form'>
      <Form>
        <Form.Group controlId="billingAddressFullName">
          <Form.Label>Full Name*</Form.Label>
          <Form.Control value={shippingForm.fullName}
                        disabled={loading}
                        type="text"
                        placeholder="Your Full Name"
                        required
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnFullNameChanged(event.target.value)}
          />
          <Row>
            <span className='error-message'>
              {shippingForm.fullNameError && shippingForm.fullNameError}
            </span>
          </Row>
        </Form.Group>

        <Form.Group controlId="billingAddressAddress">
          <Form.Label>Address*</Form.Label>
          <Form.Control placeholder="Street Address"
                        required
                        disabled={loading}
                        value={shippingForm.address}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnAddressChanged(event.target.value)}
          />
          <Row>
            <span className='error-message'>
              {shippingForm.addressError && shippingForm.addressError}
            </span>
          </Row>
        </Form.Group>

        <Form.Row className="city-postal-country-input">
          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="billingAddressCity" className="city-input">
            <Form.Label>City / suburb*</Form.Label>
            <Form.Control placeholder="City / suburb"
                          required
                          disabled={loading}
                          pattern="[A-Za-z\s]*$"
                          value={shippingForm.city}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnCityChanged(event.target.value)}

            />
            <Row>
              <span className='error-message'>
                {shippingForm.cityError && shippingForm.cityError}
              </span>
            </Row>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridPostalCode" className="postal-code-input">
            <Form.Label>Postal Code*</Form.Label>
            <Form.Control placeholder="Postal Code"
                          required
                          disabled={loading}
                          pattern="[0-9]*$"
                          value={shippingForm.postalCode}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnPostalCodeChanged(event.target.value)}
            />
            <Row>
              <span className='error-message'>
                {shippingForm.postalCodeError && shippingForm.postalCodeError}
              </span>
            </Row>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="billingAddressCountry" className='select-country'>
            <Form.Label>Country</Form.Label>
            <Select options={countrySelect}
                    allowCreateWhileLoading
                    isClearable={false}
                    isSearchable={true}
                    isDisabled={loading}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      borderWidth: .5,
                      colors: {
                        ...theme.colors,
                        primary25: '#f5f5f5',
                        primary: '#456cd2',
                      },
                    })}
                    styles={customStyles}
                    onChange={(selected: CountrySelect | null) => {
                      handleOnCountry(selected)
                    }
                    }
                    defaultValue={shippingForm.country}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className='contact-number'>
          <Form.Group controlId="billingAddressContactNumber">
            <Form.Label>Contact Number*</Form.Label>
            <InputGroup className="mb-1">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  {countryCode()}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                disabled={loading}
                type="tel"
                pattern="^\d{10}$"
                value={shippingForm.contactNumber ? shippingForm.contactNumber : ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnContactNumberChanged(event.target.value)}
              />
            </InputGroup>
            <Row>
                <span className='error-message'>
                  {shippingForm.contactNumberError && shippingForm.contactNumberError}
                </span>
            </Row>
          </Form.Group>
        </Form.Row>

        <Form.Row className='email-area'
        >
          <Form.Group as={Col} xs={12} sm={12} md={6} controlId="formGridEmail" className="email">
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email"
                          placeholder="Email"
                          required
                          disabled={loading}
                          value={shippingForm.email ? shippingForm.email : ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnEmailChanged(event.target.value)}
            />
            <Row>
              <span className='error-message'>
                {shippingForm.emailError && shippingForm.emailError}
              </span>
            </Row>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={6} controlId="formGridRetypeEmail" className="re-email">
            <Form.Label>Retype Email*</Form.Label>
            <Form.Control type="email"
                          required
                          disabled={loading}
                          value={shippingForm.retypeEmail}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnReEmailChanged(event.target.value)}
            />
            <Row>
              <span className='error-message'>
                {shippingForm.retypeEmailError && shippingForm.retypeEmailError}
              </span>
            </Row>
          </Form.Group>
        </Form.Row>
        <BillingAddressFormPwd loading={loading}/>
      </Form>
    </div>
  );
};

export default BillingAddressForm;