import React from "react";
import {Row} from "react-bootstrap";
import {IProduct, ISearchedCategory} from "../../types/IProduct";
import {useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import CurrentProductList from "./CurrentProductList";
import {SHOPPING_CATEGORIES} from "../../constants/productCategories";

const ProductList: React.FC = () => {
  const activeCategory: ISearchedCategory = useSelector((state: AppState) => state.categoryList.category);
  const products: IProduct[] = useSelector((state: AppState) => state.products.products);

  if (activeCategory.title === "All") {
    return (
      <div>
        {SHOPPING_CATEGORIES.map((category) => (
          <Row key={category.title} className="product-list px-lg-5 py-2">
            <CurrentProductList products={products} activeCategory={category} />
          </Row>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Row className="product-list px-lg-5 py-2">
        <CurrentProductList products={products} activeCategory={activeCategory} />
      </Row>
    </div>
  );
};

export default ProductList;
