import React, { Component } from 'react';

//Import components
import Products from './Products';
import Filter from './Filter';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import SellerPageTemplate from './SellerPageTemplate';

class SellerInfo extends Component {

  getShop = () => {
    const user = global.auth.getUser();
    const shopID = user['shopID'];
    axios.get(`/shops/${shopID}`)
    .then((res) => {
      console.log(res);
      var shopName = document.getElementById('ShopName');
      shopName.value = res['data']['shop']
    })
  }

  editShop = () => {
    const user = global.auth.getUser();
    const shopID = user['shopID'];
    axios.get(`/shops/${shopID}`)
    .then((res) => {
      console.log(res);
      var shopName = document.getElementById('ShopName');
      shopName.value = res['data']['shop']
    })
  }

  render() {
    this.getShop();
    return (
        <SellerPageTemplate>
            <label>Shop Name</label>
            <input id='ShopName'></input>
            <label>About Us</label>
            <input></input>
            <button>Save</button>
        </SellerPageTemplate>
    );
  }
}

export default SellerInfo;