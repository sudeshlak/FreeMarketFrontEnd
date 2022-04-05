import React, {useEffect, useRef, useState} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import OrderItemTable from './OrderItemTable';
import {useMutation} from "@apollo/client";
import {GET_ONE_ORDER} from "../../graphQl/orders/orderMutation";
import {IOrder} from "../../types/IOrder";
import {useReactToPrint} from "react-to-print";

interface MatchParams {
  match: {
    params: {
      id: string
    }
  };
}

const OrderItemList: React.FC<MatchParams> = (props) => {

  const [order] = useMutation(GET_ONE_ORDER);
  const [thisOrder, setThisOrder] = useState<IOrder | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const upperCase = (word: string | undefined) => {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const handlePrint = useReactToPrint({
    bodyClass: 'main-area',
    pageStyle: 'print-order',
    content: () => componentRef.current,
  });
  useEffect(() => {
    order({
      variables: {
        id: props.match.params.id
      }
    }).then(({data}) => {
      setThisOrder(data.getOneOrder)
    });
  }, [order, props.match.params.id]);
  return (
    <React.Fragment>
      <div ref={componentRef} className='order'>
        <Col xs={12} className='create-product-title px-0'>Order</Col>
        <div className={(thisOrder?.status === 'requested') ?
          `order-item-list-requested` : (thisOrder?.status === 'approved') ?
            `order-item-list-approved` : `order-item-list-rejected`
        }>
          <Row className='order-item-head'>
            <Col className='order-no'>
              Order No : {upperCase(thisOrder?.orderCode)}
            </Col>
            <Col className='order-no'>
              Status : {upperCase(thisOrder?.status)}
            </Col>
          </Row>
          <Row>
            <OrderItemTable
              order={thisOrder ? thisOrder : null}
              billingDetails={thisOrder ? thisOrder.billingDetails : null}
              products={thisOrder ? thisOrder.productList : null}/>
          </Row>
        </div>
      </div>
      <div className='text-end'>
        <Button className='btn-dark mt-1' size={"sm"} onClick={handlePrint}>Print Order</Button>
      </div>
    </React.Fragment>
  )
};

export default OrderItemList;