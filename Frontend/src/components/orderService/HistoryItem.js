
// import axios from 'commons/axios';
// import { formatPrice } from 'commons/helper';
import React from 'react';

const HistoryItem = () => {
    return (
      <div className="columns is-vcentered">
        <div className="column is-narrow"> Order</div>
        <div className="column is-narrow"> ( 1 )</div>
        <div className="column cart-name is-narrow"> 4/9/2021</div>
        <div className="column cart-name is-narrow">$ 2345.00</div>
        <button className="common-button column cart-name is-narrow"> View Detail </button>
        
      </div>
    );
  };
  
  export default HistoryItem;


