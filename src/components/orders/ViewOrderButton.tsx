import React, {useEffect, useState} from 'react';
import approvedOrder from "../../assets/images/approvedOrder.webp";
import processingOrder from "../../assets/images/processingOrder.webp";
import rejectedOrder from "../../assets/images/rejectedOrder.webp";
import {Col, Image} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

type ViewOrderButtonProps = {
  id: string
  status: string
  routePath: string
}
const ViewOrderButton: React.FC<ViewOrderButtonProps> = (props) => {
  const {id, status, routePath} = props;
  const history = useHistory();
  const handleOnViewOrderClick = () => {
    history.push(routePath + id);
  }
  const [image, setImage] = useState<string>('');

  const renderViewOrderButton = React.useCallback(() => {
    if (status === 'requested') {
      return processingOrder
    } else if (status === 'approved') {
      return approvedOrder
    } else {
      return rejectedOrder
    }
  }, [status]);

  useEffect(() => {
    setImage(renderViewOrderButton());
  }, [props.status, renderViewOrderButton])
  return (
    <React.Fragment>
      <div className='view-order-button-div' onClick={handleOnViewOrderClick}>
        <Col xs={12}><Image src={image} className='view-order-button'/></Col>
      </div>
    </React.Fragment>
  );
};

export default ViewOrderButton;