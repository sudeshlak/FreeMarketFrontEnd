 import {sampleProducts} from "../../constants/SampleProducts";
import { IProduct } from "../../types/IProduct";
 
 interface storestate {
     allProducts: IProduct[]
 }

const initState: storestate = {
    allProducts: sampleProducts
}

export const ProductListReducer = (state:storestate = initState, action: any) => {
    switch(action.type){
        default:
            return state
    }
}