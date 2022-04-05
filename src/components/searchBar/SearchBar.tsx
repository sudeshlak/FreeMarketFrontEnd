import React, {useEffect, useState} from "react";
import {Col, Row} from 'react-bootstrap';
import {BsSearch} from 'react-icons/bs'
import Select from "react-select";
import {styleSelect, themeSelect} from "./searchBarConstants";
import {ProductSelect} from "../../types/ShoppingAreaTypes";
import {IProduct, ISearchedCategory} from "../../types/IProduct";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import {changeCategory} from "../../state/actions/categorizeProdcutsActions";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const activeCategory: ISearchedCategory = useSelector((state: AppState) => state.categoryList.category);
  const products: IProduct[] = useSelector((state: AppState) => state.products.products);
  const [options, setOptions] = useState<ProductSelect[] | undefined>(undefined);
  const [searchBarText, setSearchBarText] = useState<string>("");

  const HandleOnClickSearch = () => {
    if (!searchBarText) {
      return;
    }
    dispatch(changeCategory({id: 5, title: "Searched", searchedString: searchBarText}));
  }

  const handleOnProductSelect = (selectedProduct: ProductSelect | null) => {
    if (!selectedProduct) {
      return;
    }
    dispatch(changeCategory({id: 5, title: "Searched", searchedString: selectedProduct.value}));
    setSearchBarText(selectedProduct.value);
  }

  const IndicatorsContainer = () => {
    return (
      <div><BsSearch className='search-icon ' size='1.3em' onClick={() => HandleOnClickSearch()}/></div>
    );
  }

  const handleOnChangeInputText = (inputText: string) => {
    setSearchBarText(inputText);
    const options: ProductSelect[] = products.filter(
      (product => product.title.toLowerCase().includes(inputText.toLowerCase()))).map((product) => {
      return {label: product.title, value: product.title}
    });
    setOptions(options);
  }

  const generateCurrentValue = () => {
    if (activeCategory.title === 'Searched') {
      return {value: activeCategory.searchedString, label: activeCategory.searchedString};
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    if (!(activeCategory.title === "Searched")) {
      setSearchBarText('');
    }
  }, [activeCategory]);

  return (
    <Row className='search-bar'>
      <Col xs={12} md={{offset: 2, span: 8}} lg={{offset: 4, span: 4}}>
        <Select theme={themeSelect}
                styles={styleSelect}
                inputValue={searchBarText}
                placeholder="Search...."
                value={generateCurrentValue()}
                components={{IndicatorsContainer}}
                openMenuOnClick={false}
                options={options}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") handleOnChangeInputText(value);
                }}
                onChange={(selected: ProductSelect | null) => {
                  handleOnProductSelect(selected)
                }}
                isClearable={true}
        />
      </Col>
    </Row>
  );
}

export default SearchBar;