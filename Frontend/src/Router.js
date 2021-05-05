import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Logout from './components/account/Logout';
// import ForgetPassword from './components/account/ForgetPassword';
// import ResetPassword from './components/account/ResetPassword';

import Cart from './components/Cart';
import Checkout from './components/orderService/Checkout';

import OrderReview from './components/orderService/OrderReview';

import ProductDetailItem from './components/ProductDetailItem';
import AllProducts from './components/AllProducts';

import SellerInfo from './components/SellerInfo';
import SellerInventory from './components/SellerInventory';
import SellerProduct from './components/SellerProduct';
import SellerOrders from './components/SellerOrders';
import Search from './components/Search';
import ResetPassword from './components/ResetPassword';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      {/* <Route path="/forgetpassword" component={ForgetPassword} /> */}
      {/* <Route path="/resetpassword" component={ResetPassword} /> */}

      <Route path="/cart" component={Cart} />

      <Route path="/checkout" component={Checkout} />
      <Route path="/orderreview" component={OrderReview} />

      <Route path="/productdetail" component={ProductDetailItem} />
      <Route path="/allproducts" component={AllProducts} />
      <Route path="/search" component={Search} />

      <Route path="/sellerinfo" component={SellerInfo} />
      <Route path="/sellerinventory" component={SellerInventory} />
      <Route path="/addproduct" component={SellerProduct} />
      <Route path="/sellerorders" component={SellerOrders} />
      <Route path="/search" component={Search} />
      <Route path="/reset_password" component={ResetPassword} />
      <Route component = {NotFound} />
    </Switch>
    
  </BrowserRouter>
);

export default Router;
