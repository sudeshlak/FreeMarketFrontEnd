import React from "react";
import {Col, Image, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import allCategoryImage from '../../assets/images/all-cat.jpg';
import {AppState} from "../../state/reducers";
import {useDispatch} from "react-redux";
import {changeCategory} from "../../state/actions/categorizeProdcutsActions";
import {ISearchedCategory} from "../../types/IProduct";
import { Dispatch } from "redux";
import { ALL_CATEGORY, ELECTRONIC_CATEGORY, FOOD_CATEGORY, GROCERY_CATEGORY, PHARMACY_CATEGORY } from "../../constants/productCategories";
import { dispatchSelectedCategory } from "./dispatchSelectedcategoryHandler";

const Category: React.FC = () => {
  const imgGrocery = 'https://s3.amazonaws.com/cdn1.shub/categories/grocery.png';
  const imgPharmacy = 'https://s3.amazonaws.com/cdn1.shub/categories/health.png';
  const imgFood = 'https://s3.amazonaws.com/cdn1.shub/categories/food.png';
  const imgElectronics = 'https://s3.amazonaws.com/cdn1.shub/categories/electro.png';
  const imgHeight = '100px';
  const activeCategory: ISearchedCategory = useSelector((state: AppState) => state.categoryList.category);
  const dispatch = useDispatch();

  const onSelectCategory = dispatchSelectedCategory(dispatch);

  return (
    <Col className="px-lg-3 px-md-4" id="products">
      <Row className="category px-3 justify-content-around mt-2">
        <Col className={`cat-box cat-img text-center ${(activeCategory.title === "All") ? 'active' : ''}`}
             xs={2} lg={2} md={2} sm={2} xl={2} onClick={() =>
          onSelectCategory(ALL_CATEGORY)
        }>
          <Image id="all" src={allCategoryImage.src} alt="categoryImage.jpg" height={imgHeight}>
          </Image><p className="cat-img-p mt-3 text-capitalize">all</p>
        </Col>
        <Col className={`cat-box cat-img text-center ${(activeCategory.title === "Grocery") ? 'active' : ''}`}
             xs={2} lg={2} md={2} sm={2} xl={2} onClick={() =>
          onSelectCategory(GROCERY_CATEGORY)
        }>
          <Image src={imgGrocery} alt="categoryImage.jpg" height={imgHeight}>
          </Image><p className="cat-img-p mt-3 text-capitalize">grocery</p>
        </Col>
        <Col className={`cat-box cat-img text-center ${(activeCategory.title === "Pharmacy") ? 'active' : ''}`}
             xs={2} lg={2} md={2} sm={2} xl={2} onClick={() =>
          onSelectCategory(PHARMACY_CATEGORY)
        }>
          <Image src={imgPharmacy} alt="categoryImage.jpg" height={imgHeight}>
          </Image><p className="cat-img-p mt-3 text-capitalize">pharmacy</p>
        </Col>
        <Col className={`cat-box cat-img text-center ${(activeCategory.title === "Food") ? 'active' : ''}`}
             xs={2} lg={2} md={2} sm={2} xl={2} onClick={() =>
          onSelectCategory(FOOD_CATEGORY)
        }>
          <Image src={imgFood} alt="categoryImage.jpg" height={imgHeight}>
          </Image><p className="cat-img-p mt-3 text-capitalize">food</p>
        </Col>
        <Col className={`cat-box cat-img text-center ${(activeCategory.title === "Electronic") ? 'active' : ''}`}
             xs={2} lg={2} md={2} sm={2} xl={2} onClick={() =>
          onSelectCategory(ELECTRONIC_CATEGORY)
        }>
          <Image src={imgElectronics} alt="categoryImage.jpg" height={imgHeight}>
          </Image><p className="cat-img-p mt-3 text-capitalize">electronic</p>
        </Col>
      </Row>
    </Col>
  );
}

export default Category;