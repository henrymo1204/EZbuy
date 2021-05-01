
import React from 'react';

const OrderDetailItem = (props) => {

    const productName  = props.orderDetail['productName']
    const productPrice = props.orderDetail['productPrice']
    const quantity     = props.orderDetail['quantity']
    const totalPrice   = quantity * productPrice
    const productImage = props.orderDetail['productImage']
    return (
      <div className="columns is-vcentered">
        <div className="column is-narrow">
          <img src={productImage} alt= "" width="100" />
        </div>
        <div className="column is-narrow">{productName}</div>
        <div className="column is-narrow">{quantity}</div>
        <div className="column is-narrow">{productPrice}</div>
        <div className="column is-narrow">{totalPrice}</div>
      </div>
    );
  };
  
  export default OrderDetailItem;


