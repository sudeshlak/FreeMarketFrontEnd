import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import SigningArea from "./shoppingFormArea/SigningArea";
import BillingAddress from "./shoppingFormArea/BillingAddress";

const ShoppingForm: React.FC = () => {
  return (
    <Container>
      <Row className='shopping-form-area'>
        <Col className='shopping-form-area-div' xs={12} sm={12} md={6} lg={{span: 7, offset: 5}}>
          <SigningArea/>
          <BillingAddress/>
        </Col>
      </Row>
    </Container>
  );
}

export default ShoppingForm;