import React from "react";
import { Route, Switch} from "react-router-dom";
import CreateProduct from "../createProduct/CreateProduct";
import AdminProductList from "../adminProductList/AdminProductList";
import Orders from "../orders/OrdersList";
import OrderItemList from "../adminOrderItemTable/OrderItemList";
import Coupons from "../couponCodes/Coupons";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={CreateProduct}/>
      <Route path="/admin/adminProductList" component={AdminProductList}/>
      <Route exact path="/admin/orders" component={Orders}/>
      <Route path="/admin/orders/:id" component={OrderItemList}/>
      <Route path="/admin/coupons" component={Coupons}/>
    </Switch>
  );
}

export default AdminRoutes;