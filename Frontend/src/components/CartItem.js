
// import axios from 'commons/axios';
// import { formatPrice } from 'commons/helper';
import React from 'react';

const CartItem = () => {
    return (
      <div className="columns is-vcentered">
        <div className="column is-narrow">
          <span className="close">X</span>
        </div>
        <div className="column is-narrow">
          <img src = "/images/ez_buy_logo.jpg" alt= "" width="100" />
        </div>
        <div className="column cart-name is-narrow">EZ Buy' selled product </div>
        <div className="column">
          <span className="price">$ 234.00 </span>
        </div>
        <div className="column">
          <input type="number" className="input num-input"/>
        </div>
        <div className="column">
          <span className="sum-price">$ 234.00</span>
        </div>
      </div>
    );
  };
  
  export default CartItem;


