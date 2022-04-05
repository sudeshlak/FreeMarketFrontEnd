import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {ILogin} from "../../types/ILogin";
import {useSelector} from "react-redux";
import {AppState} from "../../state/reducers";
import {useHistory} from "react-router-dom";

const SigningArea: React.FC = () => {
  const loginState: ILogin = useSelector((state: AppState) => state.login);
  const history = useHistory();
  const handleOnClickSignIn = () =>{
    history.push('/login');
  }
  return (
    <React.Fragment>
      {!(loginState.login) &&
      <Row className='sign-area'>
          <Col xs={6} sm={6} md={7} className='signing-label'>
              <label>Already have an account?</label>
          </Col>
          <Col xs={6} sm={6} md={5} className='signing-btn'>
              <Button onClick={()=>handleOnClickSignIn()} variant="success">Sign in</Button>
          </Col>
      </Row>
      }
    </React.Fragment>
  );
}

export default SigningArea;