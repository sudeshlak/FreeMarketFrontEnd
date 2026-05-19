import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShoppingApp from "../../views/ShoppingApp";
import { Spinner } from "react-bootstrap";
const FAQ = React.lazy(() => import("../FAQ/FAQ"));
const AboutUs = React.lazy(() => import("../aboutUs/AboutUs"));
const ContactUs = React.lazy(() => import("../ContactUs/ContactUs"));
const AdminPanel = React.lazy(() => import("../adminPanel/AdminPanel"));
const DeliveryArea = React.lazy(() => import("../deliveryArea/DeliveryArea"));
const Checkout = React.lazy(() => import("../checkout/Checkout"));
const UserAccount = React.lazy(() => import("../UserAccount/UserAccount"));
const Register = React.lazy(() => import("../register/Register"));
const Login = React.lazy(() => import("../Login/Login"));

const Routing = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={ShoppingApp} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/about_us" component={AboutUs} />
          <Route path="/contact_us" component={ContactUs} />
          <Route path="/userAccount" component={UserAccount} />
          <Route path="/deliveryArea" component={DeliveryArea} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;
