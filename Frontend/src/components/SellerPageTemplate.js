import React, {useEffect } from 'react';

//Import components
import MyNavbar from './Navbar';
import HomeButton from './HomeButton';
import AboutBar from './AboutBar';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import { withRouter } from 'react-router-dom';

import '../css/common/SellerPageTemplate.css';

import PageTemplate from './PageTemplate.js'

const SellerPageTemplate = props => {

  // const logout = () => {
  //   global.auth.logout();
  // };
  
  return (
    <PageTemplate>
      <div class="sidenav">
        <a href="/sellerinfo">Account</a>
        <a href="/sellerinventory">Inventory</a>
        <a href="#">Orders</a>
        <a href='#'>Log Out</a>
      </div>
      <div class="main">
        {props.children}
      </div>
    </PageTemplate>
  );
}

export default withRouter(SellerPageTemplate);