import React from "react";
import {Image, Col} from 'react-bootstrap';
import processingOrder from "../../assets/images/processingOrder.webp";
import {useHistory} from 'react-router-dom';

const ViewOrderItemBtn: React.FC = () => {
  const history = useHistory();

  const handleOnViewOrderClick = () => {
    history.push(`/userAccount/orders/${5}`)
  }

  return (
    <React.Fragment>
    <div className='view-order-button-div' onClick={handleOnViewOrderClick}>
      <Col xs={12}><Image src={processingOrder} className='view-order-button'/></Col>
    </div>
  </React.Fragment>
  )
}

export default ViewOrderItemBtn;