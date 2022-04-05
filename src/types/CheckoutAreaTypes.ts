import {CountrySelect} from "./ShoppingAreaTypes";

export interface IShippingFormInputData {
  key: "fullName"
    | "address"
    | "city"
    | "postalCode"
    | "country"
    | "contactNumber"
    | "email"
    | "retypeEmail"
    | "passWord"
    | "validateMatchReTypeEmail"
    | "changeShippingAddress"
    | "otherAddressName"
    | "otherAddressBillingAddress"
    | "otherAddressCity"
    | "otherAddressPostelCode"
    | "otherAddressCountry"
    | "otherAddressContactNumber"
    | "deliveryInstructions"
    | "paymentMethode"
    | 'fullNameError'
    | 'addressError'
    | 'cityError'
    | 'postalCodeError'
    | 'contactNumberError'
    | 'emailError'
    | 'retypeEmailError'
    | 'passWordError'
    | 'matchReTypeEmailError'
    | 'changeShippingAddressError'
    | 'otherAddressNameError'
    | 'otherAddressBillingAddressError'
    | 'otherAddressCityError'
    | 'otherAddressPostelCodeError'
    | 'otherAddressContactNumberError'
    | 'deliveryInstructionsError'
    | 'paymentMethodeError',
  value: string | CountrySelect | boolean | null
}

export interface IShippingForm {
  fullName: string,
  address: string,
  city: string,
  postalCode: string,
  country: CountrySelect,
  contactNumber: string,
  email: string,
  retypeEmail: string,
  passWord: string,
  validateMatchReTypeEmail: boolean,
  changeShippingAddress: boolean,
  otherAddressName: string,
  otherAddressBillingAddress: string,
  otherAddressCity: string,
  otherAddressPostelCode: string,
  otherAddressCountry: CountrySelect,
  otherAddressContactNumber: string,
  deliveryInstructions: string
  paymentMethode: null | 'cashOnDelivery' | 'onlinePayment'

  fullNameError: string
  addressError: string
  cityError: string
  postalCodeError: string
  contactNumberError: string
  emailError: string
  retypeEmailError: string
  passWordError: string
  matchReTypeEmailError: string
  changeShippingAddressError: string
  otherAddressNameError: string
  otherAddressBillingAddressError: string
  otherAddressCityError: string
  otherAddressPostelCodeError: string
  otherAddressContactNumberError: string
  deliveryInstructionsError: string
  paymentMethodeError: string
}

export interface CheckoutTableItem {
  key: number;
  name: string;
  image: JSX.Element;
  qty: JSX.Element;
  unitPrice: JSX.Element;
  amount: JSX.Element;
  removeIcon: JSX.Element;
}