import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import MainTopNavBar from "../MainTopNavBar";
import MainMiddleNavBar from "../MainMiddleNavBar";
import ShoppingAreaNavBar from "../shoppingAreaNavBar/ShoppingAreaNavBar";
import RegisterImage from "../../assets/images/register-img.webp";
import RegisterForm from "./RegisterForm";
import Footer from "../Footer";

const Register: React.FC = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>
      <Container>
        <Row className='register'>
          <Col xs={12} sm={12} md={6} className='register-img'>
            <Image className="w-100 mt-4"
                 src={RegisterImage}
                 alt="register image"
            />
          </Col>
          <RegisterForm/>
        </Row>
      </Container>
      <Footer/>
    </React.Fragment>
  );
};

export default Register;