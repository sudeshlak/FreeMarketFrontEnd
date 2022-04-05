import React, {useState} from "react";
import {Button, Nav, Navbar, Row} from "react-bootstrap";
import {Phone, User} from "react-feather";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../state/reducers";
import {ILogin} from "../types/ILogin";
import {changeLoginState} from "../state/actions/loginActions";

const MainTopNavBar: React.FC = () => {
  const [isRedirectRegister, setIsRedirectRegister] = useState(false);
  const loginState: ILogin = useSelector((state: AppState) => state.login);
  const dispatch = useDispatch();

  const handleRegisterRedirect = () => {
    setIsRedirectRegister(true)
  }
  const handleOnLogout = () => {
    localStorage.removeItem('token');
    dispatch(changeLoginState({login: false, type: null}));
  }

  return (
    <Row className='top-nav-col sticky-sm-top'>
      <Navbar expand="md">
        {
          (loginState.login && loginState.type === 'admin') &&
            <Link className='nav-link py-0' to={'/admin'}>Admin</Link>
        }
        <a href="tel:+94779510260" className='number-div'>
          <i className='phone-icon'><Phone size='1.1em'/></i>
          <label className='number'>+94779 510 260</label>
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Row className='delivery-area'>
              <Link to={'/deliveryArea'}>
                <i className="fas fa-truck fa-md"/>
                <label>Delivery Areas</label>
              </Link>
            </Row>
            {
              (loginState.login) &&
                <Row className='my-account'>
                    <Link to={'/userAccount'}>
                        <i><User size='1.1em'/></i>
                        <label>My Account</label>
                    </Link>
                </Row>
            }
            {!loginState.login &&
                <div className='register'>
                  {isRedirectRegister && <Redirect to='/register'/>}
                    <Button variant="outline-success" onClick={handleRegisterRedirect}>Register</Button>
                </div>
            }
            {loginState.login ?
              <Row className='login-row'>
                <li><Button onClick={() => handleOnLogout()} className='logout-button'>Logout</Button></li>
              </Row> :
              <Row className='login-row'>
                <li><Link to={'/login'}>Login</Link></li>
              </Row>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='divider'/>
    </Row>
  );
};

export default MainTopNavBar;