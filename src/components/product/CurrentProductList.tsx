import React, {useEffect, useState} from "react";
import {IProduct, ISearchedCategory} from "../../types/IProduct";
import Product from "./Product";

type currentProductListProps = {
  activeCategory: ISearchedCategory
  products: IProduct[]
}

const CurrentProductList: React.FC<currentProductListProps> = (props) => {
  const {activeCategory, products} = props;
  const [currentProducts, setCurrentProducts] = useState<IProduct[] | null>(null);

  const renderProducts = () => {
    if (!currentProducts || currentProducts.length === 0) {
      return;
    }
    return currentProducts.map((product: IProduct) => {
      return <Product key={product.id}
                      products={product}
      />
    });
  }

  useEffect(() => {
    if (!products || products.length === 0) {
      setCurrentProducts(null);
      return;
    }
    if (activeCategory.title === 'Searched') {
      setCurrentProducts(products.filter(value =>
        (value.title.toLowerCase().includes(activeCategory.searchedString.toLowerCase()))));
      return;
    }
    setCurrentProducts(products.filter(value => value.category.title === activeCategory.title));
  }, [products, activeCategory]);

  return (
    <React.Fragment>
      {(currentProducts && activeCategory.title !== "Searched") && <h5>{activeCategory.title}</h5>}
      {
        renderProducts()
      }
    </React.Fragment>
  );
}

export default CurrentProductList;