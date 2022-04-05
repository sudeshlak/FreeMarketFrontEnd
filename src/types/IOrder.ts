import {IProduct} from "./IProduct";

export interface IOrder {
  id: string
  requestedDate:string
  orderCode: string
  changeShippingAddress: boolean
  requestedUser: string
  billingDetails: IBillingAddress
  productList: [IProduct]
  status: 'requested' | 'approved' | 'rejected'
  paymentType: 'cashOnDelivery' | 'onlinePayment'
  paymentStatus: boolean
  deliveryInstructions: string
  discountPercentage:number
}

export interface IBillingAddress {
  fullName: string
  address: string
  city: string,
  postalCode: string,
  country: string,
  contactNumber: string,
}

export interface INewStateDetails {
  id: string,
  newState: 'approved' | 'rejected'
}
export interface IOrders {
  orders:IOrder[]
}

export interface IOrderState {
  value: string
  label: string
}