import {ChangeCategory} from "../actionTypes/categorizeProductsActionTypes";
import * as ACTIONS from "../../constants/actions/categorizeProductsActions";
import {ISearchedCategory} from "../../types/IProduct";

export function changeCategory(category: ISearchedCategory): ChangeCategory {
  return {
    type: ACTIONS.CHANGE_CATEGORY,
    payload: category
  }
}