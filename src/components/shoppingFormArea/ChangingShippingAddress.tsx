import React from "react";
import {Col, Form, FormControl, Image, InputGroup, Row} from "react-bootstrap";
import Select from 'react-select';
import {CountrySelect} from "../../types/ShoppingAreaTypes";
import {customStyles} from "../../constants/ShippingForm";
import {useDispatch, useSelector} from "react-redux";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {AppState} from "../../state/reducers";
import {changeFormData} from "../../state/actions/shippingFormActions";
import {isNotEmpty, validateOnlyLetters, validateOnlyNumbers, validateOnlyNumbersAndLetters} from "./validations";

type ChangingShippingAddressProps = {
  loading: boolean
};

const ChangingShippingAddress: React.FC<ChangingShippingAddressProps> = (props) => {
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

  const handleOnChangeAddress = (address: string) => {
    dispatch(changeFormData({key: 'otherAddressBillingAddress', value: address}));
    if (!validateOnlyNumbersAndLetters(address)) {
      dispatch(changeFormData({key: 'otherAddressBillingAddressError', value: 'Enter valid address'}));
      return;
    }
    dispatch(changeFormData({key: 'otherAddressBillingAddressError', value: ''}));
  }

  const handleOnChangeCity = (city: string) => {
    dispatch(changeFormData({key: 'otherAddressCity', value: city}));
    if (!validateOnlyLetters(city)) {
      dispatch(changeFormData({key: 'otherAddressCityError', value: 'Enter valid city'}));
      return;
    }
    dispatch(changeFormData({key: 'otherAddressCityError', value: ''}));
  }

  const handleOnChangePostalCode = (postalCode: string) => {
    dispatch(changeFormData({key: 'otherAddressPostelCode', value: postalCode}));
    if (!isNotEmpty(postalCode)) {
      dispatch(changeFormData({key: 'otherAddressPostelCodeError', value: 'Enter valid postal code'}));
      return;
    }
    dispatch(changeFormData({key: 'otherAddressPostelCodeError', value: ''}));
  }
  const handleOnChangeContactNumber = (contactNumber: string) => {
    dispatch(changeFormData({key: 'otherAddressContactNumber', value: contactNumber}));
    if (!validateOnlyNumbers(contactNumber)) {
      dispatch(changeFormData({key: 'otherAddressContactNumberError', value: 'Enter valid contact number'}));
      return;
    }
    dispatch(changeFormData({key: 'otherAddressContactNumberError', value: ''}));
  }

  const handleOnChangeName = (name: string) => {
    dispatch(changeFormData({key: 'otherAddressName', value: name}));
    if (!validateOnlyLetters(name)) {
      dispatch(changeFormData({key: 'otherAddressNameError', value: 'Enter valid name'}));
      return;
    }
    dispatch(changeFormData({key: 'otherAddressNameError', value: ''}));
  }

  const countrySelect: CountrySelect[] = Country.map(
    (country) => {
      return {value: country.value, label: country.label}
    }
  );

  const countryCode = () => {
    if (shippingForm.otherAddressCountry?.value === 'United States of America') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg"/><span
        className="country-code">+1</span></div>;
    } else if (shippingForm.otherAddressCountry?.value === 'Australia') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/as.svg"/><span
        className="country-code">+61</span></div>;
    } else if (shippingForm.otherAddressCountry?.value === 'Sri Lanka') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/lk.svg"/><span
        className="country-code">+94</span></div>;
    } else if (shippingForm.otherAddressCountry?.value === 'Singapore') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/sg.svg"/><span
        className="country-code">+65</span></div>;
    } else if (shippingForm.otherAddressCountry?.value === 'India') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/in.svg"/><span
        className="country-code">+91</span></div>;
    }
  }

  const handleOnCountry = (country: CountrySelect | null) => {
    if (!country) {
      return;
    }
    dispatch(changeFormData({key: 'otherAddressCountry', value: country}));
  };

  return (
    <div className='billing-address-form'>
      <Form>
        <Form.Group controlId="fullName">
          <Form.Label>Name*</Form.Label>
          <Form.Control type="text"
                        placeholder="Name"
                        disabled={loading}
                        required
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        value={shippingForm.otherAddressName}
                        onChange={(event) => {
                          handleOnChangeName(event.target.value)
                        }}
          />
          <Row>
            <span className='error-message'>
              {shippingForm.otherAddressNameError && shippingForm.otherAddressNameError}
            </span>
          </Row>
        </Form.Group>

        <Form.Group controlId="formGridAddress">
          <Form.Label>Billing Address*</Form.Label>
          <Form.Control placeholder="Billing Address"
                        required
                        disabled={loading}
                        value={shippingForm.otherAddressBillingAddress}
                        onChange={(event) => {
                          handleOnChangeAddress(event.target.value)
                        }}
          />
          <Row>
            <span className='error-message'>
              {shippingForm.otherAddressBillingAddressError && shippingForm.otherAddressBillingAddressError}
            </span>
          </Row>
        </Form.Group>

        <Form.Row className="city-postal-country-input">
          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridCity" className="city-input">
            <Form.Label>City / suburb*</Form.Label>
            <Form.Control placeholder="City / suburb"
                          required
                          disabled={loading}
                          pattern="[A-Za-z\s]*$"
                          value={shippingForm.otherAddressCity}
                          onChange={(event) => {
                            handleOnChangeCity(event.target.value)
                          }}
            />
            <Row>
            <span className='error-message'>
              {shippingForm.otherAddressCityError && shippingForm.otherAddressCityError}
            </span>
            </Row>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridZip" className="postal-code-input">
            <Form.Label>Postal Code*</Form.Label>
            <Form.Control placeholder="Postal Code"
                          required
                          disabled={loading}
                          pattern="[0-9]*$"
                          value={shippingForm.otherAddressPostelCode}
                          onChange={(event) => {
                            handleOnChangePostalCode(event.target.value)
                          }}
            />
            <Row>
            <span className='error-message'>
              {shippingForm.otherAddressPostelCodeError && shippingForm.otherAddressPostelCodeError}
            </span>
            </Row>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridCountry" className='select-country'>
            <Form.Label>Country</Form.Label>
            <Select options={countrySelect}
                    allowCreateWhileLoading
                    isDisabled={loading}
                    isClearable={false}
                    isSearchable={true}
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
                    defaultValue={shippingForm.otherAddressCountry}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className='contact-number'>
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number*</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  {countryCode()}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl required
                           disabled={loading}
                           type="tel"
                           pattern="^\d{10}$"
                           value={shippingForm.otherAddressContactNumber}
                           onChange={(event) => {
                             handleOnChangeContactNumber(event.target.value)
                           }}
              />
            </InputGroup>
            <Row>
                <span className='error-message'>
                 {shippingForm.otherAddressContactNumberError && shippingForm.otherAddressContactNumberError}
                </span>
            </Row>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
};

export default ChangingShippingAddress;