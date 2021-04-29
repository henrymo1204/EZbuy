import React, { useState, useEffect } from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';
import SellerOrderItems from './SellerOrderItems';

const SellerOrdersList = (props) => {

  const orderID = props.productDetail.OrderID;
  const createTime = props.productDetail.CreateTime;
  const totalPrice = props.productDetail.TotalPrice;
  const products = props.productDetail.Products;

  return (
    <div class='product-list-container'>
      <label class='attribute'>Order {orderID}</label>
        <div>
          {
            products.map(p => <SellerOrderItems productDetail={p}/>)
          }
        </div>
      <label class='attribute'>Create Time {createTime}</label>
      <label class='attribute'>Total Price {totalPrice}</label>
    </div>
  );
};

export default SellerOrdersList;