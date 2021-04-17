
/*****************************************************************************************
                           This is the Cart Page
 ****************************************************************************************/


import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import{Button, Row, Col, Nav} from 'react-bootstrap';

import CartItem from '../components/CartItem';
import Layout from '../components/Layout'

import '../css/cart/Cart.scss';
import '../css/common/BodyWrapper.scss'

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

class Cart extends Component{
  render(){
    return (
      <Layout>
        <div className = "cart-page">
          <span classNmae = "cart-title"> Shopping Cart </span>
          <div className ="cart-list" >
            <CartItem/>
            <CartItem/>
            <CartItem/> 
          </div>
         <div clasName ="cart-total">
           Total:
            <span className= "total-price is-vcentered" > $ 1234.00</span>
          </div>
          <Row>
            <Col>
              <Nav.Link href="allproducts" >
                <button className="common-button"> Continue Shopping </button>
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="paymentInfo" >
                <button className="common-button"> Place Order </button>
              </Nav.Link>
            </Col>
          </Row>
         </div>
      </Layout>
    )
  }
}

export default withRouter(Cart);