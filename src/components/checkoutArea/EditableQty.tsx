import React from 'react';
import {useDispatch} from "react-redux";
import {changeCartProduct} from "../../state/actions/cartActions";
import {IProduct} from "../../types/IProduct";
import {MinusCircle, PlusCircle} from "react-feather";

type EditableQtyProps = {
    item: IProduct
}

const EditableQty: React.FC<EditableQtyProps> = (props) => {
    const dispatch = useDispatch();

    const {item} = props;

    const handleAddQty = () => {
        dispatch(changeCartProduct({...item, quantity: item.quantity + 1}));
    };

    const handleMinusQty = () => {
       if (item.quantity > 1) {
             dispatch(changeCartProduct({...item, quantity: item.quantity - 1}));
       }
    };

    return (
        <div className='qty-editor'>
            <MinusCircle  className={"minus-circle"} size="18" onClick={handleMinusQty}/>
            <label>{item.quantity}</label>
            <PlusCircle className={"plus-circle"} size="18" onClick={handleAddQty}/>
        </div>
    )
};

export default EditableQty;