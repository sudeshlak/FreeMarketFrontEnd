import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import CreateProductForm from "./CreatProductForm";
import CreateProductPreview from "./CreateProductPreview";

const CreateProduct: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [productImage,setProductImage]=useState<null|string>(null);

  return (
    <React.Fragment>
      <Col xs={12} className='create-product-title px-0'>Create Product</Col>
      <Col xs={12} className='create-product'>
        <Row>
          <Col md={6} lg={4} className='create-product-preview pt-2'>
            <CreateProductPreview
              productName={productName}
              price={price}
              discount={discount}
              productImage={productImage}
            />
          </Col>
          <Col md={6} lg={8} className='py-3'>
            <CreateProductForm
              productName={productName}
              price={price}
              discount={discount}
              setProductName={setProductName}
              setPrice={setPrice}
              setDiscount={setDiscount}
              productImage={productImage}
              setProductImage={setProductImage}
            />
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
}

export default CreateProduct;