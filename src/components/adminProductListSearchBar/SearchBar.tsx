import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import Select from "react-select";
import {styleSelect} from "./searchBarConstants";
import {themeSelect} from "./searchBarConstants";
import {useDispatch, useSelector} from "react-redux";
import {IProduct} from "../../types/IProduct";
import {ProductSelect} from "../../types/ShoppingAreaTypes";
import {AppState} from "../../state/reducers";
import {ISearchedCategory} from "../../types/AdminProductListType";
import {changeCategory} from "../../state/actions/AdminProductListActions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<ProductSelect[] | undefined>(undefined);
  const [searchBarText, setSearchBarText] = useState<string>("");
  const products: IProduct[] = useSelector((state: AppState) => state.products.products);
  const activeCategory: ISearchedCategory = useSelector((state: AppState) => state.adminProductList.category);

  const handleOnProductSelect = (selectedProduct: ProductSelect | null) => {
    if (!selectedProduct) {
      return;
    }
    dispatch(changeCategory({id: 5, title: "Searched", searchedString: selectedProduct.value}));
    setSearchBarText(selectedProduct.value);
  }

  const HandleOnClickSearch = () => {
    if (!searchBarText) {
      return;
    }
    dispatch(changeCategory({id: 5, title: "Searched", searchedString: searchBarText}));
  }

  const IndicatorsContainer = () => {
    return (
      <div><BsSearch className='search-icon' size='1.3em' onClick={() => HandleOnClickSearch()}/></div>
    );
  };

  const handleOnChangeInputText = (inputText: string) => {
    setSearchBarText(inputText);
    const options: ProductSelect[] = products.filter(
      (product => product.title.toLowerCase().includes(inputText.toLowerCase()))).map((product) => {
      return {label: product.title, value: product.title}
    });
    setOptions(options);
  };

  const generateCurrentValue = () => {
    if (activeCategory.id === 5) {
      return {value: activeCategory.searchedString, label: activeCategory.searchedString}
    } else {
      return {value: "", label: ""}
    }
  };

  useEffect(() => {
    if (!(activeCategory.title === "Searched")) {
      setSearchBarText('');
    }
  }, [activeCategory]);

  return (
    <Row className='admin-product-list-search-bar'>
      <Select className='search-bar'
              theme={themeSelect}
              styles={styleSelect}
              placeholder="Search products . . ."
              options={options}
              inputValue={searchBarText}
              value={generateCurrentValue()}
              components={{IndicatorsContainer}}
              openMenuOnClick={false}
              allowCreateWhileLoading
              isSearchable
              isClearable
              onInputChange={(value, action) => {
                if (action.action === "input-change") handleOnChangeInputText(value);
              }}
              onChange={(selected: ProductSelect | null) => {
                handleOnProductSelect(selected)
              }}
      />
    </Row>
  )
}

export default SearchBar;