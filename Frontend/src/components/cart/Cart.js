import React from 'react';
import '../../css/cart/Cart.scss';
import { Component } from 'react';
import { MyNavbar } from '../Navbar';



export default function Cart(props) {
    
  
    return (
        
      <div className="cart-container ">
        <div>
          <img ClassName = "logo" src="/images/ez_buy_logo.jpg" alt="" />
          {/* <MyNavbar/> */}
        </div>
        <div className="cart-wrapper">
            <div className = "title">Cart page</div>
        </div>
      </div>
    );
    
  }

  
  