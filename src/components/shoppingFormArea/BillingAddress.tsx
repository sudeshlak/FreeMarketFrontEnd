import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ADD_ORDER } from "../../graphQl/orders/orderMutation";
import { changeFormData } from "../../state/actions/shippingFormActions";
import { AppState } from "../../state/reducers";
import {
  IShippingForm,
  IShippingFormInputData,
} from "../../types/CheckoutAreaTypes";
import { IProduct } from "../../types/IProduct";
import BillingAddressForm from "./BillingAddressForm";
import ChangeShippingHeader from "./ChangeShippingHeader";
import DeliveryInstructions from "./DeliveryInstructions";
import Payment from "./Payment";
import moment from "moment";
import {
  ADD_USER,
  GET_USER_BY_TOKEN,
  TOKEN,
} from "../../graphQl/users/userMutation";
import { toast } from "../sweetalert/sweetalert";
import { ILogin } from "../../types/ILogin";
import { changeLoginState } from "../../state/actions/loginActions";
import { ClipLoader } from "react-spinners";
import { clearCartAction } from "../../state/actions/cartActions";
import { IAddCoupon } from "../../types/ICoupon";
import { removeCoupon } from "../../state/actions/couponActions";
import { ALTERNATE_ADDRESS_FIELDS, FORM_RESET_VALUES, GUEST_REQUIRED_FIELDS, LOADER_STYLE, RequiredField } from "./billingFormConstants";

function generateOrderCode(): string {
  const date = moment().format("YYMMDD");
  const randomString = String(Math.floor(Math.random() * 9999));
  return date + "ODR" + randomString;
}

function buildNewUserInput(form: IShippingForm) {
  return {
    name: form.fullName,
    address: form.address,
    city: form.city,
    postalCode: form.postalCode,
    phoneNumber: form.contactNumber,
    email: form.email,
    password: form.passWord,
    country: form.country.value,
    type: "user",
  };
}

function buildOrderInput(
  form: IShippingForm,
  productList: IProduct[],
  coupon: IAddCoupon | null,
  orderCode: string,
  requestedUser: string,
) {
  return {
    orderCode,
    requestedUser,
    changeShippingAddress: form.changeShippingAddress,
    billingDetails: {
      fullName: form.otherAddressName,
      address: form.otherAddressBillingAddress,
      city: form.otherAddressCity,
      postalCode: form.otherAddressPostelCode,
      country: form.otherAddressCountry.value,
      contactNumber: form.otherAddressContactNumber,
    },
    deliveryInstructions: form.deliveryInstructions,
    productList,
    status: "requested",
    paymentType: form.paymentMethode,
    paymentStatus: false,
    requestedDate: new Date().toLocaleString(),
    discountPercentage: coupon?.discountPercentage ?? 0,
  };
}

function setRequiredFieldErrors(
  dispatch: Dispatch,
  form: IShippingForm,
  fields: readonly RequiredField[],
): boolean {
  let isValid = true;
  for (const { field, errorKey } of fields) {
    if (!form[field]) {
      dispatch(changeFormData({ key: errorKey, value: "Required" }));
      isValid = false;
    }
  }
  return isValid && fields.every(({ errorKey }) => !form[errorKey]);
}

function validateGuestCheckoutForm(
  form: IShippingForm,
  dispatch: Dispatch,
): boolean {
  const isRequiredFieldsAreValid = setRequiredFieldErrors(
    dispatch,
    form,
    GUEST_REQUIRED_FIELDS,
  );
  const hasNoFieldErrors = !(
    form.paymentMethodeError ||
    form.passWordError ||
    form.retypeEmailError ||
    form.emailError ||
    form.contactNumberError ||
    form.postalCodeError ||
    form.cityError ||
    form.addressError ||
    form.fullNameError
  );
  return isRequiredFieldsAreValid && hasNoFieldErrors;
}

function validateAlternateShippingAddress(
  form: IShippingForm,
  dispatch: Dispatch,
): boolean {
  const fieldsAreValid = setRequiredFieldErrors(
    dispatch,
    form,
    ALTERNATE_ADDRESS_FIELDS,
  );
  const hasNoFieldErrors = !(
    form.changeShippingAddressError ||
    form.otherAddressNameError ||
    form.otherAddressBillingAddressError ||
    form.otherAddressCityError ||
    form.otherAddressPostelCodeError ||
    form.otherAddressContactNumberError
  );
  return fieldsAreValid && hasNoFieldErrors;
}

