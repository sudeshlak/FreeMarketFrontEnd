import {gql} from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($newUser: InputUser! ){
        addUser( newUser : $newUser ){
            ...userDetails
        }
    }
    fragment userDetails on User{
        id
        email
        name
        address
        city
        postalCode
        country
        phoneNumber
        type
    }
`
export const LOGIN = gql`
    mutation login($email: String!, $password: String! ){
        login( email : $email,password : $password ){
            ...userDetails
        }
    }
    fragment userDetails on User{
        id
        email
        name
        address
        city
        postalCode
        country
        phoneNumber
        type
    }
`
export const TOKEN = gql`
    mutation token($email: String!){
        token(email: $email)
    }
`
export const GET_USER_BY_TOKEN = gql`
    mutation getUserByToken( $token: String! ){
        getUserByToken(token: $token){
           ...userDetails
        }
    }
    fragment userDetails on User{
        id
        email
        name
        address
        city
        postalCode
        country
        phoneNumber
        type
    }
`