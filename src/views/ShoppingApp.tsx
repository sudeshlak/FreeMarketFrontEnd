import React from "react";
import {Container} from "react-bootstrap";
import MainTopNavBar from "../components/MainTopNavBar";
import ShoppingArea from "../components/ShoppingArea";
import MainMiddleNavBar from "../components/MainMiddleNavBar";
import Footer from "../components/Footer";
import ShoppingAreaNavBar from "../components/shoppingAreaNavBar/ShoppingAreaNavBar";
import Banner from "../components/banner/Banner";

const ShoppingApp: React.FC = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>
      <Container fluid={true}>
        <Banner/>
        <ShoppingArea/>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}

export default ShoppingApp;