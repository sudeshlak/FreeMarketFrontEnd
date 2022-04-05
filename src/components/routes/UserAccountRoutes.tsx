import React from "react";
import { Route, Switch} from "react-router-dom";
import UserOrder from "../UserOrder/UserOrder";
import UserOrders from "../userOrders/UserOrders";

const UserAccountRoutes = () => {
  return (
    <Switch>
      <Route exact path="/userAccount" component={UserOrders}/>
      <Route path="/userAccount/:id" component={UserOrder}/>
    </Switch>
  );
}

export default UserAccountRoutes;