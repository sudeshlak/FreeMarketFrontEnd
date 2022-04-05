import React, {useState} from "react";
import {IProduct} from "../../types/IProduct";
import {useDispatch, useSelector} from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import emptyCartIcon from "../../assets/images/emptyCart.png";
import CheckoutTitle from "./CheckoutTitle";
import Discount from "./Discount";
import Delivery from "./Delivery";
import TotalBill from "./TotalBill";
import {ChevronLeft, Trash} from "react-feather";
import {columns, options} from "./checkoutAreaConstants";
import {Redirect} from "react-router-dom";
import NumberFormat from "react-number-format";
import EditableQty from "./EditableQty";
import {AppState} from "../../state/reducers";
import {removeCartProduct} from "../../state/actions/cartActions";
import {smallCentsWithPrefix} from "../../util/uiComponents";
import DisplayImage from "../displayImage/DisplayImage";
import {CheckoutTableItem} from "../../types/CheckoutAreaTypes";
import {IAddCoupon} from "../../types/ICoupon";

const CheckoutArea: React.FC = () => {
  const coupon: IAddCoupon | null = useSelector((state: AppState) => state.coupon);
  const dispatch = useDispatch();
  const [isHomeRedirect, setIsHomeRedirect] = useState(false);
  const items: IProduct[] = useSelector((state: AppState) => state.cartProducts.cartProducts);

  const onclickHomeRoute = () => {
    setIsHomeRedirect(true);
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeCartProduct(id));
  }

  const ifEmpty = () => {
    return (
      <div className="checkout-table-empty-cart text-center">
        <img src={emptyCartIcon} alt="empty cart"/>
        <p>Your Cart is empty</p>
        <label>Add items to your cart :)</label>
      </div>
    )
  };

  const subTotalPrice = items.reduce((total: number, b: IProduct) =>
    total + ((b.regular_price - b.discount_price) * b.quantity), 0);

  const listRows = () => {
    return items.map((item: IProduct, index: number) => {
      const itemRow: CheckoutTableItem = {
        key: index + 1,
        name: item.title,
        image: <DisplayImage image={item.image} className={'cart-product-image'}/>,
        qty: <EditableQty item={item}/>,
        unitPrice: <NumberFormat value={item.regular_price - item.discount_price} thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2} fixedDecimalScale={true} renderText={smallCentsWithPrefix}
        />,
        amount: <NumberFormat value={item.quantity ?
          item.quantity * (item.regular_price - item.discount_price) :
          (item.regular_price - item.discount_price)}
                              thousandSeparator={true}
                              displayType='text'
                              prefix={'Rs. '}
                              decimalScale={2} fixedDecimalScale={true} renderText={smallCentsWithPrefix}
        />,
        removeIcon: <Trash size='1.3em' className="remove-btn" onClick={() => handleRemoveItem(item.id)}/>
      };
      return itemRow;
    });
  };
  const getTable = () => {
    return <BootstrapTable bootstrap4
                           keyField='key'
                           classes={`custom-table item-table`}
                           data={listRows()}
                           columns={columns}
                           pagination={paginationFactory(options)}
                           wrapperClasses="table-responsive"
                           noDataIndication={ifEmpty}
    />
  };
  return (
    <Container className='checkout-area px-4'>
      <Row className='py-5'>
        <Col xs={12} className='checkout-page-title'>
          <Row className='pb-2'>
            <CheckoutTitle/>
            {isHomeRedirect && <Redirect to='/'/>}
            <Col className='text-end'><Button className='continue-shopping-btn'
                                              variant="outline-dark"
                                              onClick={onclickHomeRoute}><ChevronLeft size='1em'/>Continue Shopping
            </Button>
            </Col>
          </Row>
        </Col>
        <div className='checkout-table-area'>
          <Col xs={12} sm={12} className='py-3 checkout-table-title'>Shopping Cart</Col>
          <Col>
            <Card.Body className="pt-0">
              {getTable()}
            </Card.Body>
          </Col>
          <Discount/>
          <Delivery subTotalPrice={subTotalPrice}
                    discountPercentage={coupon?.discountPercentage}/>
          <TotalBill subTotalPrice={subTotalPrice}
                     discountPercentage={coupon?.discountPercentage}/>
        </div>
      </Row>
    </Container>
  );
}

export default CheckoutArea;