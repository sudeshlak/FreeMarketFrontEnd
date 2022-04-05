import {gql} from "@apollo/client";

export const GET_ALL_ORDERS = gql`
    query getAllOrders{
        getAllOrders{
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