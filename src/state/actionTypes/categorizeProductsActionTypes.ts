import * as ACTIONS from "../../constants/actions/categorizeProductsActions";
import {ISearchedCategory} from "../../types/IProduct";

export interface ChangeCategory {
    type: typeof ACTIONS.CHANGE_CATEGORY
    payload : ISearchedCategory
}

export type CategorizeProductsType = ChangeCategory;