import React, {useState} from 'react';
import {Col, Row, Container} from "react-bootstrap";
import SideBar from "../sideBar/SideBar";
import {FaBars} from "react-icons/all";
import AdminRoutes from '../routes/AdminRoutes';
import MainTopNavBar from "../MainTopNavBar";
import MainMiddleNavBar from "../MainMiddleNavBar";
import Footer from "../Footer";

const AdminPanel: React.FC = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const handleToggleSidebar = (value: boolean) => {
    setToggled(value);
  };

  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>
      <MainMiddleNavBar/>
      <Container fluid>
        <Row>
          <Col className='admin-panel' xs={12}>
            <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar}/>
            <main className='py-3 px-3 main-area'>
              <Col xs={12} className='sidebar-toggle-btn-col'>
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                  <FaBars/>
                </div>
                <AdminRoutes/>
              </Col>
            </main>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}

export default AdminPanel;