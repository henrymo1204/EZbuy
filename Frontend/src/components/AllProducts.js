// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, { Component } from 'react';

//Import components
import Products from './Products';
import Filter from './Filter';
//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import '../css/product/Allproducts.scss';

class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = { products: null};
  }

  componentDidMount() {
    axios.get('/products/').then((res) => {
      this.setState({ products: res.data['products'], state: 0})
    });
  }

  updatePage = () => {
    this.forceUpdate();
  }

  render() {
    const { products } = this.state;
    if (products === null) {
      return <div></div>
    }

    return (
      <PageTemplate>
        <Row className="allproducts-container">
          <Col md='auto' className="allproducts-control catagory-container">
            <div className="radio-buttons">
              <Filter />
            </div>
          </Col>
          <Col className="allproducts-control">
            <div className="products grid allproducts-control">
              {
                products.map((p, index) => <Products key={index} productDetail={p} updatePage={this.updatePage}/>)
              }
            </div>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default AllProducts;