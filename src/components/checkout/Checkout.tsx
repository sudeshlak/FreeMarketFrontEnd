import React from "react";
import {Container} from 'react-bootstrap';
import MainTopNavBar from "../MainTopNavBar";
import MainMiddleNavBar from "../MainMiddleNavBar";
import ShoppingAreaNavBar from "../shoppingAreaNavBar/ShoppingAreaNavBar";
import CheckoutArea from "../checkoutArea/CheckoutArea";
import Footer from "../Footer";
import ShoppingForm from "../ShoppingForm";

const Checkout: React.FC = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>
      <CheckoutArea/>
      <ShoppingForm/>
      <Footer/>
    </React.Fragment>
  );
}

export default Checkout;