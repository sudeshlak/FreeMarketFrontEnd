import React from "react";
import {Navbar, Row, Nav, NavDropdown, Container} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { dispatchSelectedCategory } from "../category/dispatchSelectedcategoryHandler";
import { ALL_CATEGORY, ELECTRONIC_CATEGORY, FOOD_CATEGORY, GROCERY_CATEGORY, PHARMACY_CATEGORY } from "../../constants/productCategories";

const ShoppingAreaNavBar: React.FC = () => {

  const dispatch = useDispatch();
  const onSelectCategory = dispatchSelectedCategory(dispatch);

  return (
    <Container className="shopping-area">
      <Row className='shopping-area-nav-bar'>
        <Navbar expand="sm" className='nav-nar-third'>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown className='nav-drop-down' title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onSelect={() => {
                  onSelectCategory(ALL_CATEGORY)
                }}
                >All</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onSelect={() => {
                  onSelectCategory(GROCERY_CATEGORY)
                }}
                >Grocery</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" onSelect={() => {
                  onSelectCategory(PHARMACY_CATEGORY)
                }}
                >Pharmacy</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4" onSelect={() => {
                  onSelectCategory(FOOD_CATEGORY)
                }}
                >Food</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5" onSelect={() => {
                  onSelectCategory(ELECTRONIC_CATEGORY)
                }}
                >Electronic</NavDropdown.Item>
              </NavDropdown>
              <Link to="/">Home</Link>
              <Link to="/FAQ">FAQ</Link>
              <Link to="/about_us">About Us</Link>
              <Link to="/contact_us">Contact Us</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  );
}

export default ShoppingAreaNavBar;