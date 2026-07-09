import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Col, Row } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Select from "react-select";
import { styleSelect, themeSelect } from "./searchBarConstants";
import { ProductSelect } from "../../types/ShoppingAreaTypes";
import { IProduct, ISearchedCategory } from "../../types/IProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/reducers";
import { changeCategory } from "../../state/actions/categorizeProdcutsActions";
import client from "../../apollo/apollo";
import { SEARCH_PRODUCTS } from "../../graphQl/products/productQuery";
import { debounce } from "../../util/optimise";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const activeCategory: ISearchedCategory = useSelector(
    (state: AppState) => state.categoryList.category,
  );
  const [options, setOptions] = useState<ProductSelect[] | undefined>(
    undefined,
  );
  const [searchBarText, setSearchBarText] = useState<string>("");

  const HandleOnClickSearch = () => {
    if (!searchBarText) {
      return;
    }
    startTransition(() => {
      dispatch(
        changeCategory({
          id: 5,
          title: "Searched",
          searchedString: searchBarText,
        }),
      );
    });
  };

  const handleOnProductSelect = (selectedProduct: ProductSelect | null) => {
    if (!selectedProduct) {
      return;
    }
    dispatch(
      changeCategory({
        id: 5,
        title: "Searched",
        searchedString: selectedProduct.value,
      }),
    );
    setSearchBarText(selectedProduct.value);
  };

  const IndicatorsContainer = () => {
    return (
      <div>
        <BsSearch
          className="search-icon "
          size="1.3em"
          onClick={() => HandleOnClickSearch()}
        />
      </div>
    );
  };

  async function fetchSetOptions(searchTerm: string) {
    const { data } = await client.query({
      query: SEARCH_PRODUCTS,
      variables: { search: searchTerm },
    });
    const options: ProductSelect[] = data.getAllProducts.map(
      (prod: Pick<IProduct, "title">) => {
        return { value: prod.title, label: prod.title };
      },
    );
    startTransition(() => {
      setOptions(options);
    });
  }

  const debouncedSetOps = useMemo(() => debounce(fetchSetOptions, 1000), []);

  const handleOnChangeInputText = (inputText: string) => {
    setSearchBarText(inputText);
    if (inputText.trim()) {
      debouncedSetOps(inputText);
    }
  };

  const generateCurrentValue = () => {
    if (activeCategory.title === "Searched") {
      return {
        value: activeCategory.searchedString,
        label: activeCategory.searchedString,
      };
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    if (!(activeCategory.title === "Searched")) {
      setSearchBarText("");
    }
  }, [activeCategory]);

  return (
    <Row className="search-bar">
      <Col xs={12} md={{ offset: 2, span: 8 }} lg={{ offset: 4, span: 4 }}>
        <Select
          theme={themeSelect}
          styles={styleSelect}
          inputValue={searchBarText}
          placeholder="Search...."
          value={generateCurrentValue()}
          components={{ IndicatorsContainer }}
          openMenuOnClick={false}
          options={options}
          isSearchable={true}
          onInputChange={(value, action) => {
            if (action.action === "input-change")
              handleOnChangeInputText(value);
          }}
          onChange={(selected: ProductSelect | null) => {
            handleOnProductSelect(selected);
          }}
          isClearable={true}
        />
      </Col>
    </Row>
  );
};

export default SearchBar;
