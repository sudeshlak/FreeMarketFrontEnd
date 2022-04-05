import React from "react";
import {Row} from "react-bootstrap";
import {IProduct, ISearchedCategory} from "../../types/IProduct";
import {useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import CurrentProductList from "./CurrentProductList";

const ProductList: React.FC = () => {
  const activeCategory: ISearchedCategory = useSelector((state: AppState) => state.categoryList.category);
  const products: IProduct[] = useSelector((state: AppState) => state.products.products);

  const renderProducts = () => {
    if (activeCategory.title === 'All') {
      return (
        <React.Fragment>
          <Row className="product-list px-lg-5 py-2">
            <CurrentProductList products={products} activeCategory={{id: 1, title: "Grocery", searchedString: ""}}/>
          </Row>
          <Row className="product-list px-lg-5 py-2">
            <CurrentProductList products={products} activeCategory={{id: 1, title: "Pharmacy", searchedString: ""}}/>
          </Row>
          <Row className="product-list px-lg-5 py-2">
            <CurrentProductList products={products} activeCategory={{id: 1, title: "Food", searchedString: ""}}/>
          </Row>
          <Row className="product-list px-lg-5 py-2">
            <CurrentProductList products={products} activeCategory={{id: 1, title: "Electronic", searchedString: ""}}/>
          </Row>
        </React.Fragment>)
    }
    return (
      <Row className="product-list px-lg-5 py-2">
        <CurrentProductList products={products} activeCategory={activeCategory}/>
      </Row>
    );
  }

  return (
    <div>
      {
        renderProducts()
      }
    </div>
  );
};

export default ProductList;