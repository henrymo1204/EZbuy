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
import { Form } from 'react-bootstrap';

import '../css/product/Allproducts.scss'

class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = { products: null, options: null, selected: [], shopName: null, aboutUs: null };
  }

  componentDidMount() {
    var shopID = window.location.search.slice(8);
    if (shopID) {
      axios.get(`/shops/${shopID}/`).then((res) => {
        this.setState({ products: res.data['products'], options: res.data['options'], shopName: res.data['shop'][0][0], aboutUs: res.data['shop'][0][1], state: 0})
      });
    }
    else {
      axios.get('/products/').then((res) => {
        this.setState({ products: res.data['products'], options: res.data['options'], state: 0})
      });
    }
  }

  updatePage = () => {
    this.forceUpdate();
  }


  selected = (name) => {
    var { selected } = this.state;
    if (selected.includes(name)) {
      for (var i = 0; i < selected.length; i++) {
        if (selected[i] === name) {
          selected.splice(i, 1);
        }
      }
    }
    else {
      selected.push(name);
    }
    if (selected.length === 0) {
      axios.get('/products/').then((res) => {
        this.setState({ products: res.data['products'], options: res.data['options'], state: 0})
      });
    }
    else {
      axios.get('/products/', {params: {options: selected}}).then((res) => {
        this.setState({ products: res.data['products'], state: 0})
      });
    }
  }


  render() {
    const { products, options, shopName, aboutUs } = this.state;
    const shopID = window.location.search.slice(8);
    if (shopID) {
      if (products === null && options === null & shopName === null & aboutUs === null) {
        return <div></div>
      }

      return (
        <PageTemplate>
          <Row className="allproducts-container">
            <Col className='filter-container'>
              <div className='filter'>
                <label>{shopName}</label>
              </div>
              <div className='filter'>
                <label>{aboutUs}</label>
              </div>
            </Col>
          </Row>
          <Row className="allproducts-container">
            <Col md="auto allproducts-control filter-container">
              <div className='filter'>
                {
                  options.map(option => 
                    <label>
                      <input type="checkbox" value={option.name} onChange={e => this.selected(option.name)}/>
                        {option.name}
                    </label>)
                }
              </div>
            </Col>
            <Col className="allproducts-control">
              <div className="products allproducts-control">
                {
                  products.map(p => <Products productDetail={p} updatePage={this.updatePage}/>)
                }
              </div>
            </Col>
          </Row>
        </PageTemplate>
      );
    }

    if (products === null && options === null) {
      return <div></div>
    }

    return (
      <PageTemplate>
        <Row className="allproducts-container">
          {/* <Col className='filter-container'> */}
          <Col md='auto' className="allproducts-control filter-container">
            <div className='filter'>
              {
                options.map(option =>
                  <div> 
                  <label>
                    <input type="checkbox" value={option.name} onChange={e => this.selected(option.name)}/>
                      {option.name}
                  </label></div> )
              }
            </div>
          </Col>
          {/* <Col className='products-container'> */}
          <Col className="allproducts-control">
            <div className="products allproducts-control">
              {
                products.map(p => <Products productDetail={p} updatePage={this.updatePage}/>)
              }
            </div>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default AllProducts;