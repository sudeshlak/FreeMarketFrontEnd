import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { ICouponState } from "../../types/ICoupon";
import { PropsWithChildren } from "react";

export const emptyCouponState: ICouponState = {
  id: {
    value: "",
    error: "",
  },
  title: {
    value: "",
    error: "",
  },
  fromDate: {
    stringDate: "",
    numberDate: null,
    error: "",
  },
  toDate: {
    stringDate: "",
    numberDate: null,
    error: "",
  },
  couponCode: {
    value: "",
    error: "",
  },
  discountPercentage: {
    value: null,
    error: "",
  },
};

const CouponCreateContext = createContext<ICouponState>(emptyCouponState);
export const CouponCreateDispatchContext = createContext<any>(null);

export const CouponCreateProvider = ({ children }: PropsWithChildren) => {
  const reducer = (
    state: ICouponState,
    action: { type: string; payload: any },
  ) => {
    switch (action.type) {
      case "setTitle":
        return {
          ...state,
          title: {
            ...state.title,
            value: action.payload.value,
            error: action.payload.error,
          },
        };
      case "setCouponCode":
        return {
          ...state,
          couponCode: {
            ...state.couponCode,
            value: action.payload.value,
            error: action.payload.error,
          },
        };
      case "setFromDate":
        return {
          ...state,
          fromDate: {
            ...state.fromDate,
            stringDate: action.payload.stringDate,
            numberDate: action.payload.numberDate,
            error: action.payload.error,
          },
        };
      case "setToDate":
        return {
          ...state,
          toDate: {
            ...state.toDate,
            stringDate: action.payload.stringDate,
            numberDate: action.payload.numberDate,
            error: action.payload.error,
          },
        };
      case "setDiscountPercentage":
        return {
          ...state,
          discountPercentage: {
            ...state.discountPercentage,
            value: action.payload.value,
            error: action.payload.error,
          },
        };
      case "clearForm":
        return emptyCouponState;
      default:
        return state;
    }
  };

  const [couponCreateFormState, dispatch] = useReducer(
    reducer,
    emptyCouponState,
  );

  return (
    <CouponCreateContext.Provider value={couponCreateFormState}>
      <CouponCreateDispatchContext.Provider value={dispatch}>
        {children}
      </CouponCreateDispatchContext.Provider>
    </CouponCreateContext.Provider>
  );
};

export const useCouponCreateContext = () => {
  return useContext(CouponCreateContext);
};
export const useCouponCreateDispatchContext = () => {
  return useContext(CouponCreateDispatchContext);
};
