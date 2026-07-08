import { Dispatch } from "redux";
import { changeFormData } from "../../state/actions/shippingFormActions";
import { IShippingFormInputData } from "../../types/CheckoutAreaTypes";

export function makeValidatedFieldHandlers (
    dispatch:Dispatch,
    fieldKey:IShippingFormInputData['key'],
    errorKey:IShippingFormInputData['key'],
    validate: (value: string) => boolean,
    errorMessage: string,
){
    return function (value:string){
        dispatch(changeFormData({ key: fieldKey, value }));
        dispatch(changeFormData({
            key: errorKey,
            value: validate(value) ? '' : errorMessage,
          }));
    }
}