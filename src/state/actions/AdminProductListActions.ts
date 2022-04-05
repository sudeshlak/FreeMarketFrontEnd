import * as ACTIONS from "../../constants/actions/AdminProductListActions";
import { ISearchedCategory } from "../../types/AdminProductListType";
import {ChangeCategory} from "../actionTypes/AdminProductListActionTypes";

export function changeCategory(category: ISearchedCategory) : ChangeCategory {
  return{
    type: ACTIONS.CHANGE_CATEGORY,
    payload : category
  }
}