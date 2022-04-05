import {gql} from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories{
    getAllCategories{
    ...categoryDetails
    }
  }
  fragment categoryDetails on Category{
      id
      title
  }
`