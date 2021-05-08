// This component class uses cards which can be found here 
//https://react-bootstrap.github.io/components/cards/

import React from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import axios from './commons/axios';
import { toast } from 'react-toastify';

const ContentCard = (props) => {

    const productName = props.adDetail['productName'];
    const productID = props.adDetail['productID'];
    const imageurl = props.adDetail['productImage'];
    const price = props.adDetail['productPrice']
    const productURL = `/productdetail?productID=${props.adDetail['productID']}`; 
    let refreshPage = null;

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
          // props.updateAds();
          // window.location.reload();
          // props.updateAds();
          refreshPage();
          toast.success('Added to shopping cart succeeded.');
        } catch (error) {
          toast.error('Added to shopping cart failed.');
        }
    };

    return (
         <Card className={"text-center " + props.attributes}>
            <Card.Img variant="top" src={imageurl} className="ad-image"/>
            <Card.Body className="ad-body">
                <Card.Title className="ad-detail">{productName}</Card.Title>
                <Card.Title className="ad-detail">${price}</Card.Title>
                  <Card.Title className="ad-detail">
                  <Button variant="primary" href={productURL}>Go to product</Button>
                  </Card.Title>
                  <Card.Title className="ad-detail">
                    {refreshPage = props.updateCart}
                    <Nav.Link onClick={addCart} className="ad-btn-field">
                      <i className="fas fa-cart-plus"></i>
                      <span>  Add to Cart </span>
                    </Nav.Link> 
                  </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ContentCard;