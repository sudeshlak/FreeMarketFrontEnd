import React, {useEffect, useState} from "react";
import {Card, Image, Row} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {columns, options} from "./OrderListConstant";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {IOrder} from "../../types/IOrder";
import OrderListTotal from "./OrderListTotal";
import {SelectStatusType, UserOrderTableRow} from "../../types/AdminOrderListType";
import emptyOrder from "../../assets/images/emptyOrder.webp";
import {useMutation} from "@apollo/client";
import {CHANGE_ORDER_BY_TOKEN} from "../../graphQl/orders/orderMutation";
import Image2 from "../../assets/images/all-cat.jpg";
import ViewOrderButton from "../orders/ViewOrderButton";

type OrderListProps = {
  activeStatus: SelectStatusType
}
const UserOrderListTable: React.FC<OrderListProps> = (props) => {
  const [getOrdersByToken] = useMutation<{ getOrdersByToken: IOrder[] }>(CHANGE_ORDER_BY_TOKEN);
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);
  const [orderContent, setOrdersContent] = useState<UserOrderTableRow[]>([]);
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
  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      return;
    }
    getOrdersByToken({
      variables: {
        token: token
      }
    }).then(({data}) => {
      if (data) {
        setUserOrders(data.getOrdersByToken);
      }
    });
    return (() => {
      setUserOrders([]);
    });
  }, [getOrdersByToken]);

  const listRow = React.useCallback(() => {
    if (props.activeStatus.label === 'All') {
      return userOrders.map((order: IOrder) => {
        return {
          key: order.id,
          OrderNo: order.orderCode,
          Image: <Image src={Image2} width="50%" height="30px" alt="ad" roundedCircle/>,
          OrderDate: order.requestedDate,
          OrderTotal: <OrderListTotal discountPercentage={order.discountPercentage} productList={order.productList}/>,
          State: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          PaymentMethod: (order.paymentType === 'onlinePayment') ? 'Online Payment' : 'Cash On Delivery',
          Action: <ViewOrderButton id={order.id} status={order.status} routePath={"/userAccount/"}/>
        }
      })
    } else {
      return userOrders.filter((order: IOrder) => (order.status === props.activeStatus.label.toLowerCase()))
        .map((order: IOrder) => {
          return {
            key: order.id,
            OrderNo: order.orderCode,
            Image: <Image src={Image2} width="50%" height="30px" alt="ad" roundedCircle/>,
            OrderDate: order.requestedDate,
            State: order.status.charAt(0).toUpperCase() + order.status.slice(1),
            OrderTotal: <OrderListTotal discountPercentage={order.discountPercentage} productList={order.productList}/>,
            PaymentMethod: (order.paymentType === 'onlinePayment') ? 'Online Payment' : 'Cash On Delivery',
            Action: <ViewOrderButton id={order.id} status={order.status} routePath={"/userAccount/"}/>
          }
        })
    }
  }, [props.activeStatus.label, userOrders]);

  useEffect(() => {
    setOrdersContent(listRow());
  }, [listRow, props.activeStatus, userOrders]);

  const getTable = () => {
    return <BootstrapTable bootstrap4
                           keyField='OrderNo'
                           classes={`custom-table item-table`}
                           data={orderContent}
                           columns={columns}
                           wrapperClasses="table-responsive"
                           pagination={paginationFactory(options)}
                           noDataIndication={ifEmpty}
    />
  }

  return (
    <Row>
      <Card.Body className='user-order-list'>
        {getTable()}
      </Card.Body>
    </Row>
  )
}

export default UserOrderListTable;