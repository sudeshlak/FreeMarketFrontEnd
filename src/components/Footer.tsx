import React from "react";
import {Col, Row, Navbar, Nav, Container} from "react-bootstrap";
import {Twitter, Facebook, Instagram} from "react-feather";
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Container fluid={true}>
      <Row className="footer">
        <Col>
          <Row className='footer-navigation py-2'>
            <Navbar>
              <Navbar.Collapse className="justify-content-center">
                <Nav className="navbar-center">
                  <Link to="/">HOME</Link>
                  <Link to="/about_us">ABOUT US</Link>
                  <Link to="/FAQ">FAQ</Link>
                  <Link to="/contact_us">CONTACT US</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <Row xs={12} className='footer-details text-center py-3'>
            <Col lg={{span: 4, offset: 4}} md={{span: 8, offset: 2}} xs={{span: 12}}>
              <Col xs={12} className='team-title py-1'><label>Team </label><label
                className='team-name'> UNITY</label></Col>
              <Col xs={12}>React Base - Free Industrial Training</Col>
              <Col xs={12}>Sri Lanka</Col>
              <Col xs={12}>+94 585 858 585</Col>
              <Col xs={12}>+94 858 525 252</Col>
              <Col xs={12}>Copyright © 2020</Col>
              <Col xs={12} className='py-3'>
                <div className='social'>
                  <i><a href="www.facebook.com"> <Facebook size='1.3em'/></a></i>
                  <i><a href="www.twitter.com"><Twitter size='1.3em'/></a></i>
                  <i><a href="www.instagram.com"><Instagram size='1.3em'/></a></i>
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;