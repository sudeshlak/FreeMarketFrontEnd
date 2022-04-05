import {useMutation} from "@apollo/client";
import React, {useState} from "react";
import {Button, Row} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {ADD_ORDER} from "../../graphQl/orders/orderMutation";
import {changeFormData} from "../../state/actions/shippingFormActions";
import {AppState} from "../../state/reducers";
import {IShippingForm} from "../../types/CheckoutAreaTypes";
import {IProduct} from "../../types/IProduct";
import BillingAddressForm from "./BillingAddressForm";
import ChangeShippingHeader from "./ChangeShippingHeader";
import DeliveryInstructions from "./DeliveryInstructions";
import Payment from "./Payment";
import moment from "moment";
import {ADD_USER, GET_USER_BY_TOKEN, TOKEN} from "../../graphQl/users/userMutation";
import {toast} from "../sweetalert/sweetalert";
import {addNewOrder} from "../../state/actions/orderActions";
import {ILogin} from "../../types/ILogin";
import {changeLoginState} from "../../state/actions/loginActions";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";
import {clearCartAction} from "../../state/actions/cartActions";
import {IAddCoupon} from "../../types/ICoupon";
import {removeCoupon} from "../../state/actions/couponActions";

const override = css`margin-left: 20px;
  margin-top: 7px`;

