import React, { Component } from 'react';

//Import components
import SellerOrdersList from './SellerOrdersList';
import Filter from './Filter';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import '../css/styles.css';
import SellerPageTemplate from './SellerPageTemplate';

class SellerOrders extends Component {

  constructor(props) {
    super(props);
    this.state = { products: null};
    this.shopID = global.auth.getUser()['shopID'];
  }

  componentDidMount() {
    axios.get(`/order/${this.shopID}/`).then((res) => {
      this.setState({ products: res.data['orders'], state: 0})
    });
  }

  updatePage = () => {
    this.forceUpdate();
  }

  render() {
    const { products } = this.state;
    if (products === null) {
      return (
        <SellerPageTemplate>
          <div></div>
        </SellerPageTemplate>
      );
    }
    
    return (
        <SellerPageTemplate>
            <div className="products">
              {
                products.map(p => <SellerOrdersList productDetail={p} updatePage={this.updatePage}/>)
              }
            </div>
        </SellerPageTemplate>
    );
  }
}

export default SellerOrders;