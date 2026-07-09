import React, { useDeferredValue, useMemo } from "react";
import { IProduct, ISearchedCategory } from "../../types/IProduct";
import Product from "./Product";
import { filterProductsByCategory } from "../../util/filterProductsByCategory";

type currentProductListProps = {
  activeCategory: ISearchedCategory;
  products: IProduct[];
};

const CurrentProductList: React.FC<currentProductListProps> = (props) => {
  const { activeCategory, products } = props;
  const deferredCategory = useDeferredValue(activeCategory);
  const isStale = deferredCategory !== activeCategory;

  const currentProducts = useMemo(
    () => filterProductsByCategory(products, deferredCategory),
    [products, deferredCategory],
  );

  if (currentProducts.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {activeCategory.title !== "Searched" && <h5>{activeCategory.title}</h5>}
      {currentProducts.map((product: IProduct) => (
        <Product key={product.id} products={product} />
      ))}
    </React.Fragment>
  );
};

export default CurrentProductList;
