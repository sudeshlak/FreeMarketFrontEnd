import React, {FormEvent, useState} from "react";
import {Container, Form, FormGroup} from "react-bootstrap";
import MainTopNavBar from "../MainTopNavBar";
import MainMiddleNavBar from "../MainMiddleNavBar";
import ShoppingAreaNavBar from "../shoppingAreaNavBar/ShoppingAreaNavBar";
import Footer from "../Footer";
import {useHistory} from "react-router-dom";
import {Eye, EyeOff} from "react-feather";
import {Link} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import {LOGIN, TOKEN} from "../../graphQl/users/userMutation";
import {changeLoginState} from "../../state/actions/loginActions";
import {toast} from "../sweetalert/sweetalert";
import {useDispatch} from "react-redux";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";

const eye = <Eye/>;
const eyeCrossed = <EyeOff/>

const Login: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login] = useMutation(LOGIN);
  const [token] = useMutation(TOKEN);
  const dispatch = useDispatch();
  const override = css`margin-left: 16px;`;
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnEmailChanged = (username: string) => {
    setEmail(username);
  }

  const handleOnPasswordChanged = (password: string) => {
    setPassword(password);
  }

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (!email) {
      setErrorMessage("Enter the correct email address");
      setLoading(false);
      return;
    }
    if (!password) {
      setErrorMessage("Enter the correct password");
      setLoading(false);
      return;
    }
    login({
      variables: {
        email: email,
        password: password
      }
    }).then(({data}) => {
      dispatch(changeLoginState({login: true, type: data.login.type}));
      token({
        variables: {
          email: data.login.email
        }
      }).then(({data}) => {
        localStorage.setItem('token', data.token);
        history.push('/');
        toast('Logged in successfully!', '', 'success');
        setErrorMessage("");
        setLoading(false);
      });
    }).catch((error) => {
      setErrorMessage("Invalid email or password");
      setLoading(false);
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <React.Fragment>
      <Container fluid={true}>
        <MainTopNavBar/>
      </Container>

      <MainMiddleNavBar/>
      <ShoppingAreaNavBar/>

      <div className="login-form h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="cart-icon d-flex justify-content-center">
              <span><i className="fas fa-shopping-cart fa-7x"/> </span>
            </div>
            <div className="d-flex justify-content-center form_container">

              <Form className="form-inputs" onSubmit={handleOnSubmit}>
                <FormGroup>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-user"/></span>
                    </div>
                    <Form.Control type="text"
                                  className="form-control input_user"
                                  placeholder="email"
                                  disabled={loading}
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnEmailChanged(event.target.value)}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key"/></span>
                    </div>
                    <Form.Control type={showPassword ? "text" : "password"}
                                  className="input_pass"
                                  disabled={loading}
                                  placeholder="password"
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnPasswordChanged(event.target.value)}
                    />
                  </div>
                  <i className="input-group-append float password-eye" onClick={togglePasswordVisibility}>
                    {showPassword ? eyeCrossed : eye}</i>
                </FormGroup>

                <div>
                  <div className="invalid-user">
                    {
                      errorMessage && errorMessage
                    }
                  </div>
                </div>

                {/*<div className="form-group">*/}
                {/*  <div className="custom-control custom-checkbox">*/}
                {/*    <input type="checkbox" className="custom-control-input" id="customControlInline"/>*/}
                {/*    <label className="custom-control-label">Remember Me</label>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button type="submit" name="button" className="btn login_btn">Login
                    <ClipLoader color={'#ffffff'} loading={loading} css={override} size={12}/>
                  </button>
                </div>
              </Form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Don't have an account? <Link to="/register" className="ml-2">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center links">
                {/*<Link to="/forgotpassword">Forgot Password</Link>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default Login;