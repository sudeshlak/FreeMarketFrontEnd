import { IShippingForm, IShippingFormInputData } from "../../types/CheckoutAreaTypes";

export const FORM_RESET_VALUES: IShippingFormInputData[] = [
  { key: "fullName", value: "" },
  { key: "address", value: "" },
  { key: "city", value: "" },
  { key: "postalCode", value: "" },
  { key: "contactNumber", value: "" },
  { key: "email", value: "" },
  { key: "retypeEmail", value: "" },
  { key: "passWord", value: "" },
  { key: "validateMatchReTypeEmail", value: false },
  { key: "changeShippingAddress", value: false },
  { key: "otherAddressName", value: "" },
  { key: "otherAddressBillingAddress", value: "" },
  { key: "otherAddressCity", value: "" },
  { key: "otherAddressPostelCode", value: "" },
  { key: "otherAddressContactNumber", value: "" },
  { key: "deliveryInstructions", value: "" },
  { key: "paymentMethode", value: null },
];

export const LOADER_STYLE = {
  marginLeft: "20px",
  marginTop: "7px",
};

export type RequiredField = {
  field: keyof IShippingForm;
  errorKey: keyof IShippingForm;
};

export const GUEST_REQUIRED_FIELDS: readonly RequiredField[] = [
  { field: "fullName", errorKey: "fullNameError" },
  { field: "address", errorKey: "addressError" },
  { field: "city", errorKey: "cityError" },
  { field: "postalCode", errorKey: "postalCodeError" },
  { field: "contactNumber", errorKey: "contactNumberError" },
  { field: "email", errorKey: "emailError" },
  { field: "retypeEmail", errorKey: "retypeEmailError" },
  { field: "passWord", errorKey: "passWordError" },
];

export const ALTERNATE_ADDRESS_FIELDS: readonly RequiredField[] = [
  { field: "otherAddressName", errorKey: "otherAddressNameError" },
  {
    field: "otherAddressBillingAddress",
    errorKey: "otherAddressBillingAddressError",
  },
  { field: "otherAddressCity", errorKey: "otherAddressCityError" },
  { field: "otherAddressPostelCode", errorKey: "otherAddressPostelCodeError" },
  {
    field: "otherAddressContactNumber",
    errorKey: "otherAddressContactNumberError",
  },
];