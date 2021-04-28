// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {Row,Col} from "react-bootstrap";
import PageTemplate from '../../components/PageTemplate'
import axios from '../commons/axios';
import {formatPrice} from '../commons/utils'
import {useForm} from 'react-hook-form';
import AuctionCountdownTime from './auctionCountdown'

import '../../css/auctionStyle/auctionStyle.scss';



const Auction = (props) => {
    
    // const [quantity, setQuantity] = useState(props.cartItem.productQuantity);
    const { cartItemID, cartID, productID, productQuantity, productName, productDescription,
        productPrice, productImage, product3DImage, isAuctionProduct
      } = props.auction || {};
    
    // const handleUpdate = e => {
    //     const newQuantity = parseInt(e.target.value);
    //     setQuantity(newQuantity);
        
    //     const newCartItem = {
    //         ...props.cartItem,
    //         productQuantity: newQuantity
    //     };
    //     axios.patch(`/cart/${cartItemID}`, {quantity: newQuantity}).then(res => {
    //         if (res.data['success'] == true) {
    //         toast.success('cart update success.');
    //         } else {
    //         toast.error('cart update failed.');
    //         }
    //         props.updateCartItem(newCartItem);
    //     });
    // };
    const { register, handleSubmit, errors } = useForm();

    return(
    
        <PageTemplate>
          <div className="auction-container">
              <Row>
                  <Col className="auction-left">
                    <div className="bid-picture"><image src={productImage}></image></div>
                    <div className="bid-name"><label>{productName}</label></div>
                    <div className="bid-description">{productDescription}</div>
                      
                  </Col>
                  <Col className="auction-right">
                    <div className="bid-cound-down"><AuctionCountdownTime/></div>
                    {/* <div className="bid-price">{formatPrice(productPrice)}</div> */}
                    <div className="bid-price">{productPrice}</div>
                    <div className="bid-input-price">
                    <select 
                        name="Bid_Price" 
                        ref={register({
                            required: "select your bid price"
                        })}>
                            <option value="">$100</option>
                            <option value="1">$200</option>
                            <option value="2">$300</option>
                            <option value="3">$400</option>
                            <option value="3">$500</option>
                        </select>
                    </div>
                    <div className="bid-button"><button>Bid it</button></div>
                  </Col>
              </Row>
          </div>
        
      </PageTemplate>
        
    )
}

export default Auction;