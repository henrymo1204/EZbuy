import React from 'react';
import { Nav } from 'react-bootstrap';
import axios from './commons/axios';
import { toast } from 'react-toastify';
import "../css/product/Products.scss";
import {Card} from "react-bootstrap";
const Products = (props) => {

  const productID = props.productDetail['productID']
  const name = props.productDetail['productName']
  const description = props.productDetail['productDescription']
  const img = props.productDetail['productImage']
  const price= props.productDetail['productPrice']

  const addCart = async () => {
  
    try {
      const userID = global.appState.getUserID();
      //get cart item from backend if existing
      const response = await axios.get(`/api/v1/cart/item?productID=${productID}&&userID=${userID}`)

      const items = response.data['items']

      if (items && items.length > 0) {
        //if item existing, only need to update quantity
        const previousQuantity = items[0]['quantity']
        const cartItemID = items[0]['cartItemID']

        const item_updates = {
          quantity : previousQuantity + 1
        };

        await axios.patch(`/api/v1/cart/${cartItemID}`, item_updates);
      } else {
        //if item not existing, need to insert new cart item in backend
        await axios.post('/api/v1/cart', {
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
      <Card className="product-card box">
        <a href={ `/productdetail?productID=${productID}` }>
        <Card.Img variant="top" src={img} className="product-image" />
        </a>
        <Card.Body>
          <Card.Title className="product-detail">{name}</Card.Title>
          <Card.Text className="product-detail">{description}</Card.Text>
          <Card.Text className="product-detail">{price}</Card.Text>
          <Card.Text className="product-detail">
            <Nav.Link onClick={addCart}>
            <i className="fas fa-cart-plus"></i>
            <span>Add</span>
          </Nav.Link>  
          </Card.Text>
        </Card.Body>
      </Card>
  );
};

export default Products;
