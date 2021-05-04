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

import { toast } from 'react-toastify';

class SellerInfo extends Component {

  getShop = () => {
    const user = global.auth.getUser();
    const shopID = user['shopID'];
    axios.get(`/api/v1/shops/${shopID}`)
    .then((res) => {
      var shopName = document.getElementById('ShopName');
      shopName.value = res['data']['shop'][0][0]
      var shopName = document.getElementById('AboutUs');
      shopName.value = res['data']['shop'][0][1]
    })
  }

  editShop = () => {
    const user = global.auth.getUser();
    const shopID = user['shopID'];
    var shopName = document.getElementById('ShopName').value
    var aboutUs = document.getElementById('AboutUs').value
    axios.patch(`/api/v1/shops/${shopID}`, {
      'shopName': shopName,
      'aboutUs': aboutUs
    })
    .then((res) => {
      console.log(res);
      toast.success('Saved successfully.');
    })
  }

  render() {
    this.getShop();
    return (
        <SellerPageTemplate>
            <label>Shop Name</label>
            <input id='ShopName'></input>
            <label>About Us</label>
            <input id='AboutUs'></input>
            <button onClick={this.editShop}>Save</button>
        </SellerPageTemplate>
    );
  }
}

export default SellerInfo;