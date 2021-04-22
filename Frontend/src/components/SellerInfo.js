import React, { Component } from 'react';

//Import components
import Products from './Products';
import Filter from './Filter';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import '../css/styles.css';
import SellerPageTemplate from './SellerPageTemplate';

class SellerInfo extends Component {

  render() {
    return (
        <SellerPageTemplate>
            <label>Test</label>
        </SellerPageTemplate>
    );
  }
}

export default SellerInfo;