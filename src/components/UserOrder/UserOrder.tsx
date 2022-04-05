import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import OrderItemTable from "./OrderItemTable";
import UserOrderHeader from "./UserOrderHeader";
import OrderDetails from "./OrderDetails";
import TotalBill from "../checkoutArea/TotalBill";
import {useMutation} from "@apollo/client";
import {IOrder} from "../../types/IOrder";
import {GET_ONE_ORDER} from "../../graphQl/orders/orderMutation";
import {IProduct} from "../../types/IProduct";
import Discount from "../checkoutArea/Delivery";

interface MatchParams {
  match: {
    params: {
      id: string
    }
  };
}

const UserOrder: React.FC<MatchParams> = (props) => {
  const [getOneOrder] = useMutation<{ getOneOrder: IOrder }>(GET_ONE_ORDER);
  const [order, setOrder] = useState<IOrder | null>(null);
  useEffect(() => {
    getOneOrder({
      variables: {
        id: props.match.params.id
      }
    }).then(({data}) => {
      if (data) {
        setOrder(data.getOneOrder);
      }
    });
  }, [getOneOrder, props.match.params.id]);
  const subTotalPrice = order?.productList ? order.productList.reduce((total: number, b: IProduct) =>
    total + ((b.regular_price - b.discount_price) * b.quantity), 0) : 0;
  return (
    <React.Fragment>
      <Col className='user-order'>
        <Row>
          <Col className='user-order-header'>
            Order
          </Col>
        </Row>
        <Row>
          <Col className={(order?.status === 'requested') ?
            `order-requested` : (order?.status === 'approved') ?
              `order-approved` : `order-rejected`}
          >
            <Row className='order-div'>
              <UserOrderHeader orderCode={order ? order.orderCode : ''}
                               state={order ? order.status : ''}
              />
              <OrderItemTable products={order ? order.productList : null}/>
              {order &&
                  <React.Fragment>
                      <Discount subTotalPrice={subTotalPrice}
                                discountPercentage={order.discountPercentage}/>
                      <TotalBill subTotalPrice={subTotalPrice}
                                 discountPercentage={order.discountPercentage}
                      />
                  </React.Fragment>
              }
              <OrderDetails billingDetails={order ? order.billingDetails : null}/>
            </Row>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
}

export default UserOrder;