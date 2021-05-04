// This component class uses cards which can be found here 
//https://react-bootstrap.github.io/components/cards/

import React from 'react';
import { Card, Button } from 'react-bootstrap';
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
        // <Card className={"text-center " + props.attributes}>
        //     <Card.Header>{productName}</Card.Header>
        //     <Card.Img variant="top" src={imageurl} />
        //     <Card.Body>
        //         <Card.Text>{productDescription}</Card.Text>
        //         <Button variant="primary" href={productURL}>Go to product</Button>
        //     </Card.Body>
        //     <Card.Footer className="text-muted">{timeLeft}</Card.Footer>
        // </Card>

        <Card className={"text-center " + props.attributes}>
            <Card.Img variant="top" src={imageurl} className="ad-image"/>
            <Card.Body>
                <Card.Title className="ad-detail">{productName}</Card.Title>
                <Card.Title className="ad-detail">${price}</Card.Title>
                <Button variant="primary" href={productURL}>Go to product</Button>
                <Button variant="primary" onClick={addCart}>Add to cart</Button>
                {/* <Nav.Link className="ad-detail">
                    <i className="far fa-hand-point-right"></i>
                    <span> Buy Now</span>
                </Nav.Link>   */}
            </Card.Body>
        </Card>
    );
};

export default ContentCard;