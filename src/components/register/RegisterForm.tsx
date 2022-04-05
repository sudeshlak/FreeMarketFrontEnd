import React, {useState} from "react";
import {Button, Col, Form, FormControl, Image, InputGroup} from "react-bootstrap";
import Select from 'react-select';
import {CountrySelect} from "../../types/ShoppingAreaTypes";
import FormPwd from "./FormPwd";
import {customStyles} from "../../constants/RegisterTypes";
import {ADD_USER, TOKEN} from "../../graphQl/users/userMutation";
import {useMutation} from "@apollo/client";
import {toast} from "../sweetalert/sweetalert";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeLoginState} from "../../state/actions/loginActions";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";

const RegisterForm: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<null | string>(null);
  const [address, setAddress] = useState<null | string>(null);
  const [city, setCity] = useState<null | string>(null);
  const [postalCode, setPostalCode] = useState<null | string>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountrySelect>
  ({value: 'Sri Lanka', label: 'Sri Lanka'});
  const [contactNumber, setContactNumber] = useState<null | string>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const [addUser] = useMutation(ADD_USER);
  const [token] = useMutation(TOKEN);
  const dispatch = useDispatch();
  const override = css`margin-left: 16px;`;
  const [loading, setLoading] = useState<boolean>(false);

  const Country: CountrySelect[] = [
    {value: 'United States of America', label: 'United States of America'},
    {value: 'Australia', label: 'Australia'},
    {value: 'Sri Lanka', label: 'Sri Lanka'},
    {value: 'Singapore', label: 'Singapore'},
    {value: 'India', label: 'India'}
  ];

  const countrySelect: CountrySelect[] = Country.map(
    (country: CountrySelect) => {
      return {value: country.value, label: country.label}
    }
  );

  const countryCode = () => {
    if (selectedCountry?.value === 'United States of America') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg"/>+1</div>;
    } else if (selectedCountry?.value === 'Australia') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/as.svg"/>+61</div>;
    } else if (selectedCountry?.value === 'Sri Lanka') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/lk.svg"/>+94</div>;
    } else if (selectedCountry?.value === 'Singapore') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/sg.svg"/>+65</div>;
    } else if (selectedCountry?.value === 'India') {
      return <div><Image src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/in.svg"/>+91</div>;
    }
  };

  const clearForm = () => {
    setName(null);
    setAddress(null);
    setCity(null);
    setPostalCode(null);
    setSelectedCountry({value: 'Sri Lanka', label: 'Sri Lanka'});
    setContactNumber(null);
    setEmail(null);
    setPassword('');
  };

  const registerUser = async () => {
    return await addUser({
      variables: {
        newUser: {
          name: name,
          address: address,
          city: city,
          postalCode: postalCode,
          phoneNumber: contactNumber,
          email: email,
          password: password,
          country: selectedCountry.value,
          type: 'user'
        }
      }
    })
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    setLoading(true);

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      setLoading(false);
      return;
    }
    registerUser().then(async ({data}) => {
      if (data) {
        token({
          variables: {
            email: data.addUser.email
          }
        }).then(({data}) => {
          localStorage.setItem('token', data.token);
          dispatch(changeLoginState({login: true, type: 'user'}));
          setLoading(false);
          history.push('/');
          toast('Registered successfully!', '', 'success');
          clearForm();
        })
      }
    }).catch((error) => {
      if (error.message === 'Email already exists'){
        toast('Email already exists !', 'Try with different email', 'error');
        setLoading(false);
      }else{
        toast('Failed to register', '', 'error');
        setLoading(false);
      }
    });
    setValidated(false);
  };

  const handleOnNameChanged = (InputName: string | null) => {
    setName(InputName);
  };

  const handleOnAddressChanged = (InputAddress: string | null) => {
    setAddress(InputAddress);
  };

  const handleOnCityChanged = (InputCity: string | null) => {
    setCity(InputCity);
  };

  const handleOnPostelCodeChanged = (InputPostalCode: string | null) => {
    setPostalCode(InputPostalCode);
  };

  const handleOnCountry = (country: CountrySelect | null) => {
    if (!country) {
      return;
    }
    setSelectedCountry(country);
  };

  const handleOnEmailChanged = (inputEmail: string | null) => {
    setEmail(inputEmail);
  };

  const handleOnContactNumberChanged = (inputContactNumber: string | null) => {
    setContactNumber(inputContactNumber);
  }

  const handleOnPasswordChanged = (inputPassword: string) => {
    setPassword(inputPassword);
  };

  return (
    <Col className='register-form' xs={12} sm={12} md={6}>
      <h5>Register Form</h5>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name*</Form.Label>
          <Form.Control type="text"
                        placeholder="Your Full Name"
                        disabled={loading}
                        required
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        value={name ? name : ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnNameChanged(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your full name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGridAddress">
          <Form.Label>Address*</Form.Label>
          <Form.Control placeholder="Street Address"
                        required
                        disabled={loading}
                        value={address ? address : ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnAddressChanged(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your address
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row className='pt-1'>
          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridCity">
            <Form.Label>City / suburb*</Form.Label>
            <Form.Control placeholder="City / suburb"
                          required
                          disabled={loading}
                          pattern="^[A-Za-z][A-Za-z\s]*$"
                          value={city ? city : ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnCityChanged(event.target.value)}

            />
            <Form.Control.Feedback type="invalid">
              Please provide city / suburb
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridZip">
            <Form.Label>Postal Code*</Form.Label>
            <Form.Control placeholder="Postal Code"
                          required
                          disabled={loading}
                          type="number"
                          value={postalCode ? postalCode : ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnPostelCodeChanged(event.target.value)}

            />
            <Form.Control.Feedback type="invalid">
              Please provide post code
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={12} md={4} controlId="formGridCountry" className='select-country'>
            <Form.Label>Country*</Form.Label>
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
                    onChange={(selected: CountrySelect | null) => {
                      handleOnCountry(selected);
                    }
                    }
                    styles={customStyles}
                    defaultValue={selectedCountry}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className='contact-number pt-1'>
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number*</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  {countryCode()}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl required
                           pattern="^\d+$"
                           disabled={loading}
                           value={contactNumber ? contactNumber : ''}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                             handleOnContactNumberChanged(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide your phone number
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row className='email-area pt-1'>
          <Form.Group as={Col} xs={12} sm={12} md={12} controlId="registerCity" className="email pr-0">
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email" placeholder="Email"
                          required
                          disabled={loading}
                          value={email ? email : ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnEmailChanged(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your correct email
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <FormPwd password={password}
                 loading={loading}
                 handlePassword={handleOnPasswordChanged}
        />
        <Button variant='success' className='register-btn float-end mt-1' type='submit'>Register
          <ClipLoader color={'#ffffff'} loading={loading} css={override} size={12}/>
        </Button>
      </Form>
    </Col>
  );
}

export default RegisterForm;