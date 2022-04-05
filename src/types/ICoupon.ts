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
  discountPercentage: number,
}