/*********************************************************************************
   This is the UI page of the Payment Info(Address && Card's info)
*********************************************************************************/

import React, {useState, useRef, useReducer} from 'react';
import { withRouter } from 'react-router-dom'
import {Button,Container, Row, Col,Form,Nav} from'react-bootstrap'
import PageTemplate from '../PageTemplate'
import '../../css/common/Shared.scss'
import '../../css/orderService/Checkout.scss';
import {useForm} from 'react-hook-form';
import axios from '../commons/axios';
import {clearUserCart} from '../commons/utils'
const Checkout = (props) => {

  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  //reference for shipment form
  const shipmentForm = useRef(null);
  const [currentOrderID, setOrderID] = useState();

  //init states
  const [isActive, setActive] = useState('cont s-signup');

  //use react-hook-form
  const { register, handleSubmit, errors } = useForm();

  const handleClick = () => {
    if (isActive.includes('s-signup')) {
      setActive('cont');
    } else {
      setActive('cont s-signup');
    }
  };

  const onSubmitPayment = async (data) => {
    const userID = global.appState.getUserID();
    
    let cart_res = null, payment_res = null;
    try {
      //step1. create order and get orderID
      const car_service_response = await axios.get(`/cart/items?userID=${userID}`);
      const cartItems = car_service_response.data['items'] || []
      const order_service_response = await axios.post(`/order/${userID}`, {
        'order_items': cartItems
      });
      const orderID = order_service_response.data['orderID'];

      //step2. create payment to backend
      const expiration_info = data['expire_date'].split('-');
      const expire_year = expiration_info[0];
      const expire_month = expiration_info[1];

      payment_res = await axios.post(`/payment/${userID}/${orderID}`, {
        payment_method: data['payment_method'],
        name_on_card: data['name_on_card'],
        card_number: data['card_number'],
        expire_month,
        expire_year,
        CVV: data['CVV']
      });

      //update orderID when order created
      setOrderID(orderID);

      //trigger shipment form submission
      shipmentForm.current.requestSubmit();
    } catch (error) {
      if (cart_res == null || cart_res.data['success'] !== 'success') {
        console.log("failed to create order");
      } else if (payment_res == null || payment_res.data['success'] !== 'success') {

      }
    }

  };

  const onSubmitShipment = async (data) => {
    let shipment_res = null
    const userID = global.appState.getUserID();

    try {
      shipment_res = await axios.post(`/shipment/${userID}/${currentOrderID}`, {
        addr_city: data['addr_city'],
        addr_state: data['addr_state'],
        addr_street: data['addr_street'],
        zipcode: data['zipcode'],
        phone_number: data['phone_number'],
        recipient: data['recipient']
      });
      clearUserCart(userID);
      global.appState.updateLocalCartNum();
      // forceUpdate();
      props.history.push('/orderreview');
    } catch (e) {
      if (shipment_res == null || shipment_res.data['success'] !== 'success') {
        console.log(e);
      }
    }
  }

  return (
     <PageTemplate>
          <Container fluid={true}>
          <div className="body-wrapper"> 
          <div className={isActive}>

          <form action="#" onSubmit={handleSubmit(onSubmitPayment)}>

            <h1>Payment Information</h1>
              <div className = "form_list_payment">
                <div className="control">
                  <input
                    className={`input ${errors.payment_method && 'text-warn'}`}
                    type="text"
                    placeholder="Payment Method"
                    name="payment_method"
                    ref={register({
                      required: 'Payment method is required',
                    })}
                  />
                    {errors.payment_method && (
                      <p className="helper has-text-danger">{errors.payment_method.message}</p>
                    )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.name_on_card && 'text-warn'}`}
                    type="text"
                    placeholder="Name on Card"
                    name="name_on_card"
                    ref={register({
                      required: 'Name on card is required',
                      minLength: {
                        value: 6,
                        message: 'Minimum length for recipient is 6'
                      }
                    })}
                  />
                  {errors.name_on_card && (
                    <p className="helper has-text-danger">{errors.name_on_card.message}</p>
                  )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.card_number && 'text-warn'}`}
                    type="text"
                    placeholder="Card Number"
                    name="card_number"
                    ref={register({
                      required: 'Card number is required',
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: 'invalid card number, format XXXX XXXX XXXX XXXX'
                      }
                    })}
                  />
                  {errors.card_number && (
                    <p className="helper has-text-danger">{errors.card_number.message}</p>
                  )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.expire_date && 'text-warn'}`}
                    type="Month"
                    placeholder="Month"
                    name="expire_date"
                    ref={register({
                      required: 'Expire date is required',
                    })}
                  />
                  {errors.expire_date && (
                    <p className="helper has-text-danger">{errors.expire_date.message}</p>
                  )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.CVV && 'text-warn'}`}
                    type="text"
                    placeholder="CVV"
                    name="CVV"
                    ref={register({
                      required: 'CVV is required, format XXX',
                      pattern: {
                        value: /^[0-9]{3}$/,
                        message: 'invalid CVV'
                      }
                    })}
                  />
                  {errors.CVV && (
                    <p className="helper has-text-danger">{errors.CVV.message}</p>
                  )}
                </div>
                <button className="checkout-btn">checkout</button>
              </div>
            
            </form>
                  
            <div className="sub-cont">
              <div className="img">
                <div className="img-text m-up">
                  <h2>Address Info here</h2>
                  <p>Back to Address!</p>
                </div>
                <div className="img-text m-in">
                  <h2>Payment Info here</h2>
                  <p>Please finish the payment info here!</p>
                </div>
                <div className="img-btn" onClick={handleClick}>
                  <span className="m-up">To Shipment</span>
                  <span className="m-in">To Payment</span>
                </div>
              </div>

             <form action="#" ref={shipmentForm} onSubmit={handleSubmit(onSubmitShipment)}>
                <h1>Shipment Information</h1>
                    <div className ="form_list_address">
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.recipient && 'text-warn'}`}
                            type="text"
                            placeholder="Name to ship"
                            name="recipient"
                            ref={register({
                              required: 'Recipient is required',
                              minLength: {
                                value: 6,
                                message: 'Minimum length for recipient is 6'
                              }
                            })}
                          />
                          {errors.recipient && (
                            <p className="helper has-text-danger">{errors.recipient.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.phone_number && 'text-warn'}`}
                            type="text"
                            placeholder="Phone Number"
                            name="phone_number"
                            ref={register({
                              required: 'Phone numbner is required',
                              pattern: {
                                value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                                message: 'Invalid phone number, require XXX-XXX-XXX'
                              }
                            })}
                          />
                          {errors.phone_number && (
                            <p className="helper has-text-danger">{errors.phone_number.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.addr_street && 'text-warn'}`}
                            type="text"
                            placeholder="Street, Apartment #"
                            name="addr_street"
                            ref={register({
                              required: 'Street is required for address',
                            })}
                          />
                          {errors.addr_street && (
                            <p className="helper has-text-danger">{errors.addr_street.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.addr_city && 'text-warn'}`}
                            type="text"
                            placeholder="City"
                            name="addr_city"
                            ref={register({
                              required: 'City is required for address',
                            })}
                          />
                          {errors.addr_city && (
                            <p className="helper has-text-danger">{errors.addr_city.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.addr_state && 'text-warn'}`}
                            type="text"
                            placeholder="State"
                            name="addr_state"
                            ref={register({
                              required: 'State is required for address',
                            })}
                          />
                          {errors.addr_state && (
                            <p className="helper has-text-danger">{errors.addr_state.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.zipcode && 'text-warn'}`}
                            type="text"
                            placeholder="zipcode"
                            name="zipcode"
                            ref={register({
                              required: 'Zipcode is required for address',
                              pattern: {
                                value: /^[0-9]{5}$/,
                                message: 'invalid zipcode'
                              }
                            })}
                          />
                          {errors.zipcode && (
                            <p className="helper has-text-danger">{errors.zipcode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>                  
                  </form>
              </div>
            </div>
          </div>
          </Container>
        </PageTemplate>
    );
  };
  
  export default withRouter(Checkout);




  






  

