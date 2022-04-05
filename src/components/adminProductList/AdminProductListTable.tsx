import React from "react";
import emptyProduct from "../../assets/images/emptyProduct.webp";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {IProduct} from "../../types/IProduct";
import {Card} from "react-bootstrap";
import NumberFormat from "react-number-format";
import {smallCentsWithPrefix} from "../../util/uiComponents";
import {Edit, Trash} from "react-feather";
import {columns, options} from "./AdminProductListContants";
import AdminEditableQty from "./AdminEditableQty";
import DisplayImage from "../displayImage/DisplayImage";
import {AdminProductTableRow, ISearchedCategory} from "../../types/AdminProductListType";
import {confirmationBox, toast} from "../sweetalert/sweetalert";
import {useMutation} from "@apollo/client";
import {DELETE_PRODUCT} from "../../graphQl/products/productsMutation";
import {useDispatch} from "react-redux";
import {removeProduct} from "../../state/actions/productActions";

type AdminProductListTableProps = {
  categorizedItem: IProduct[] | null
  activeCategory: ISearchedCategory
  requestUpdate: (id: string) => void
}

const AdminProductListTable: React.FC<AdminProductListTableProps> = (props) => {
  const [deleteProduct] = useMutation<{ deleteProduct: IProduct }>(DELETE_PRODUCT);
  const dispatch = useDispatch();

  const handleOnDeleteProduct = (id: string, title: string, image: string) => {
    confirmationBox('Are You sure to delete product: ' + title,
      'Yes, delete it!',
      'No',
      'You won\'t be able to revert this!',
      'question').then(({isConfirmed}) => {
      if (isConfirmed) {
        deleteProduct({
          variables: {
            id: id,
            imageName: image
          }
        }).then(async ({data}) => {
          if (data) {
            dispatch(removeProduct(id));
            toast('Product :' + data.deleteProduct.title + ' deleted successfully', '', 'success');
          }
        }).catch(error => {
          toast('Failed to delete Product', '', 'error');
        });
      }
    })
  }

  const ifEmpty = () => {
    return (
      <div className="checkout-table-empty-cart text-center">
        <img src={emptyProduct} alt="Empty"/>
        <p>Category: {props.activeCategory.title} is empty</p>
      </div>
    )
  };

  const listRows = () => {
    if (!props.categorizedItem) {
      return [];
    }
    return props.categorizedItem.map((item: IProduct, index: number) => {
      const itemRow: AdminProductTableRow = {
        key: item.id,
        index: index + 1,
        name: item.title,
        image: <DisplayImage image={item.image} className={'cart-product-image'}/>,
        qty: <AdminEditableQty item={item}/>,
        unitPrice: <NumberFormat value={item.regular_price} thousandSeparator={true} displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2} fixedDecimalScale={true} renderText={smallCentsWithPrefix}
        />,
        discount: <NumberFormat value={item.discount_price}
                                thousandSeparator={true}
                                displayType='text'
                                prefix={'Rs. '}
                                decimalScale={2} fixedDecimalScale={true} renderText={smallCentsWithPrefix}
        />,
        editIcon: <Edit size='1.3em' className="edit-btn" color="orange"
                        onClick={() => {
                          props.requestUpdate(item.id)
                        }}/>,
        removeIcon: <Trash size='1.3em' className="remove-btn" color="red"
                           onClick={() => handleOnDeleteProduct(item.id, item.title, item.image)}/>
      };
      return itemRow;
    });
  };

  const getTable = () => {
    return <BootstrapTable bootstrap4
                           keyField='key'
                           classes={`custom-table item-table`}
                           data={listRows()}
                           columns={columns}
                           pagination={paginationFactory(options)}
                           wrapperClasses="table-responsive"
                           noDataIndication={ifEmpty}
    />
  };

  return (
    <Card.Body className="admin-product-list pt-0">
      {getTable()}
    </Card.Body>
  )
};

export default AdminProductListTable;