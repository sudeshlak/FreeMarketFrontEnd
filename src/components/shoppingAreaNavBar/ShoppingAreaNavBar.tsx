import React from "react";
import {Navbar, Row, Nav, NavDropdown, Container} from "react-bootstrap";
import {changeCategory} from "../../state/actions/categorizeProdcutsActions";
import {useDispatch} from "react-redux";
import Scroll from "react-scroll";
import {Link} from "react-router-dom";

const ShoppingAreaNavBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleOnChange = (category: string) => {
    Scroll.scroller.scrollTo("products", {
      smooth: false,
      offset: -140,
    });

    if (category === "All") {
      dispatch(changeCategory({id: 1, title: "All", searchedString: ''}));
    } else if (category === "Grocery") {
      dispatch(changeCategory({id: 2, title: "Grocery", searchedString: ''}));
    } else if (category === "Pharmacy") {
      dispatch(changeCategory({id: 3, title: "Pharmacy", searchedString: ''}));
    } else if (category === "Food") {
      dispatch(changeCategory({id: 4, title: "Food", searchedString: ''}));
    } else if (category === "Electronics") {
      dispatch(changeCategory({id: 5, title: "Electronic", searchedString: ''}));
    }
  };

  return (
    <Container className="shopping-area">
      <Row className='shopping-area-nav-bar'>
        <Navbar expand="sm" className='nav-nar-third'>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown className='nav-drop-down' title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onSelect={() => {
                  handleOnChange("All")
                }}
                >All</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onSelect={() => {
                  handleOnChange("Grocery")
                }}
                >Grocery</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" onSelect={() => {
                  handleOnChange("Pharmacy")
                }}
                >Pharmacy</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4" onSelect={() => {
                  handleOnChange("Food")
                }}
                >Food</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5" onSelect={() => {
                  handleOnChange("Electronics")
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