function validatePaymentMethod(form: IShippingForm, dispatch: Dispatch): boolean {
  if (!form.paymentMethode) {
    dispatch(changeFormData({ key: "paymentMethodeError", value: "Required" }));
    return false;
  }
  return true;
}

const BillingAddress: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const shippingForm: IShippingForm = useSelector(
    (state: AppState) => state.shippingForm,
  );
  const cartProductList: IProduct[] = useSelector(
    (state: AppState) => state.cartProducts.cartProducts,
  );
  const [getUserByToken] = useMutation(GET_USER_BY_TOKEN);
  const [addOrder] = useMutation(ADD_ORDER);
  const [addUser] = useMutation(ADD_USER);
  const [createAuthToken] = useMutation(TOKEN);
  const dispatch = useDispatch();
  const loginState: ILogin = useSelector((state: AppState) => state.login);
  const coupon: IAddCoupon | null = useSelector(
    (state: AppState) => state.coupon,
  );

  const isLoggedIn = loginState.login;
  const showGuestBillingForm = !isLoggedIn;

  const resetCheckoutForm = () => {
    FORM_RESET_VALUES.forEach((entry) => dispatch(changeFormData(entry)));
  };

  const submitOrder = async (orderCode: string, requestedUser: string) => {
    return addOrder({
      variables: {
        newOrder: buildOrderInput(
          shippingForm,
          cartProductList,
          coupon,
          orderCode,
          requestedUser,
        ),
      },
    });
  };

  const registerGuestUser = async () => {
    return addUser({
      variables: {
        newUser: buildNewUserInput(shippingForm),
      },
    });
  };

  const passesCheckoutValidation = (): boolean => {
    const paymentIsValid = validatePaymentMethod(shippingForm, dispatch);
    const alternateAddressIsValid =
      !shippingForm.changeShippingAddress ||
      validateAlternateShippingAddress(shippingForm, dispatch);

    if (isLoggedIn) {
      return paymentIsValid && alternateAddressIsValid;
    }

    const guestFormIsValid = validateGuestCheckoutForm(shippingForm, dispatch);
    return paymentIsValid && alternateAddressIsValid && guestFormIsValid;
  };

  const completeSuccessfulOrder = () => {
    toast("Order placed successfully!", "", "success");
    resetCheckoutForm();
    dispatch(clearCartAction());
    dispatch(removeCoupon());
  };

  const handleGuestCheckout = async () => {
    const { data: userData } = await registerGuestUser();
    const { data: tokenData } = await createAuthToken({
      variables: { email: userData.addUser.email },
    });
    localStorage.setItem("token", tokenData.token);

    await submitOrder(
      generateOrderCode(),
      userData.addUser.id,
    );
    completeSuccessfulOrder();
    dispatch(
      changeLoginState({ login: true, type: userData.addUser.type }),
    );
  };

  const handleLoggedInCheckout = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      return;
    }

    const { data: userData } = await getUserByToken({
      variables: { token: authToken },
    });
    await submitOrder(
      generateOrderCode(),
      userData.getUserByToken.id,
    );
    completeSuccessfulOrder();
  };

  const handleCheckoutError = (error: unknown) => {
    if (
      !isLoggedIn &&
      error instanceof Error &&
      error.message === "Email already exists"
    ) {
      dispatch(
        changeFormData({
          key: "emailError",
          value: "Email already exists",
        }),
      );
      return;
    }

    if (!isLoggedIn) {
      toast(
        "Failed to place order,Problem with registration,Try again!",
        "",
        "error",
      );
      return;
    }

    toast("Failed to place order", "", "error");
  };

  const handlePlaceOrderClick = async () => {
    setLoading(true);
    try {
      if (cartProductList.length === 0) {
        toast("Add products to the cart", "", "info");
        return;
      }

      if (!passesCheckoutValidation()) {
        return;
      }

      if (isLoggedIn) {
        await handleLoggedInCheckout();
      } else {
        await handleGuestCheckout();
      }
    } catch (error) {
      handleCheckoutError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showGuestBillingForm && (
        <Row className="billing-address">
          <div className="billing-address-header">
            <h5>Shipping and Billing Address</h5>
          </div>
          <BillingAddressForm loading={loading} />
        </Row>
      )}
      <ChangeShippingHeader loading={loading} />
      <DeliveryInstructions loading={loading} />
      <Payment loading={loading} />
      <div className="order-btn justify-content-center">
        <Button type="submit" onClick={handlePlaceOrderClick}>
          Order
          <ClipLoader
            color="#ffffff"
            loading={loading}
            cssOverride={LOADER_STYLE}
            size={13}
          />
        </Button>
      </div>
    </>
  );
};

export default BillingAddress;
