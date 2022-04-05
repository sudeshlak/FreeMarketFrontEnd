import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import Footer from '../Footer';
import MainMiddleNavBar from '../MainMiddleNavBar';
import MainTopNavBar from '../MainTopNavBar';
import ShoppingAreaNavBar from '../shoppingAreaNavBar/ShoppingAreaNavBar';
import {MapPin, Mail, Phone} from 'react-feather';

const ContactUs = () => {
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
            <h5 className='p-0'>Contact Us</h5>
          </Col>
        </Row>
        <Row className='contact-us-div'>
          <Col xs={12} className='px-0 details'>
            <Row>
              <p>Have a question? Need a tip? If you can't find what you're looking for,
                we will be happy to point you in the right direction.</p>
            </Row>
            <Row>
              <p>Please feel free to Call, email — whatever works for you. We'll be here.</p>
            </Row>
            <Row>
              <Col xs={12}>
                <Row className='my-1'>
                  <Col xs={12} className='one-link'>
                    <i className='mx-2'><MapPin size='1.1em'/></i>
                    <label className='mb-0'>284, Georg R De Silva Mawatha, Colombo, Sri Lanka.</label>
                  </Col>
                </Row>
                <Row className='my-1'>
                  <Col xs={12} className='one-link'>
                    <a href="mailto:info@freemarket.com">
                      <i className='mx-2'><Mail size='1.1em'/></i>
                      <label className='mb-0'>info@freemarket.com</label>
                    </a>
                  </Col>
                </Row>
                <Row className='my-1'>
                  <Col xs={12} className='one-link'>
                    <a href='tel:+94779510260'>
                      <i className='mx-2'><Phone size='1.1em'/></i>
                      <label className='mb-0'>+94 779 510 260</label>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  )
};

export default ContactUs