const BillingAddress: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const shippingForm: IShippingForm = useSelector((state: AppState) => state.shippingForm);
  const productList: IProduct[] = useSelector((state: AppState) => state.cartProducts.cartProducts);
  const [getUserByToken] = useMutation(GET_USER_BY_TOKEN);
  const [addOrder] = useMutation(ADD_ORDER);
  const [addUser] = useMutation(ADD_USER);
  const [token] = useMutation(TOKEN);
  const dispatch = useDispatch();
  const loginState: ILogin = useSelector((state: AppState) => state.login);
  const coupon: IAddCoupon|null = useSelector((state: AppState) => state.coupon);

  const placeOrder = async (orderCode: string, requestedUser: string) => {
    return await addOrder({
      variables: {
        newOrder: {
          orderCode: orderCode,
          requestedUser: requestedUser,
          changeShippingAddress: shippingForm.changeShippingAddress,
          billingDetails: {
            fullName: shippingForm.otherAddressName,
            address: shippingForm.otherAddressBillingAddress,
            city: shippingForm.otherAddressCity,
            postalCode: shippingForm.otherAddressPostelCode,
            country: shippingForm.otherAddressCountry.value,
            contactNumber: shippingForm.otherAddressContactNumber,
          },
          deliveryInstructions: shippingForm.deliveryInstructions,
          productList: productList,
          status: 'requested',
          paymentType: shippingForm.paymentMethode,
          paymentStatus: false,
          requestedDate: new Date().toLocaleString(),
          discountPercentage: coupon?.discountPercentage ? coupon.discountPercentage : 0
        }
      }
    })
  }

  const clearForm = () => {
    dispatch(changeFormData({key: 'fullName', value: ''}));
    dispatch(changeFormData({key: 'address', value: ''}));
    dispatch(changeFormData({key: 'city', value: ''}));
    dispatch(changeFormData({key: 'postalCode', value: ''}));
    dispatch(changeFormData({key: 'contactNumber', value: ''}));
    dispatch(changeFormData({key: 'email', value: ''}));
    dispatch(changeFormData({key: 'retypeEmail', value: ''}));
    dispatch(changeFormData({key: 'passWord', value: ''}));
    dispatch(changeFormData({key: 'validateMatchReTypeEmail', value: false}));
    dispatch(changeFormData({key: 'changeShippingAddress', value: false}));
    dispatch(changeFormData({key: 'otherAddressName', value: ''}));
    dispatch(changeFormData({key: 'otherAddressBillingAddress', value: ''}));
    dispatch(changeFormData({key: 'otherAddressCity', value: ''}));
    dispatch(changeFormData({key: 'otherAddressPostelCode', value: ''}));
    dispatch(changeFormData({key: 'otherAddressContactNumber', value: ''}));
    dispatch(changeFormData({key: 'deliveryInstructions', value: ''}));
    dispatch(changeFormData({key: 'paymentMethode', value: null}));
  }

  const clearCart = () => {
    dispatch(clearCartAction());
  }

  const addNewUser = async () => {
    return await addUser({
        variables: {
          newUser: {
            name: shippingForm.fullName,
            address: shippingForm.address,
            city: shippingForm.city,
            postalCode: shippingForm.postalCode,
            phoneNumber: shippingForm.contactNumber,
            email: shippingForm.email,
            password: shippingForm.passWord,
            country: shippingForm.country.value,
            type: 'user'
          }
        }
      }
    )
  }
  const validateShippingForm = (): boolean => {
    let isShoppingFormEmpty: boolean = true;
    if (!shippingForm.fullName) {
      dispatch(changeFormData({key: 'fullNameError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.address) {
      dispatch(changeFormData({key: 'addressError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.city) {
      dispatch(changeFormData({key: 'cityError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.postalCode) {
      dispatch(changeFormData({key: 'postalCodeError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.contactNumber) {
      dispatch(changeFormData({key: 'contactNumberError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.email) {
      dispatch(changeFormData({key: 'emailError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.retypeEmail) {
      dispatch(changeFormData({key: 'retypeEmailError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }
    if (!shippingForm.passWord) {
      dispatch(changeFormData({key: 'passWordError', value: 'Required'}));
      isShoppingFormEmpty = false;
    }

    return isShoppingFormEmpty && !(shippingForm.paymentMethodeError
      || shippingForm.passWordError
      || shippingForm.retypeEmailError
      || shippingForm.emailError
      || shippingForm.contactNumberError
      || shippingForm.postalCodeError
      || shippingForm.cityError
      || shippingForm.addressError
      || shippingForm.fullNameError
    );
  }

  const validateChangingAddressForm = (): boolean => {
    let isChangingAddressFormValid: boolean = true;

    if (!shippingForm.otherAddressName) {
      dispatch(changeFormData({key: 'otherAddressNameError', value: 'Required'}));
      isChangingAddressFormValid = false;
    }
    if (!shippingForm.otherAddressBillingAddress) {
      dispatch(changeFormData({key: 'otherAddressBillingAddressError', value: 'Required'}));
      isChangingAddressFormValid = false;
    }
    if (!shippingForm.otherAddressCity) {
      dispatch(changeFormData({key: 'otherAddressCityError', value: 'Required'}));
      isChangingAddressFormValid = false;
    }
    if (!shippingForm.otherAddressPostelCode) {
      dispatch(changeFormData({key: 'otherAddressPostelCodeError', value: 'Required'}));
      isChangingAddressFormValid = false;
    }
    if (!shippingForm.otherAddressContactNumber) {
      dispatch(changeFormData({key: 'otherAddressContactNumberError', value: 'Required'}));
      isChangingAddressFormValid = false;
    }

    return isChangingAddressFormValid && !(shippingForm.changeShippingAddressError
      || shippingForm.otherAddressNameError
      || shippingForm.otherAddressBillingAddressError
      || shippingForm.otherAddressCityError
      || shippingForm.otherAddressPostelCodeError
      || shippingForm.otherAddressContactNumberError
    );
  }

  const validatePaymentMethode = (): boolean => {
    if (!shippingForm.paymentMethode) {
      dispatch(changeFormData({key: 'paymentMethodeError', value: 'Required'}));
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    setLoading(true);
    if (productList.length === 0) {
      toast('Add products to the cart', '', 'info');
      setLoading(false);
      return;
    }
    if (!loginState.login) {
      if (!validatePaymentMethode() ||
        (shippingForm.changeShippingAddress && !validateChangingAddressForm()) || !validateShippingForm()) {
        setLoading(false);
        return;
      }
      addNewUser().then(async ({data}) => {
        await token({variables: {email: data.addUser.email}}).then(({data}) => {
          localStorage.setItem('token', data.token);
        });
        placeOrder(renderOrderCode(), data.addUser.id).then(({data}) => {
          dispatch(addNewOrder(data.addOrder));
          toast('Order placed successfully!', '', 'success');
          clearForm();
          clearCart();
          setLoading(false);
        }).catch((error) => {
          toast('Failed to place order', '', 'error');
          setLoading(false);
        });
        dispatch(changeLoginState({login: true, type: data.addUser.type}));
      }).catch((error) => {
        if (error.message === 'Email already exists') {
          dispatch(changeFormData({key: 'emailError', value: 'Email already exists'}));
          setLoading(false);
        } else {
          toast('Failed to place order,Problem with registration,Try again!', '', 'error');
          setLoading(false);
        }
      });
    } else {
      if ((shippingForm.changeShippingAddress && !validateChangingAddressForm()) || !validatePaymentMethode()) {
        setLoading(false);
        return;
      }
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      getUserByToken({variables: {token: token}}).then(({data}) => {
        placeOrder(renderOrderCode(), data.getUserByToken.id).then(({data}) => {
          dispatch(addNewOrder(data.addOrder));
          toast('Order placed successfully!', '', 'success');
          clearForm();
          clearCart();
          dispatch(removeCoupon());
          setLoading(false);
        }).catch((error) => {
          toast('Failed to place order', '', 'error');
          setLoading(false);
        });
      });
    }
  }

  const renderOrderCode = () => {
    const date: string = moment().format('YYMMDD');
    const randomString: string = String(Math.floor(Math.random() * 9999));
    return date + 'ODR' + randomString
  }

  return (
    <React.Fragment>
      {
        (!loginState.login) &&
          <Row className='billing-address'>
              <div className='billing-address-header'>
                  <h5>Shipping and Billing Address</h5>
              </div>
              <BillingAddressForm loading={loading}/>
          </Row>
      }
      <ChangeShippingHeader loading={loading}/>
      <DeliveryInstructions loading={loading}/>
      <Payment loading={loading}/>
      <div className="order-btn justify-content-center">
        <Button type="submit" onClick={handleSubmit}>Order
          <ClipLoader color={'#ffffff'} loading={loading} css={override} size={13}/>
        </Button>
      </div>
    </React.Fragment>
  );
}

export default BillingAddress;