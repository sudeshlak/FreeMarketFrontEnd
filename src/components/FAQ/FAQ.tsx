import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import Footer from '../Footer';
import MainMiddleNavBar from '../MainMiddleNavBar';
import MainTopNavBar from '../MainTopNavBar';
import ShoppingAreaNavBar from '../shoppingAreaNavBar/ShoppingAreaNavBar';
import Question from './Question';

const FAQ: React.FC = () => {
  const FAQs = [
    {
      question: "Do you save my credit card information? ",
      answer: `It is our top priority to keep credit card information safe. Please read about our 
          commitment to security here: Security Policy.  To make checkout quicker, we can store a 
          "token" of the most recent card you used. To prevent unauthorized access, we will ask you 
          for your password to authorize future use of your credit card and your information is 
          encrypted before it is sent over the Internet. You may also choose to enter your credit 
          card information each time you place an order.`
    },
    {
      question: "May I use coupons?",
      answer: `You may use the digital coupons you have loaded onto your Fuel Saver + Perks® card. 
          Aisles Online® cannot accept paper coupons.`
    },
    {
      question: "What happens if the price of an item I ordered decreases after I place my order?",
      answer: `In most cases, if the item you ordered is offered at a lower price between the time you 
          place your order and the time our personal shopper shops your order, you'll receive the lower price.`
    },
    {
      question: "I’m not finding everything I need. Can you help",
      answer: `While we may not be able to fulfill all requests, you may add a special request in the notes 
          for your personal shopper at checkout.  Our helpful employees will do their best to find and shop your request with the rest of your order.`
    },
  ]
  const renderFAQs = () => {
    return FAQs.map( (FAQ, index) => {
      return <Question question={FAQ.question} answer={FAQ.answer} index={index}/>
    })
  }
  return (
    <React.Fragment >
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>
      <Container fluid={true} className='pb-5'>
        <Row>
          <Col className='ml-3 mt-3'>
            <h5 className='p-0'>FAQ</h5>
          </Col>
        </Row>
        <Row className='faq-contant-div'>
          <Col xs={12}>
            <Row className='faqs mt-3'>
              {renderFAQs()}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default FAQ