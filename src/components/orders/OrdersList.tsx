import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {SelectStatusType} from '../../types/AdminOrderListType';
import OrderListDropdown from './OrderListDropdown';
import OrderListTable from './OrderListTable';
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@apollo/client";
import {setInitOrders} from "../../state/actions/orderActions";
import {GET_ALL_ORDERS} from "../../graphQl/orders/orderQuery";
import {AppState} from "../../state/reducers";
import {IOrder} from "../../types/IOrder";
import {toast} from "../sweetalert/sweetalert";

const OrdersList: React.FC = () => {

  const dispatch = useDispatch();
  const {refetch} = useQuery(GET_ALL_ORDERS);
  const orders: IOrder[] = useSelector((state: AppState) => state.orders.orders);

  useEffect(() => {
    refetch().then(({data}) => {
      if (data) {
        dispatch(setInitOrders(data.getAllOrders));
      }
    }).catch((error) => {
        toast('Failed to load orders', '', 'error');
      }
    );
  }, [refetch, dispatch]);

  const status: SelectStatusType[] = [
    {value: 0, label: 'All'},
    {value: 2, label: 'Requested'},
    {value: 3, label: 'Approved'},
    {value: 4, label: 'Rejected'},
  ];

  const [activeStatus, setActiveStatus] = useState<SelectStatusType>({value: 0, label: 'All'});
  const handleOnActiveStatus = (statusSelected: SelectStatusType | null) => {
    if (!statusSelected) {
      return;
    }
    setActiveStatus(statusSelected);
  };

  return (
    <React.Fragment>
      <Col xs={12} className='create-product-title px-0'> Order List</Col>
      <div className='order-list-div'>
        <Row>
          <Col className='order-list-title py-1'/>
        </Row>
        <Row>
          <OrderListDropdown status={status}
                             activeStatus={activeStatus}
                             handleOnActiveStatus={handleOnActiveStatus}
          />
        </Row>
        <Row>
          <OrderListTable orders={orders}
                          activeStatus={activeStatus}
          />
        </Row>
      </div>
    </React.Fragment>
  );
};

export default OrdersList;