import {CategoryList} from "../../types/CategorizeProductsType";
import * as ACTIONS from "../../constants/actions/categorizeProductsActions";
import {CategorizeProductsType} from "../actionTypes/categorizeProductsActionTypes";

const CategoryInitialState: CategoryList = {
  category: {id: 1, title: "All", searchedString: ''}
}

export function categorizeProductsReducer(state: CategoryList = CategoryInitialState,
                                          action: CategorizeProductsType): CategoryList {
  switch (action.type) {
    case ACTIONS.CHANGE_CATEGORY: {
      const newCategory = action.payload;
      return {
        ...state,
        category: {...newCategory}
      };
    }
    default: {
      return state;
    }
  }
}