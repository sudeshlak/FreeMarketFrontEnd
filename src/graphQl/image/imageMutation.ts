import {gql} from "@apollo/client";

export const GENERATE_PUT_URL = gql`
    mutation generatePutUrl( $image: Image! ){
        generatePutUrl(image : $image)
    }
`

export const GENERATE_GET_URL = gql`
    mutation generateGetUrl( $image: Image!  ){
        generateGetUrl(image : $image)
    }
`