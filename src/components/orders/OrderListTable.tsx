import React, {useEffect, useState} from 'react';
import {Card, Image} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {columns, options} from './OrderListContant';
import emptyOrder from "../../assets/images/emptyOrder.webp";
import {AdminOrderTableRow, SelectStatusType} from '../../types/AdminOrderListType';
import {IOrder} from "../../types/IOrder";
import Image2 from "../../assets/images/all-cat.jpg";
import ViewOrderButton from "./ViewOrderButton";
import ChangeState from "./ChangeState";
import OrderListTotal from "./OrderListTotal";

type OrderListTableProps = {
  orders: IOrder[] | []
  activeStatus: SelectStatusType
}

const OrderListTable: React.FC<OrderListTableProps> = (props) => {
  const {orders} = props;
  const [orderContent, setOrdersContent] = useState<AdminOrderTableRow[]>([]);
  const ifEmpty = () => {
    return (
      <div>
        <div className="checkout-table-empty-cart text-center">
          <img src={emptyOrder} alt="Empty"/>
          <p>Status: {props.activeStatus.label} orders are empty</p>
        </div>
      </div>
    )
  };

  const listRow = React.useCallback(() => {
    if (props.activeStatus.label === 'All') {
      return orders.map((order: IOrder) => {
        return {
          key: order.id,
          OrderNo: order.orderCode,
          Image: <Image src={Image2} width="50%" height="30px" alt="ad" roundedCircle/>,
          OrderDate: order.requestedDate,
          OrderTotal: <OrderListTotal discountPercentage={order.discountPercentage}
                                      productList={order.productList}/>,
          PaymentMethod: (order.paymentType === 'onlinePayment') ? 'Online Payment' : 'Cash On Delivery',
          Status: <ChangeState status={order.status} id={order.id} orderCode={order.orderCode}/>,
          Action: <ViewOrderButton id={order.id} status={order.status} routePath={"/admin/orders/"}/>
        }
      })
    } else {
      return orders.filter((order: IOrder) => (order.status === props.activeStatus.label.toLowerCase()))
        .map((order: IOrder) => {
          return {
            key: order.id,
            OrderNo: order.orderCode,
            Image: <Image src={Image2} width="50%" height="30px" alt="ad" roundedCircle/>,
            OrderDate: order.requestedDate,
            OrderTotal: <OrderListTotal productList={order.productList} discountPercentage={order.discountPercentage}/>,
            PaymentMethod: (order.paymentType === 'onlinePayment') ? 'Online Payment' : 'Cash On Delivery',
            Status: <ChangeState status={order.status} id={order.id} orderCode={order.orderCode}/>,
            Action: <ViewOrderButton id={order.id} status={order.status} routePath={"/admin/orders/"}/>
          }
        })
    }
  }, [orders, props.activeStatus.label]);

  useEffect(() => {
    setOrdersContent(listRow());
  }, [listRow, props]);

  const getTable = () => {
    return <BootstrapTable bootstrap4
                           keyField='key'
                           classes={`custom-table item-table`}
                           data={orderContent}
                           columns={columns}
                           pagination={paginationFactory(options)}
                           wrapperClasses="table-responsive"
                           noDataIndication={ifEmpty}
    />
  };

  return (
    <div>
      <Card.Body className='admin-order-list pt-0'>
        {getTable()}
      </Card.Body>
    </div>
  )
};

export default OrderListTable;