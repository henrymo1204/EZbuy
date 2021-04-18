import React from 'react';
import axios from './commons/axios';
import { toast } from 'react-toastify';

const Products = (props) => {

  const productID = props.productDetail['productID']
  const name = props.productDetail['productName']
  const description = props.productDetail['productDescription']
  const img = props.productDetail['productImage']
  const price= props.productDetail['productPrice']

  const addCart = async () => {
  
    try {
      const userID = 1;
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
        await axios.post('/cart', {
          userID : userID,
          productID : productID,
          quantity : 1
        });
      }

      await global.appState.updateLocalCartNum();
      props.updatePage();
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
