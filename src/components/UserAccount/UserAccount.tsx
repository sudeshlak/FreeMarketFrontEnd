import React from "react";
import {Container, Row} from "react-bootstrap";
import MainTopNavBar from "../MainTopNavBar";
import MainMiddleNavBar from "../MainMiddleNavBar";
import UserAccountRoutes from "../routes/UserAccountRoutes";
import Footer from "../Footer";

const UserAccount: React.FC = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <Container fluid={true}>
        <Row className='user-account'>
          <UserAccountRoutes/>
        </Row>
      </Container>
      <Footer/>
    </React.Fragment>
  )
}

export default UserAccount;