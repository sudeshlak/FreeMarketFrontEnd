import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ICategory, ISearchedCategory} from '../../types/AdminProductListType';
import {IProduct} from '../../types/IProduct';
import AdminProductCategoryDropdown from './AdminProductListCategoryDropdown';
import AdminProductListTable from './AdminProductListTable';
import {useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import AdminUpdateProduct from '../AdminUpdateProduct/AdminUpdateProduct';
import AdminUpdateProductPreview from '../AdminUpdateProduct/AdminUpdateProductPreview';
import {XCircle} from "react-feather";
import Scroll from "react-scroll";
import SearchBar from '../adminProductListSearchBar/SearchBar';
import {useDispatch} from 'react-redux';
import {changeCategory} from '../../state/actions/AdminProductListActions';
import {useQuery} from "@apollo/client";
import {GET_ALL_PRODUCTS} from "../../graphQl/products/productQuery";
import {setInitProducts} from "../../state/actions/productActions";

const AdminProductList: React.FC = () => {

  const Categories: ICategory[] = [
    {value: 0, label: 'All'},
    {value: 1, label: 'Grocery'},
    {value: 2, label: 'Pharmacy'},
    {value: 3, label: 'Food'},
    {value: 4, label: 'Electronic'}
  ];

  const dispatch = useDispatch();
  const activeCategory: ISearchedCategory = useSelector((state: AppState) => state.adminProductList.category);
  const products: IProduct[] = useSelector((state: AppState) => state.products.products);
  const [categorizedItems, setCategorizedItems] = useState<IProduct[] | null>(null);
  const [updateToProduct, setUpdateToProduct] = useState<IProduct | null>(null);
  const {refetch} = useQuery(GET_ALL_PRODUCTS);
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [productNewImage, setProductNewImage] = useState<string | null>(null);

  useEffect(() => {
    refetch().then(({data})=>{
      if(data){
        dispatch(setInitProducts(data.getAllProducts));
      }
    });
  }, [dispatch, refetch]);

  const handleOnActiveCategory = (Category: ICategory | null) => {
    if (!Category) {
      return;
    }
    dispatch(changeCategory({id: Category.value, title: Category.label, searchedString: ''}));
  };

  const handleOnCategorizeItem = React.useCallback((products: IProduct[]) => {
    if (activeCategory.title === 'All') {
      setCategorizedItems(products);
      return;
    }

    if (activeCategory.title === 'Searched') {
      setCategorizedItems(products.filter(value =>
        (value.title.toLowerCase().includes(activeCategory.searchedString.toLowerCase()))));
      return;
    }

    setCategorizedItems(products.filter(item => item.category.title === activeCategory.title));
  }, [activeCategory]);

  useEffect(() => {
    if (!products) {
      return;
    }
    handleOnCategorizeItem(products);
  }, [activeCategory, handleOnCategorizeItem, products]);


  const handleOnCloseUpdateSection = () => {
    setUpdateToProduct(null);
  };

  const handleOnRequestUpdate = (id: string) => {
    Scroll.scroller.scrollTo("update-section", {
      smooth: false,
      offset: -140,
    });

    if (!categorizedItems) {
      return;
    }
    const product = categorizedItems.find(item => item.id === id);

    if (product !== undefined) {
      setUpdateToProduct(product);
    }
  };

  return (
    <React.Fragment>
      {updateToProduct &&
          <React.Fragment>
              <Col xs={12} className='create-product-title px-0'>Update Product</Col>
              <Row className='update-section mt-1'>
                  <Col xs={12} sm={12}>
                      <Row className='title px-0'>
                          <Col xs={10} sm={10} className='update-product-text px-0'/>
                          <Col xs={2} sm={2} className='close-icon'>
                              <i onClick={handleOnCloseUpdateSection}><XCircle/></i>
                          </Col>
                      </Row>
                  </Col>
                  <Col md={6} lg={4} className='update-product-preview pt-2'>
                      <AdminUpdateProductPreview productName={productName}
                                                 updateToProduct={updateToProduct}
                                                 price={price}
                                                 discount={discount}
                                                 productNewImage={productNewImage}
                      />
                  </Col>
                  <Col md={6} lg={8} className='py-3'>
                      <AdminUpdateProduct closeUpdateSection={handleOnCloseUpdateSection}
                                          updateToProduct={updateToProduct}
                                          productName={productName}
                                          price={price}
                                          discount={discount}
                                          setProductName={setProductName}
                                          setPrice={setPrice}
                                          setDiscount={setDiscount}
                                          setProductNewImage={setProductNewImage}
                                          productNewImage={productNewImage}
                      />
                  </Col>
              </Row>
          </React.Fragment>
      }
      <Col xs={12} className='create-product-title px-0'>Product List</Col>
      <div className='item-list'>
        <Row>
          <Col xs={12} sm={6} className='product-list-table px-2 py-2'>
            <AdminProductCategoryDropdown categories={Categories}
                                          activeCategory={activeCategory}
                                          handleOnActiveCategory={handleOnActiveCategory}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SearchBar/>
          </Col>
        </Row>
        <Row>
          <Col className='px-0 product-list-table'>
            <AdminProductListTable activeCategory={activeCategory}
                                   categorizedItem={categorizedItems}
                                   requestUpdate={handleOnRequestUpdate}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AdminProductList;