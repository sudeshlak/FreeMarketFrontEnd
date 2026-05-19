import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const UserOrder = React.lazy(() => import('../UserOrder/UserOrder'));
const UserOrders = React.lazy(() => import('../userOrders/UserOrders'));

const UserAccountRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center py-4"><Spinner animation="border"/></div>}>
      <Switch>
        <Route exact path="/userAccount" component={UserOrders}/>
        <Route path="/userAccount/:id" component={UserOrder}/>
      </Switch>
    </Suspense>
  );
}

export default UserAccountRoutes;