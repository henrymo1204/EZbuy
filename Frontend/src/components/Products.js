import React from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';

const Products = (props) => {

  const productID = props.productDetail['productID']
  const name = props.productDetail['name']
  const description = props.productDetail['description']
  const img = props.productDetail['img']
  const price= props.productDetail['price']

  const addCart = async () => {
  
    try {
      const userID = 1;
      const productID = 1;
      //get cart item from backend if existing
      const response = await axios.get(`/cart/item?productID=${productID}&&userID=${userID}`)

      const items = response.data['items']

      if (items && items.length > 0) {
        //if item existing, only need to update quantity
        const previousQuantity = items[0]['quantity']
        const cartItemID = items[0]['cartItemID']

        const item_updates = {
          quantity : previousQuantity + 1
        };

        await axios.patch(`/cart/${cartItemID}`, item_updates);
      } else {
        //if item not existing, need to insert new cart item in backend
        const cart_item = {
          userID : userID,
          productID : productID,
          quantity : 1
        };
    
        await axios.post('/cart', cart_item);
      }

      props.updateCartNum();
      toast.success('Added to shopping cart succeeded.');
    } catch (error) {
      toast.error('Added to shopping cart failed.');
    }
  };

  return (
    <section>
      <img src={img}></img>
      <p>{name}</p>
      <p>
        <button className="button" onClick={addCart}>Add</button>
      </p>
      <p>$ {price}</p>
    </section>
  );
};

export default Products;

{/* got the code from https://www.youtube.com/watch?v=2-S-FiEl07I */}