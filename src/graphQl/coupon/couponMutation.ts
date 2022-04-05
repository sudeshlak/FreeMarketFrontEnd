import {gql} from "@apollo/client";

export const DELETE_COUPON = gql`
    mutation deleteCoupon( $id: String!){
        deleteCoupon(id : $id){
          ...couponDetails
        }
    }
    fragment couponDetails on Coupon{
        id
        title
    }
`
export const CREATE_COUPON = gql`
    mutation addCoupon( $newCoupon: InputCoupon! ){
        addCoupon(newCoupon : $newCoupon){
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

export const GET_ONE_COUPON = gql`
    mutation getOneCoupon( $couponCode: String! ){
        getOneCoupon(couponCode : $couponCode){
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