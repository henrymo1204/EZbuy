import React, { useState } from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';

const SellerOrderItems = (props) => {

  const productID = props.productDetail['ProductID'];
  const quantity = props.productDetail['Quantity'];
  const [productName, setProductName] = useState();
  const [img, setImg] = useState();


  axios.get(`/products/${productID}`)
  .then((res) => {
    console.log(res);
    setProductName(res['data']['product'][0]['productName']);
    setImg(res['data']['product'][0]['productImage']);
  })
  .catch((error) => {
    console.log(error)
  });

  return (
    <div>
      <label>Product: {productName}</label>
      <img src={img}></img>
      <label>Quantity: {quantity}</label>
    </div>
  );
};

export default SellerOrderItems;