import React, {ComponentClass} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {withGoogleMap, withScriptjs} from "react-google-maps";
import Map from './Map';
import {WithGoogleMapProps} from "react-google-maps/lib/withGoogleMap";
import {WithScriptjsProps} from "react-google-maps/lib/withScriptjs";
import MainTopNavBar from "../MainTopNavBar";
import MainMiddleNavBar from "../MainMiddleNavBar";
import ShoppingAreaNavBar from "../shoppingAreaNavBar/ShoppingAreaNavBar";
import Footer from "../Footer";

const DeliveryArea = () => {
  const WrapperMap: ComponentClass<WithGoogleMapProps & WithScriptjsProps> = withScriptjs(withGoogleMap(Map));
  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>
      <Container fluid={true}>
        <Row>
          <Col className='ml-3 mt-3'>
            <h5 className='p-0'>Delivery Areas</h5>
          </Col>
        </Row>
        <Row className='delivery-area-map'>
          <Col style={{width: "100%"}}>
            <WrapperMap
              googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" +
                "&key=AIzaSyDS975nAXFt8Jwt28dWA2biSpCCDkGvGSM"}
              loadingElement={<div style={{height: `100%`}}/>}
              containerElement={<div style={{height: `50vh`}}/>}
              mapElement={<div style={{height: `100%`}}/>}
            />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </React.Fragment>
  );
};

export default DeliveryArea;