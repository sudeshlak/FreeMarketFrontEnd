import * as ACTIONS from "../../constants/actions/shippingAddressFormActions";
import {IShippingFormInputData} from "../../types/CheckoutAreaTypes";
import {changeShippingAddressForm} from "../actionTypes/shippingFormActionTypes";

export function changeFormData(FormInput: IShippingFormInputData):changeShippingAddressForm {
  return {
    type: ACTIONS.CHANGE_SHIPPING_FORM_DATA,
    payload: FormInput
  }
}
