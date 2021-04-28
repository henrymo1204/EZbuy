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

import '../css/product/Search.scss';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { products: null};
  }

  componentDidMount() {
    var keyword = window.location.search.slice(9)
    if (keyword) {
        axios.get(`/products/search/${keyword}`)
        .then((res) => {
        this.setState({ products: res.data['product'], state: 0})
        console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }

  updatePage = () => {
    this.forceUpdate();
  }

  render() {
    const { products } = this.state;

    if (products === null) {
        return (
          <PageTemplate>
            <Row className="search-result-container">
              <Col md='auto' className="search-result-control catagory-container">
                <div className="radio-buttons">
                  <Filter />
                </div>
              </Col>
              <Col className="search-result-control">
                <div className="products no-search-result-control">
                  No search result found in inventory
                </div>
              </Col>
            </Row>
          </PageTemplate>
        );
    }
    else {
        return (
        <PageTemplate>
          <Row className="search-result-container">
            <Col md='auto' className="search-result-control catagory-container">
              <div className="radio-buttons">
                <Filter />
              </div>
            </Col>
            <Col className="search-result-control">
              <div className="products grid search-result-control">
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
}

export default Search;