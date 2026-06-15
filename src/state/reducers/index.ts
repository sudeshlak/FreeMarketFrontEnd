import {combineReducers} from "redux";
import {cartReducer} from "./CartReducer";
import {categorizeProductsReducer} from "./CategorizeProductsReducer";
import {productReducer} from "./ProductReducer";
import {ShippingAddressFormDataReducer} from "./shippingFormReducer";
import {orderReducer} from "./OrderReducer";
import {loginReducer} from "./LoginReducer";
import { AdminProductListReducer } from "./AdminProductListReducer";
import {couponReducer} from "./CouponReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";


const loginPersistConfig = {
    key: "login",
    storage,
    whitelist: ["login", "type"], // only persist these fields
  };
  
export const rootReducer = combineReducers({
  cartProducts: cartReducer,
  products: productReducer,
  categoryList: categorizeProductsReducer,
  shippingForm: ShippingAddressFormDataReducer,
  orders: orderReducer,
  login: persistReducer(loginPersistConfig, loginReducer),
  adminProductList: AdminProductListReducer,
  coupon: couponReducer
});

export type AppState = ReturnType<typeof rootReducer>