import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const CreateProduct = React.lazy(() => import('../createProduct/CreateProduct'));
const AdminProductList = React.lazy(() => import('../adminProductList/AdminProductList'));
const Orders = React.lazy(() => import('../orders/OrdersList'));
const OrderItemList = React.lazy(() => import('../adminOrderItemTable/OrderItemList'));
const Coupons = React.lazy(() => import('../couponCodes/Coupons'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center py-4"><Spinner animation="border"/></div>}>
      <Switch>
        <Route exact path="/admin" component={CreateProduct}/>
        <Route path="/admin/adminProductList" component={AdminProductList}/>
        <Route exact path="/admin/orders" component={Orders}/>
        <Route path="/admin/orders/:id" component={OrderItemList}/>
        <Route path="/admin/coupons" component={Coupons}/>
      </Switch>
    </Suspense>
  );
}

export default AdminRoutes;