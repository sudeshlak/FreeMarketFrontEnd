import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Select from 'react-select';
import {ICategory, ISearchedCategory} from '../../types/AdminProductListType';
import {styleSelect} from "../createProduct/CreateProductConstants";

type AdminProductListCategoryDropdownProps = {
  categories: ICategory[]
  activeCategory: ISearchedCategory
  handleOnActiveCategory: (Selected: ICategory | null) => void
};

const AdminProductCategoryDropdown: React.FC<AdminProductListCategoryDropdownProps> =
  (props) => {

    const generateCurrentCategory = () => {
      if(props.activeCategory.id === 5){
        return {value: 0, label: 'All'}
      }
      return {value: props.activeCategory.id, label: props.activeCategory.title }
    }

    return (
      <Row>
        <Col xs={4} sm={4} className='px-md-3'>
          <label>Category : </label>
        </Col>
        <Col xs={8} sm={8}>
          <Select options={props.categories}
                  allowCreateWhileLoading
                  isClearable={false}
                  isSearchable={true}
                  styles={styleSelect}
                  onChange={(selected: ICategory | null) => {
                    props.handleOnActiveCategory(selected);
                    }
                  }
                  value={generateCurrentCategory()}
                  defaultValue={{value: props.activeCategory.id, label: props.activeCategory.title}}
          />
        </Col>
      </Row>
    );
  };

export default AdminProductCategoryDropdown;