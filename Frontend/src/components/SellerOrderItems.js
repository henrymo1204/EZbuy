import React from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';

const SellerOrderItems = (props) => {

  const productID = props.productDetail['ProductID']
  const quantity = props.productDetail['Quantity']

  // const deleteProduct = () => {
  //   axios.delete(`/shops/${shopID}/${productID}`).then((res) => {console.log(res)});
  //   window.location.reload();
  // }

  // const editProduct = () => {
  //   window.location.href=`/addProduct?productID=${productID}`
  // }

  return (
    <div>
      <label>Product: {productID}</label>
      <label>Quantity: {quantity}</label>
    </div>
  );
};

export default SellerOrderItems;