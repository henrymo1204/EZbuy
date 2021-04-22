import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Logout from './components/account/Logout';

import Cart from './components/Cart';
import PaymentInfo from './components/orderService/PaymentInfo';
import BuyerFinOrder from './components/orderService/BuyerFinOrder';
import OrderHis from './components/orderService/OrderHis';
import OrderDetail from './components/orderService/OrderDetail';

import AllProducts from './components/AllProducts';
import XRViewer from './components/XRViewer';

import SellerInfo from './components/SellerInfo';
import SellerInventory from './components/SellerInventory';
import SellerProduct from './components/SellerProduct';
import SellerOrders from './components/SellerOrders';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />

      <Route path="/cart" component={Cart} />
      <Route path="/paymentInfo" component={PaymentInfo} />
      <Route path="/buyerfinishorder" component={BuyerFinOrder} />
      <Route path="/orderhistory" component={OrderHis} />
      <Route path="/orderdetail" component={OrderDetail} />

      <Route path="/allproducts" component={AllProducts} />
      <Route path="/3dviewer" component={XRViewer} />
      <Route path="/sellerinfo" component={SellerInfo} />
      <Route path="/sellerinventory" component={SellerInventory} />
      <Route path="/addproduct" component={SellerProduct} />
      <Route path="/sellerorders" component={SellerOrders} />
      <Route component = {NotFound} />
    </Switch>
    
  </BrowserRouter>
);

export default Router;
