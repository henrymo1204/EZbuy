import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './components/account/Login';
import Register from './components/account/Register';
import Logout from './components/account/Logout';
import Cart from './components/cart/Cart';
import PaymentInfo from './components/orderService/PaymentInfo';
import OrderFin from './components/orderService/OrderFin';
import OrderHis from './components/orderService/OrderHis';
import BuyerFinOrder from './components/orderService/BuyerFinOrder';
import OrderDet from './components/orderService/OrderDet';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      <Route path="/cart" component={Cart} />
      <Route path="/paymentInfo" component={PaymentInfo} />
      <Route path="/order/finish" component={OrderFin} />
      <Route path="/order/history" component={OrderHis} />
      <Route path="/order/buyerfinish" component={BuyerFinOrder} />
      <Route path="/order/orderdetail" component={OrderDet} />
    </Switch>
    
  </BrowserRouter>
);

export default Router;
