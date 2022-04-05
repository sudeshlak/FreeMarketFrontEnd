import React, {useEffect} from "react";
import SearchBar from "./searchBar/SearchBar";
import Categories from "./category/Categories";
import ProductArea from "./product/ProductArea";
import {useDispatch} from "react-redux";
import {useQuery} from "@apollo/client";
import {GET_ALL_PRODUCTS} from "../graphQl/products/productQuery";
import {setInitProducts} from "../state/actions/productActions";

const ShoppingArea: React.FC = () => {
  const dispatch = useDispatch();
  const {refetch} = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    refetch().then(({data})=>{
      if(data){
        dispatch(setInitProducts(data.getAllProducts));
      }
    });
  }, [dispatch, refetch]);
  return (
    <div className='shopping-area'>
      <SearchBar/>
      <Categories/>
      <div className="row product-area-container">
        <ProductArea/>
      </div>
    </div>
  );
}

export default ShoppingArea;