export interface IAddCoupon {
  title: string,
  discountPercentage: number
}

export interface IDate {
  stringDate: string
  numberDate: number|null
}

export interface ICoupon {
  id: string,
  title: string,
  fromDate: IDate,
  toDate: IDate,
  couponCode: string,
  discountPercentage: number | null,
}

export interface ICouponState {
    id: {
      value: string,
      error: string
    },
    title: {
      value: string,
      error: string
    },
    fromDate: {
      stringDate: string,
      numberDate: number | null,
      error: string
    },
    toDate: {
      stringDate: string,
      numberDate: number | null,
      error: string;
    },
    couponCode: {
      value: string,
      error: string
    },
    discountPercentage: {
      value: number | null,
      error: string;
    },
  };