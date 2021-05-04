import React, {useMemo, useState} from 'react';
import '../css/cart/Cart.scss';
import {formatPrice} from './commons/utils'
import axios from './commons/axios';
import { toast } from 'react-toastify';

const CartItem = (props) => {

  const [quantity, setQuantity] = useState(props.cartItem.productQuantity);
  const { cartItemID, cartID, productID, productQuantity, productName, productDescription,
          productPrice, productImage, product3DImage, isAuctionProduct
        } = props.cartItem || {};

  const sumPrice = useMemo(() => {
    return formatPrice(productQuantity * parseInt(productPrice));
  }, [productQuantity, productPrice]);

  const handleUpdate = e => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    const newCartItem = {
      ...props.cartItem,
      productQuantity: newQuantity
    };
    axios.patch(`/api/v1/cart/${cartItemID}`, {quantity: newQuantity}).then(res => {
      if (res.data['success'] == true) {
        toast.success('cart update success.');
      } else {
        toast.error('cart update failed.');
      }
      props.updateCartItem(newCartItem);
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/v1/cart/${cartItemID}`).then(res => {
      if (res.data['success'] == true) {
        toast.success('cart update success.');
      } else {
        toast.error('cart update failed.');
      }
      props.deleteCartItem(props.cartItem);
    });
  };

    return (
      <div className="columns is-vcentered">
        <div className="column is-narrow" onClick={handleDelete}>
          <span className="close"><i className="far fa-times-circle"></i></span>
        </div>
        <div className="column is-narrow">
          <img src ={productImage} alt={productName} width="100" />
        </div>
        <div className="column cart-name is-narrow has-text-centered">{productName}</div>
        <div className="column cart-descript is-narrow has-text-centered">{productDescription}</div>
        <div className="column has-text-centered">
          <span className="price">{formatPrice(productPrice)}</span>
        </div>
        <div className="column has-text-centered">
          <input 
            type="number" 
            className="input num-input" 
            min={1}
            value={productQuantity} 
            onChange={handleUpdate}/>
        </div>
        <div className="column has-text-centered">
          <span className="sum-price">{sumPrice}</span>
        </div>
      </div>
    );
  };
  
  export default CartItem;


