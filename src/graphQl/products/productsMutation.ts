import {gql} from "@apollo/client";

export const ADD_PRODUCT = gql`
    mutation addProduct( $newProduct: InputProduct! ){
        addProduct(newProduct : $newProduct){
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
export const UPDATE_PRODUCT = gql`
    mutation updateProductMutation( $id: String!, $newProduct: InputProduct! ){
        updateProduct(id : $id , newProduct:$newProduct){
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
export const DELETE_PRODUCT = gql`
    mutation deleteProduct( $id: String!,$imageName:String! ){
        deleteProduct(id : $id, imageName : $imageName){
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