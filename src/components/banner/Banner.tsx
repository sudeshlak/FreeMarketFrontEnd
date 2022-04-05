import React from "react";
import Carousel from "react-bootstrap/Carousel";
import WelcomeImage from "../../assets/images/banner-home.webp";
import {Button, Row} from "react-bootstrap";

const Banner: React.FC = () => {
  return (
    <Row>
      <Carousel prevLabel={null}
                nextLabel={null}
                interval={null}
                className="px-0 pt-3 pb-4 w-100"
                indicators={false}>
        <Carousel.Item>
          <div className="w-100 banner-image">
            <img
              className="w-100"
              src={WelcomeImage}
              alt="Second slide"
            />
            <Button className="btn">Shop Now</Button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={WelcomeImage}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={WelcomeImage}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Row>
  );
}

export default Banner;