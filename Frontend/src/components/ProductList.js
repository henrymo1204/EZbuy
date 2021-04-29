import React from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';
import '../css/common/PageTemplate.scss';
import '../css/common/SellerPageTemplate.scss';

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
    <div className ="product-list-container">
      <img class='attribute' src={img}></img>
      <label class='attribute' >Product Name {name}</label>
      <label class='attribute' >Price {price}</label>
      <label class='attribute' >Quantity {quantity}</label>
      <button class='attribute' onClick={editProduct}>Edit</button>
      <button class='attribute' onClick={deleteProduct}>Delete</button>
    </div>
  );
};

export default ProductList;