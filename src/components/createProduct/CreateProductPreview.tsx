import React from 'react';
import {Col, Row, Image, Button} from "react-bootstrap";
import NumberFormat from "react-number-format";

type CreateProductPreviewProps = {
  productName: string
  price: number | null
  discount: number | null
  productImage: null | string
}

const CreateProductPreview: React.FC<CreateProductPreviewProps> = (props) => {
  const image: any = require(`../../assets/images/insertImage.webp`);
  const {productName, price, discount} = props;

  const priceMain = (price: number): number | string => {
    if (!price) {
      return "";
    }
    return Math.trunc(price);
  }

  const priceCents = (price: number) => {
    if (price % 1 === 0) {
      return '00';
    } else {
      return Math.trunc(price % 1 * 100);
    }
  }
  const renderImage = () => {
    if (!props.productImage) {
      return image.default;
    }
    return props.productImage;
  }

  return (
    <React.Fragment>
      <Col xs={12} className='product-preview-title'>Preview</Col>
      <Col className="product px-2 " lg="3" md="4" xs="6">
        <Row className="product-item py-2">
          <Col className="img-col" xs="12">
            <Image className="img" src={renderImage()} alt="Image"/>
          </Col>
          <Col xs="12" className='product-name'>
            <h6>{productName ? productName : ''}</h6>
          </Col>
          <Col className="regular-price py-3" xs="6">
            <NumberFormat displayType={'text'}
                          prefix={'Rs. '}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          value={price ? price : ''}/>
          </Col>
          <Col className="discount-price py-3" xs="6">
            <NumberFormat displayType={'text'}
                          prefix={'Rs. '}
                          thousandSeparator={true}
                          value={(discount && price) ? priceMain(price - discount) : ''}
            />
            {(discount && price) ? <span className="decimal-value">.{priceCents(price - discount)}</span> : ''}
          </Col>
          <Col xs={4}>
            <input type="number" disabled={true} min={0} className="product-count w-100" defaultValue={1}/>
          </Col>
          <Col xs={8} className="product-btn">
            <Button disabled={true} className="product-add-btn">
              Add To Cart
            </Button>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
}

export default CreateProductPreview;