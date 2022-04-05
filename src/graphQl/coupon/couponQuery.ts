import {gql} from "@apollo/client";

export const GET_ALL_COUPONS = gql`
    query getAllCoupons{
        getAllCoupons{
           ...couponDetails
        }
    }
    fragment couponDetails on Coupon{
        id
        title
        fromDate {
            stringDate
            numberDate
        }
        toDate {
            stringDate
            numberDate
        }
        couponCode
        discountPercentage
    }
`