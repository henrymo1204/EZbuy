import React from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';
import SellerOrderItems from './SellerOrderItems';

const SellerOrdersList = (props) => {

  const orderID = Object.keys(props.productDetail)[0]
  const products = props.productDetail[orderID];

  // const deleteProduct = () => {
  //   axios.delete(`/shops/${shopID}/${productID}`).then((res) => {console.log(res)});
  //   window.location.reload();
  // }

  // const editProduct = () => {
  //   window.location.href=`/addProduct?productID=${productID}`
  // }

  return (
    <div>
      <label>Order {orderID}</label>
      {
        products.map(p => <SellerOrderItems productDetail={p}/>)
      }
    </div>
  );
};

export default SellerOrdersList;