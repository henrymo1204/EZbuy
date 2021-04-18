
/*****************************************************************************************
                           This is the Cart Page
 ****************************************************************************************/


import React, {useState, useEffect, useMemo} from 'react';
import { withRouter } from 'react-router-dom';
import{Row, Col, Nav} from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import CartItem from '../components/CartItem';
import PageTemplate from './PageTemplate'
import axios from './commons/axios';
import {formatPrice} from './commons/utils'

import '../css/cart/Cart.scss';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const user = global.auth.getUser() || {};
    const userID = 1;
    axios.get(`/cart/items?userID=${userID}`).then(res => setCartItems(res.data['items']));
  }, []);

  const totalPrice = useMemo(() => {
    const totalPrice = cartItems
      .map(item => item.productQuantity * parseInt(item.productPrice))
      .reduce((sum, val) => sum + val, 0);
    return formatPrice(totalPrice);
  }, [cartItems]);

  const updateCartItem = itemToUpdate => {
    const existingCartItems = [...cartItems];
    const idxToUpdate = existingCartItems.findIndex(item => item.cartItemID === itemToUpdate.cartItemID);
    existingCartItems.splice(idxToUpdate, 1, itemToUpdate);
    setCartItems(existingCartItems);
  };

  const deleteCartItem = itemToDelete => {
    const cartItemsAfterRemove = cartItems.filter(item => item.cartItemID !== itemToDelete.cartItemID);
    setCartItems(cartItemsAfterRemove);
  };

  return (
    <PageTemplate>
        <div className="cart-page">
          <div className="cart-title">Shopping Cart</div>
          {cartItems.length === 0 ? <p className="empty-cart">Empty Cart</p> : ''}
          <div className="cart-list" >
            <TransitionGroup component={null}>
              {cartItems.map(item => (
                <CSSTransition classNames="cart-item" timeout={300} key={item.cartItemID}>
                  <CartItem
                    key={item.cartItemID}
                    cartItem={item}
                    updateCartItem={updateCartItem}
                    deleteCartItem={deleteCartItem}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <div className="cart-total">
            Total:
              <span className="total-price is-vcentered" >{totalPrice}</span>
          </div>
          <Row>
            <Col>
              <Nav.Link href="allproducts" className="cart-button">
                <button className="common-button">Continue Shopping</button>
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="paymentInfo"  className="cart-button">
                <button className="common-button">Place Order</button>
              </Nav.Link>
            </Col>
          </Row>
         </div>
      </PageTemplate>
  );
};

export default withRouter(Cart);
