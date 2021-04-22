import React from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';

const ProductList = (props) => {

  const productID = props.productDetail['productID']
  const name = props.productDetail['productName']
  const img = props.productDetail['productImage']
  const price= props.productDetail['productPrice']
  const quantity = props.productDetail['productQuantity']
  const user = global.auth.getUser();
  const shopID = user['shopID'];

  const deleteProduct = () => {
    axios.delete(`/shops/${shopID}/${productID}`).then((res) => {console.log(res)});
    window.location.reload();
  }

  const editProduct = () => {
    window.location.href=`/addProduct?productID=${productID}`
  }

  return (
    <div>
      <label>{name}</label>
      <img src={img}></img>
      <label>{price}</label>
      <label>{quantity}</label>
      <button onClick={editProduct}>Edit</button>
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
};

export default ProductList;