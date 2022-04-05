import {gql} from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
    query getAllProducts{
        getAllProducts{
            ...ProductsDetails
        }
    }
    fragment ProductsDetails on Product{
        id
        title
        category{
            id
            title
        }
        quantity
        regular_price
        discount_price
        image
    }
`