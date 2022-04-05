import React, {useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {IProduct} from "../../types/IProduct";
import NumberFormat from 'react-number-format';
import {useDispatch, useSelector} from "react-redux";
import {addCartProduct, changeCartProduct} from "../../state/actions/cartActions";
import {AppState} from "../../state/reducers";
import DisplayImage from "../displayImage/DisplayImage";
import {smallCentsWithPrefix} from "../../util/uiComponents";

type ProductProps = {
  products: IProduct
}

const Product: React.FC<ProductProps> = (props) => {
  const dispatch = useDispatch();
  const Items: IProduct[] = useSelector((state: AppState) => state.cartProducts.cartProducts);
  const {products} = props;
  const [quantity, setQuantity] = useState<number>(1);

  const isInCart = (id: string) => {
    const cartProductIds: string[] = Items.map(Item => Item.id);
    return cartProductIds.includes(id);
  }

  const handleOnProductAdd = (product: IProduct) => {
    dispatch(addCartProduct({
      id: product.id,
      title: product.title,
      category: {id: product.category.id, title: product.category.title},
      quantity: quantity,
      regular_price: product.regular_price,
      discount_price: product.discount_price,
      image: product.image
    }));
  }

  const handleOnProductUpdate = (product: IProduct) => {
    dispatch(changeCartProduct({
      id: product.id,
      title: product.title,
      category: {id: product.category.id, title: product.category.title},
      quantity: quantity,
      regular_price: product.regular_price,
      discount_price: product.discount_price,
      image: product.image
    }));
  }

  return (
    <Col className="product px-2 my-2" lg="3" md="4" xs="6">
      <Row className="product-item py-2">
        <Col className="img-col" xs="12">
          <DisplayImage image={products.image} className={'img'}/>
        </Col>
        <Col xs="12">
          <h6>{products.title}</h6>
        </Col>
        <Col className="regular-price py-3" xs="6">
          <NumberFormat thousandSeparator={true}
                        displayType={'text'}
                        prefix={'Rs. '}
                        value={products.regular_price}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        renderText={smallCentsWithPrefix}
          />
        </Col>
        <Col className="discount-price py-3" xs="6">
          <NumberFormat thousandSeparator={true}
                        displayType={'text'}
                        prefix={'Rs. '}
                        value={products.regular_price - products.discount_price}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        renderText={smallCentsWithPrefix}
          />
        </Col>
        <Col lg={4} md={4} xs={12}>
          <input type="number"
                 min={1}
                 className="product-count w-100"
                 value={quantity}
                 onChange={(event) => setQuantity(Number(event.target.value))}/>
        </Col>
        <Col lg={8} md={8} xs={12} className="product-btn">
          {isInCart(products.id) ?
            <Button className="product-update-btn" onClick={() => handleOnProductUpdate(products)}>
              Update
            </Button>
            :
            <Button onClick={() => handleOnProductAdd(products)} className="product-add-btn">
              Add To Cart
            </Button>
          }
        </Col>
      </Row>
    </Col>
  );
}

export default Product;