import React from 'react';
import {Card} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import {columns, options} from './OrderItemContant'
import paginationFactory from 'react-bootstrap-table2-paginator';
import NumberFormat from 'react-number-format';
import {smallCentsWithPrefix} from "../../util/uiComponents";
import {IProduct} from "../../types/IProduct";
import DisplayImage from "../displayImage/DisplayImage";
import TotalBill from "../checkoutArea/TotalBill";
import OrderShippingDetails from "./OrderShippingDetails";
import {IBillingAddress, IOrder} from "../../types/IOrder";
import Discount from "../checkoutArea/Delivery";
import {AdminOrderItemTableRow} from "../../types/AdminOrderListType";

type OrderItemTableProps = {
  products: IProduct[] | null
  billingDetails: IBillingAddress | null
  order: IOrder | null
}

const OrderItemTable: React.FC<OrderItemTableProps> = (props) => {
  const {products, billingDetails} = props;
  const subTotalPrice = products ? products.reduce((total: number, b: IProduct) =>
    total + ((b.regular_price - b.discount_price) * b.quantity), 0) : 0;

  const listRows = () => {
    if (!products) {
      return [];
    }
    return products.map((item: IProduct, index: number) => {
      const itemRow: AdminOrderItemTableRow = {
        key: index + 1,
        id: index + 1,
        Name: item.title,
        Category: item.category.title,
        Image: <DisplayImage image={item.image} className={'order-table-image'}/>,
        Qty: item.quantity,
        UnitPrice: <NumberFormat value={item.regular_price - item.discount_price} thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2} fixedDecimalScale={true} renderText={smallCentsWithPrefix}
        />,
        Amount: <NumberFormat value={item.quantity ?
          item.quantity * (item.regular_price - item.discount_price) :
          (item.regular_price - item.discount_price)}
                              thousandSeparator={true}
                              displayType='text'
                              prefix={'Rs. '}
                              decimalScale={2} fixedDecimalScale={true} renderText={smallCentsWithPrefix}
        />
      };
      return itemRow;
    });
  }

  const getTable = () => {
    return <BootstrapTable bootstrap4 keyField='id'
                           classes={`custom-table item-table`}
                           columns={columns}
                           data={listRows()}
                           pagination={paginationFactory(options)}
                           wrapperClasses="table-responsive"
    />
  };
  return (
    <React.Fragment>
      <div>
        <Card.Body className='admin-order-item-list'>
          {getTable()}
        </Card.Body>
      </div>
      {
        props.order &&
          <React.Fragment>
              <Discount subTotalPrice={subTotalPrice}
                        discountPercentage={props.order.discountPercentage}/>
              <TotalBill subTotalPrice={subTotalPrice}
                         discountPercentage={props.order.discountPercentage}
              />
          </React.Fragment>
      }
      <OrderShippingDetails
        order={props.order ? props.order : null}
        billingDetails={billingDetails}/>
    </React.Fragment>
  )
}

export default OrderItemTable;