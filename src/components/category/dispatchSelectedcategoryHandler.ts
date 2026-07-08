import { Dispatch } from "redux";
import { changeCategory } from "../../state/actions/categorizeProdcutsActions";
import { ISearchedCategory } from "../../types/IProduct";
import Scroll from "react-scroll";

export const dispatchSelectedCategory = (dispatch: Dispatch) => {
    
    return (category: ISearchedCategory) =>{
        Scroll.scroller.scrollTo("products", {
              smooth: false,
              offset: -140,
        });
        dispatch(changeCategory(category))
    }
}