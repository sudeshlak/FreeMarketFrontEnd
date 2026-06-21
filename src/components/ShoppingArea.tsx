import React, {useEffect} from "react";
import {Alert, Spinner} from "react-bootstrap";
import SearchBar from "./searchBar/SearchBar";
import Categories from "./category/Categories";
import {useDispatch} from "react-redux";
import {useQuery} from "@apollo/client";
import {GET_ALL_PRODUCTS} from "../graphQl/products/productQuery";
import {setInitProducts} from "../state/actions/productActions";
import ProductList from "./product/ProductList";

const ShoppingArea: React.FC = () => {
  const dispatch = useDispatch();
  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if (data?.getAllProducts) {
      dispatch(setInitProducts(data.getAllProducts));
    }
  }, [data, dispatch]);

  return (
    <div className='shopping-area'>
      <SearchBar/>
      <Categories/>
      {loading && (
        <div className="text-center py-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading products...</span>
          </Spinner>
          <p className="mt-2 mb-0">Loading products...</p>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mx-3 mt-3">
          Could not load products. Make sure the API is running at localhost:3002.
        </Alert>
      )}
      {!loading && !error && (
        <div className="row product-area-container">
          <ProductList/>
        </div>
      )}
    </div>
  );
}

export default ShoppingArea;
