import React from "react";
import {Row, Col} from "react-bootstrap";

type UserOrderItemListHeaderProps = {
  orderCode: string
  state: string
}
const UserOrderHeader: React.FC<UserOrderItemListHeaderProps> = (props) => {

  const upperCase = (word: string | undefined) => {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <Row className='title'>
      <Col xs={6}>Order No : {upperCase(props.orderCode)}</Col>
      <Col xs={6}>Order State : {upperCase(props.state)}</Col>
    </Row>
  )
}

export default UserOrderHeader;