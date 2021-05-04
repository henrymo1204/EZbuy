import React, {useEffect } from 'react';
import {Row, Col} from 'react-bootstrap'

//Import components
import MyNavbar from './Navbar';
import HomeButton from './HomeButton';
import AboutBar from './AboutBar';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import { withRouter } from 'react-router-dom';
import '../css/common/PageTemplate.scss';
import '../css/common/SellerPageTemplate.scss';

import PageTemplate from './PageTemplate.js'

const SellerPageTemplate = props => {
  
  return (
    <PageTemplate>
      <div className="page-template-container">
        <Row className="page-template-row">
          <Col className="seller-navbar">
            <div className="sidenav-left">
              <a href="/sellerinfo">Account</a>
              <a href="/sellerinventory">Inventory</a>
              <a href="/sellerorders">Orders</a>
              <a href="/logout">Log Out</a>
            </div>
          </Col>
            <div className="main-right">
            {props.children}
            </div>
          <Col>
          </Col> 
        </Row>
      </div>
      
    </PageTemplate>
  );
}

export default withRouter(SellerPageTemplate);