import React from "react";
import {Card, Row} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {columns, options} from "./UserOrderItemListConstant";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {IProduct} from "../../types/IProduct";
import NumberFormat from "react-number-format";
import {smallCentsWithPrefix} from "../../util/uiComponents";
import DisplayImage from "../displayImage/DisplayImage";

type OrderItemTableProps = {
  products: IProduct[] | null
}
const OrderItemTable: React.FC<OrderItemTableProps> = (props) => {
  const listRows = () => {
    if (!props.products) {
      return []
    }
    return props.products.map((item: IProduct, index: number) => {
      const itemRow: any = {
        key: index + 1,
        id: index + 1,
        Name: item.title,
        Category: item.category.title,
        Image: <DisplayImage className={'order-table-image'} image={item.image}/>,
        Qty: item.quantity,
        UnitPrice: <NumberFormat value={item.regular_price - item.discount_price}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}
                                 renderText={smallCentsWithPrefix}
        />,
        Amount: <NumberFormat value={item.quantity ?
          item.quantity * (item.regular_price - item.discount_price) :
          (item.regular_price - item.discount_price)}
                              thousandSeparator={true}
                              displayType='text'
                              prefix={'Rs. '}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              renderText={smallCentsWithPrefix}
        />
      };
      return itemRow;
    })
  }

  const getTable = () => {
    return <BootstrapTable bootstrap4
                           keyField='id'
                           classes={`custom-table item-table`}
                           columns={columns}
                           data={listRows()}
                           pagination={paginationFactory(options)}
                           wrapperClasses="table-responsive"
    />
  }

  return (
    <Row className='order-item-table'>
      <Card.Body>
        {getTable()}
      </Card.Body>
    </Row>
  )
}

export default OrderItemTable;