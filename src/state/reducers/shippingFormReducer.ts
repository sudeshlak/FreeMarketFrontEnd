import * as ACTIONS from "../../constants/actions/shippingAddressFormActions";
import {ShippingAddressFormTypes} from "../actionTypes/shippingFormActionTypes";
import {IShippingForm} from "../../types/CheckoutAreaTypes";

const shippingFormInitialState = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: {value: 'Sri Lanka', label: 'Sri Lanka'},
  contactNumber: '',
  email: '',
  retypeEmail: '',
  passWord: '',
  validateMatchReTypeEmail: false,
  changeShippingAddress: false,
  otherAddressName: '',
  otherAddressBillingAddress: '',
  otherAddressCity: '',
  otherAddressPostelCode: '',
  otherAddressCountry: {value: 'Sri Lanka', label: 'Sri Lanka'},
  otherAddressContactNumber: '',
  deliveryInstructions: '',
  paymentMethode: null,

  fullNameError: '',
  addressError: '',
  cityError: '',
  postalCodeError: '',
  contactNumberError: '',
  emailError: '',
  retypeEmailError: '',
  passWordError: '',
  matchReTypeEmailError: '',
  changeShippingAddressError: '',
  otherAddressNameError: '',
  otherAddressBillingAddressError: '',
  otherAddressCityError: '',
  otherAddressPostelCodeError: '',
  otherAddressContactNumberError: '',
  deliveryInstructionsError: '',
  paymentMethodeError: ''
}

export function ShippingAddressFormDataReducer(state: IShippingForm = shippingFormInitialState,
                                               action: ShippingAddressFormTypes): IShippingForm {
  switch (action.type) {
    case ACTIONS.CHANGE_SHIPPING_FORM_DATA: {
      // @ts-ignore
      state[action.payload.key] = action.payload.value;
      const updatedState = {...state}
      return updatedState;
    }
    default: {
      return state;
    }
  }
}