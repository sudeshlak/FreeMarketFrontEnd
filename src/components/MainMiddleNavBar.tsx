import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {ShoppingCart} from "react-feather";
import CartArea from "./cartArea/CartArea";
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {IProduct} from "../types/IProduct";
import {AppState} from "../state/reducers";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {useEffect} from "react";

const MainMiddleNavBar: React.FC = () => {

  const UpdatingPopover = React.forwardRef(
    (props: any, ref: React.Ref<HTMLAnchorElement>) => {
      useEffect(() => {
        props.popper.scheduleUpdate();
      }, [props.children, props.popper]);

      return (
        <Popover ref={ref}  {...props}>
          {props.children}
        </Popover>
      );
    },
  );

  const items: IProduct[] = useSelector((state: AppState) => state.cartProducts.cartProducts);
  const [isRedirect, setIsRedirect] = useState(false);

  const onclickRoute = () => {
    setIsRedirect(true);
  }

  return (
    <Container className="sticky-top" fluid={true}>
      {isRedirect && <Redirect to='/checkout'/>}
      <Row className='main-middle-nav-bar py-2'>
        <Col xs={6} sm={2} md={2} lg={2} className='logo-col'>
          <Link to='/' className='logo py-2'>LOGO</Link>
        </Col>
        <Col xs={6} sm={{span: 1, offset: 7}} md={{span: 1, offset: 7}} lg={{span: 1, offset: 8}}
             className='shopping-cart py-2'>
          <OverlayTrigger
            placement='bottom-end'
            trigger="click"
            rootClose
            overlay={
              <UpdatingPopover id="popover-contained"><CartArea/></UpdatingPopover>
            }
          >
            <div className='shopping-cart-icon'>
              <i className='cart-icon'><ShoppingCart size='2em' color='#4caf50'/></i>
              <span className='dot'>{items ? items.length : 0}</span>
            </div>
          </OverlayTrigger>
        </Col>
        <Col hidden-xs='true' sm={2} md={2} lg={1} className='check-out-col py-2'>
          <Button variant="success" size='sm' className='checkout-btn' onClick={onclickRoute}>Checkout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MainMiddleNavBar;