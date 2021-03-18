import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './components/account/Login';
import Register from './components/account/Register';
import Logout from './components/account/Logout';
import Cart from './components/Cart';
import AllProducts from './components/AllProducts';
import XRViewer from './components/XRViewer';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      <Route path="/cart" component={Cart} />
      <Route path="/allproducts" component={AllProducts} />
      <Route path="/3dviewer" component={XRViewer} />
    </Switch>
  </BrowserRouter>
);

export default Router;
