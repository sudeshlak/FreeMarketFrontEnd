import {gql} from "@apollo/client";

export const ADD_ORDER = gql`
    mutation addOrder( $newOrder: InputOrder! ){
        addOrder(newOrder : $newOrder){
          ...orderDetails
        }
    }
    fragment orderDetails on Order{
        id
        orderCode
        requestedDate
        billingDetails {
            fullName
            address
            city
            postalCode
            country
            contactNumber
        }
        deliveryInstructions
        productList {
            id
            title
            category {
                id
                title
            }
            quantity
            regular_price
            discount_price
            image
        }
        status
        paymentType
        paymentStatus
        discountPercentage
    }
`

export const CHANGE_ORDER_STATUS = gql`
    mutation changeOrderStatus( $id: String!,$newState:String! ){
        changeOrderStatus(id : $id,newState:$newState){
           ...changeOrderDetails
        }
    }
    fragment changeOrderDetails on changeOrderStateResponse{
        order{
            id
            orderCode
            status
        }
        changed
        productErrorMessages
    }
`
export const CHANGE_ORDER_BY_TOKEN = gql`
    mutation getOrdersByToken( $token: String!){
        getOrdersByToken(token : $token){
            ...orderDetails
        }
    }
    fragment orderDetails on Order{
        id
        orderCode
        requestedDate
        billingDetails {
            fullName
            address
            city
            postalCode
            country
            contactNumber
        }
        deliveryInstructions
        productList {
            id
            title
            category {
                id
                title
            }
            quantity
            regular_price
            discount_price
            image
        }
        status
        paymentType
        paymentStatus
        discountPercentage
    }
`
export const GET_ONE_ORDER = gql`
    mutation getOneOrder( $id: String!){
        getOneOrder(id : $id){
           ...orderDetails
        }
    }
    fragment orderDetails on Order{
        id
        orderCode
        requestedDate
        requestedUser{
            id
            email
            name
            address
            postalCode
            country
            phoneNumber
            city
        }
        billingDetails {
            fullName
            address
            city
            postalCode
            country
            contactNumber
        }
        deliveryInstructions
        productList {
            id
            title
            category {
                id
                title
            }
            quantity
            regular_price
            discount_price
            image
        }
        status
        paymentType
        paymentStatus
        discountPercentage
    }
`