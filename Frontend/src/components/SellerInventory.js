import React, { Component } from 'react';

//Import components
import ProductList from './ProductList';
import Filter from './Filter';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import SellerPageTemplate from './SellerPageTemplate';

class SellerInventory extends Component {

  constructor(props) {
    super(props);
    this.state = { products: null};
    this.shopID = global.auth.getUser()['shopID'];
  }

  componentDidMount() {
    axios.get(`/shops/${this.shopID}/`).then((res) => {
      this.setState({ products: res.data['products'], state: 0})
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
                products.map(p => <ProductList productDetail={p} updatePage={this.updatePage}/>)
              }
            </div>
            <a href='/addProduct'><button>Add</button></a>
        </SellerPageTemplate>
    );
  }
}

export default SellerInventory;