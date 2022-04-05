import React from "react";
import {Col, Row} from "react-bootstrap";
import Category from "./Category";

const Categories: React.FC = () => {
  return (
        <Row>
          <Col>
            <Row>
              <h1 className="our-product-txt text-center mt-3">Our Products</h1>
            </Row>
            <Row>
              <Category/>
            </Row>
          </Col>
        </Row>
  );
}

export default Categories;