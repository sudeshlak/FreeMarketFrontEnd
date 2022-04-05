import * as ACTIONS from "../../constants/actions/AdminProductListActions";
import { CategorizeProductsType } from "../actionTypes/AdminProductListActionTypes"
import {CategoryList} from "../../types/AdminProductListType";

const AdminProductListInitialState: CategoryList = {
  category: {id: 0, title: "All", searchedString: ''}
}

export function AdminProductListReducer(state = AdminProductListInitialState,
                                            action: CategorizeProductsType): CategoryList {
  switch(action.type){
    case ACTIONS.CHANGE_CATEGORY: {
      const newCategory = action.payload;
      return {
        ...state,
        category: {...newCategory}
      }
    }
    default: {
      return state;
    }
  }
}