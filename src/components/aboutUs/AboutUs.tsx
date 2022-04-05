import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import Footer from '../Footer';
import MainMiddleNavBar from '../MainMiddleNavBar';
import MainTopNavBar from '../MainTopNavBar';
import ShoppingAreaNavBar from '../shoppingAreaNavBar/ShoppingAreaNavBar';

const AboutUs: React.FC = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>
      <Container fluid={true}>
        <Row>
          <Col className='ml-3 mt-3'>
            <h5 className='p-0'>About Us</h5>
          </Col>
        </Row>
        <Row className='about-us-div'>
          <Col xs={12} className='px-0 details'>
            <Row>
              <p>The free market is the latest e-supermarket where you can shop for all
                 your grocery, beverages, electronic items, and household needs online.
                 Shop at the free market and get your order delivered to the doorstep.
                 What started small, with a single discount store and the simple idea of
                 selling more for less, has grown into one of the largest retailers in Sri
                 Lanka.
              </p>
            </Row>
            <Row>
              <p>
              We are offering a wide variety of food, beverages, and household products, organized
              into sections and shelves. It is larger and has a wider selection than other grocery
              stores. Right from fresh Fruits and Vegetables, Rice and Dals, Spices and Seasonings
              to Packaged products, Beverages, Personal care products – we have it all.
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default AboutUs;