import React from "react";
import Checkout from "../checkout/Checkout";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Register from "../register/Register";
import Login from "../Login/Login";
import AdminPanel from "../adminPanel/AdminPanel"
import ShoppingApp from "../../views/ShoppingApp";
import UserAccount from "../UserAccount/UserAccount";
import FAQ from "../FAQ/FAQ";
import AboutUs from "../aboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
import DeliveryArea from "../deliveryArea/DeliveryArea";

const Routing = () => {
  return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ShoppingApp}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/admin" component={AdminPanel}/>
            <Route path="/FAQ" component={FAQ} />
            <Route path="/about_us" component={AboutUs} />
            <Route path="/contact_us" component={ContactUs} />
            <Route path="/userAccount" component={UserAccount}/>
            <Route path="/deliveryArea" component={DeliveryArea}/>
          </Switch>
        </BrowserRouter>
  );
}

export default Routing;