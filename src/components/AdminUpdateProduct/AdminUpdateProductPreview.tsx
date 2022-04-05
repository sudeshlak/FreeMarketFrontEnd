import React, {useEffect, useState} from 'react';
import {Button, Col, Image, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";
import DisplayImage from '../displayImage/DisplayImage';
import {IProduct} from "../../types/IProduct";
import insertImage from "../../assets/images/insertImage.webp"

type AdminUpdateProductPreviewProps = {
  productName: string
  price: number | null
  discount: number | null
  productNewImage: string | null
  updateToProduct: IProduct | null
}

const AdminUpdateProductPreview: React.FC<AdminUpdateProductPreviewProps> = (props) => {

  const [displayImage, setDisplayImage] = useState<string>(insertImage);
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

  useEffect(() => {
    if (!props.productNewImage && !props.updateToProduct?.image) {
      setDisplayImage(insertImage);
      return;
    }
    if (props.productNewImage) {
      setDisplayImage(String(props.productNewImage));
      return;
    }
    if (props.updateToProduct?.image) {
      setDisplayImage(props.updateToProduct.image);
      return;
    }
  }, [props.productNewImage, props.updateToProduct])


  return (
    <React.Fragment>
      <Col xs={12} className='update-product-preview-title'>Preview </Col>
      <Col className="product px-2 " lg="3" md="4" xs="6">
        <Row className="product-item py-2">
          <Col className="img-col" xs="12">
            {props.productNewImage ?  <Image className="img" src={displayImage} alt="Image"/>
              : <DisplayImage image={displayImage} className={'img'}/>
            }
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
};

export default AdminUpdateProductPreview;