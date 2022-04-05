import * as ACTIONS from "../../constants/actions/shippingAddressFormActions";
import {IShippingFormInputData} from "../../types/CheckoutAreaTypes";

export interface changeShippingAddressForm {
  type: typeof ACTIONS.CHANGE_SHIPPING_FORM_DATA
  payload: IShippingFormInputData
}

export type ShippingAddressFormTypes = changeShippingAddressForm;