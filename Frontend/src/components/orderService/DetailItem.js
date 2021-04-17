
// import axios from 'commons/axios';
// import { formatPrice } from 'commons/helper';
import React from 'react';

const DetailItem = () => {
    return (
      <div className="columns is-vcentered">
        
        <div className="column is-narrow">
          <img src = "/images/ez_buy_logo.jpg" alt= "" width="100" />
        </div>
        <div className="column is-narrow">EZ Buy</div>
        <div className="column">
        <span className="price"> 5 </span>
        </div>
        <div className="column">
          <span className="sum-price">  total : $ 234.00</span>
        </div>
      </div>
    );
  };
  
  export default DetailItem;


