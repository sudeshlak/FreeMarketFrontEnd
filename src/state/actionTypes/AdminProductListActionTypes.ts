import * as ACTIONS from "../../constants/actions/AdminProductListActions";
import { ISearchedCategory } from "../../types/AdminProductListType";

export interface ChangeCategory {
  type: typeof ACTIONS.CHANGE_CATEGORY
  payload : ISearchedCategory
}

export type CategorizeProductsType = ChangeCategory;