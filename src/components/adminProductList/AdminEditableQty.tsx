import React from 'react';
import { IProduct } from '../../types/IProduct';

type AdminEditableQtyProps = {
    item: IProduct
}

const AdminEditableQty: React.FC<AdminEditableQtyProps> = (props) => {
    return (
        <div className='qty-editor'>
            <label>{props.item.quantity}</label>
        </div>
    )
};

export default AdminEditableQty;