/*********************************************************************************
                 New This is the UI page of the Payment Info
*********************************************************************************/

import React, {useState, useRef} from 'react';
import { withRouter } from 'react-router-dom'
import {Button,Container, Row, Col,Form,Nav} from'react-bootstrap'
import PageTemplate from '../PageTemplate'
import '../../css/common/Shared.scss'
import '../../css/orderService/Checkout.scss';
import {useForm} from 'react-hook-form';
import axios from '../commons/axios';

const Checkout = (props) => {

  //reference for shipment form
  const shipmentForm = useRef(null);

  let currentOrderID = null;

  //init states
  const [isActive, setActive] = useState('cont s-signup');
  // const [orderID, setOrderID] = useState("");

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
      // const = data['payment_method'],
      // const = data['name_on_card'],
      // const = data['card_number'],
      // const = data['expire_month'],
      // const = data['expire_year'],
      // const = data['CVV']
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
      // setOrderID(orderID);
      currentOrderID = orderID;

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
                    className={`input ${errors.paymentMethod && 'text-warn'}`}
                    type="text"
                    placeholder="Payment Method"
                    name="payment_method"
                    ref={register({
                      required: 'paymentMethod is required',
                    })}
                  />
                    {errors.paymentMethod && (
                      <p className="helper has-text-danger">{errors.paymentMethod.message}</p>
                    )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.nameOnCard && 'text-warn'}`}
                    type="text"
                    placeholder="Name on Card"
                    name="name_on_card"
                    ref={register({
                      required: 'nameOnCard is required',
                    })}
                  />
                  {errors.nameOnCard && (
                    <p className="helper has-text-danger">{errors.nameOnCard.message}</p>
                  )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.cardNumber && 'text-warn'}`}
                    type="text"
                    placeholder="Card Number"
                    name="card_number"
                    ref={register({
                      required: 'cardNumber is required',
                    })}
                  />
                  {errors.cardNumber && (
                    <p className="helper has-text-danger">{errors.cardNumber.message}</p>
                  )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.month && 'text-warn'}`}
                    type="Month"
                    placeholder="Month"
                    name="expire_date"
                    ref={register({
                      required: 'month is required',
                    })}
                  />
                  {errors.month && (
                    <p className="helper has-text-danger">{errors.month.message}</p>
                  )}
                </div>
                <div className="control">
                  <input
                    className={`input ${errors.cvv && 'text-warn'}`}
                    type="text"
                    placeholder="CVV"
                    name="CVV"
                    ref={register({
                      required: 'CVV is required',
                    })}
                  />
                  {errors.cvv && (
                    <p className="helper has-text-danger">{errors.cvv.message}</p>
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
                            className={`input ${errors.nameToship && 'text-warn'}`}
                            type="text"
                            placeholder="Name to ship"
                            name="recipient"
                            ref={register({
                              required: 'Name is required',
                            })}
                          />
                          {errors.nameToship && (
                            <p className="helper has-text-danger">{errors.nameToship.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.phoneNumner && 'text-warn'}`}
                            type="text"
                            placeholder="Phone Number"
                            name="phone_number"
                            ref={register({
                              required: 'Phone numner is required',
                            })}
                          />
                          {errors.phoneNumner && (
                            <p className="helper has-text-danger">{errors.phoneNumner.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.street && 'text-warn'}`}
                            type="text"
                            placeholder="Street, Apartment #"
                            name="addr_street"
                            ref={register({
                              required: 'street is required',
                            })}
                          />
                          {errors.street && (
                            <p className="helper has-text-danger">{errors.street.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.city && 'text-warn'}`}
                            type="text"
                            placeholder="City"
                            name="addr_city"
                            ref={register({
                              required: 'city is required',
                            })}
                          />
                          {errors.city && (
                            <p className="helper has-text-danger">{errors.city.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${errors.state && 'text-warn'}`}
                            type="text"
                            placeholder="State"
                            name="addr_state"
                            ref={register({
                              required: 'state is required',
                            })}
                          />
                          {errors.state && (
                            <p className="helper has-text-danger">{errors.state.message}</p>
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
                              required: 'zipcode is required',
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



  

// import React, {useState, useRef} from 'react';
// import { withRouter } from 'react-router-dom'
// import {Button,Container, Row, Col,Form,Nav} from'react-bootstrap'
// import PageTemplate from '../PageTemplate'
// import '../../css/common/Shared.scss'
// import '../../css/orderService/Checkout.scss'
// import '../../css/orderService/NewCheckout.scss';
// import {useForm} from 'react-hook-form';
// import axios from '../commons/axios';

// const NewCheckout = (props) => {

//   //reference for shipment form
//   const shipmentForm = useRef(null);

//   //init states
//   const [isActive, setActive] = useState('cont s-signup');
//   const [orderID, setOrderID] = useState("");
//   const [userID, setUserID] = useState("");

//   //use react-hook-form
//   const { register, handleSubmit, errors } = useForm();

//   const handleClick = () => {
//     if (isActive.includes('s-signup')) {
//       setActive('cont');
//     } else {
//       setActive('cont s-signup');
//     }
//   };

//   const onSubmitPayment = async (data) => {
//     const userID = global.auth.getUserID() || "";
    
//     let cart_res = null, payment_res = null;
//     try {
//       //step1. create order and get orderID
//       const response = await axios.get(`/cart/items?userID=${userID}`);
//       const cartItems = response.data['items'] || []
//       const orderID = await axios.post(`/order/${userID}`, {
//         'order_items': cartItems
//       });

//       //step2. create payment to backend
//       payment_res = await axios.post(`/payment/${userID}/${orderID}`, {
//         payment_method: data['payment_method'],
//         name_on_card: data['name_on_card'],
//         card_number: data['card_number'],
//         expire_month: data['expire_month'],
//         expire_year: data['expire_year'],
//         CVV: data['CVV']
//       });

//       setUserID(userID);

//       //update orderID when order created
//       setOrderID(orderID);

//       //trigger shipment form submission
//       shipmentForm.current.requestSubmit();
//     } catch (error) {
//       if (cart_res == null || cart_res.data['success'] !== 'success') {
//         console.log("failed to create order");
//       } else if (payment_res == null || payment_res.data['success'] !== 'success') {

//       }
//     }

//   };

//   const onSubmitShipment = async (data) => {
//     const shipment_res = null

//     try {
//       shipment_res = await axios.post(`/shipment/${userID}/${orderID}`, {
//         addr_city: data['addr_city'],
//         addr_state: data['addr_state'],
//         addr_street: data['addr_street'],
//         zipcode: data['zipcode'],
//         phone_number: data['phone_number'],
//         recipient: data['recipient']
//       });
//       props.history.push('/buyerfinish');
//     } catch (e) {
//       if (shipment_res == null || shipment_res.data['success'] !== 'success') {
//         console.log("failed to create shipment");
//       }
//     }
//   }

//   return (
//      <PageTemplate>
//           <Container fluid={true}>
//           <div className="body-wrapper"> 
//           <div className={isActive}>
//           <form action="#" ref={shipmentForm} onSubmit={handleSubmit(onSubmitShipment)}>
//                     <h1>Shipment Information</h1>
//                     <div className="field">
//                       <div className="control">
//                         <input
//                           className={`input ${errors.nameToship && 'text-warn'}`}
//                           type="text"
//                           placeholder="Name to ship"
//                           name="nameToship"
//                           ref={register({
//                             required: 'Name is required',
//                           })}
//                         />
//                         {errors.nameToship && (
//                           <p className="helper has-text-danger">{errors.nameToship.message}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="field">
//                       <div className="control">
//                         <input
//                           className={`input ${errors.phoneNumner && 'text-warn'}`}
//                           type="text"
//                           placeholder="Phone Number"
//                           name="phoneNumner"
//                           ref={register({
//                             required: 'Phone numner is required',
//                           })}
//                         />
//                         {errors.phoneNumner && (
//                           <p className="helper has-text-danger">{errors.phoneNumner.message}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="field">
//                       <div className="control">
//                         <input
//                           className={`input ${errors.street && 'text-warn'}`}
//                           type="text"
//                           placeholder="Street, Apartment #"
//                           name="street"
//                           ref={register({
//                             required: 'street is required',
//                           })}
//                         />
//                         {errors.street && (
//                           <p className="helper has-text-danger">{errors.street.message}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="field">
//                       <div className="control">
//                         <input
//                           className={`input ${errors.city && 'text-warn'}`}
//                           type="text"
//                           placeholder="City"
//                           name="city"
//                           ref={register({
//                             required: 'city is required',
//                           })}
//                         />
//                         {errors.city && (
//                           <p className="helper has-text-danger">{errors.city.message}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="field">
//                       <div className="control">
//                         <input
//                           className={`input ${errors.state && 'text-warn'}`}
//                           type="text"
//                           placeholder="State"
//                           name="state"
//                           ref={register({
//                             required: 'state is required',
//                           })}
//                         />
//                         {errors.state && (
//                           <p className="helper has-text-danger">{errors.state.message}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="field">
//                       <div className="control">
//                         <input
//                           className={`input ${errors.zipcode && 'text-warn'}`}
//                           type="text"
//                           placeholder="Zipcode"
//                           name="zipcode"
//                           ref={register({
//                             required: 'zipcode is required',
//                           })}
//                         />
//                         {errors.zipcode && (
//                           <p className="helper has-text-danger">{errors.zipcode.message}</p>
//                         )}
//                       </div>
//                     </div>
//                   </form>
//               <div className="sub-cont">
//                 <div className="img">
//                   <div className="img-text m-up">
//                     <h2>Payment Info here</h2>
//                     <p>Please finish the payment info here!</p>
//                   </div>
//                   <div className="img-text m-in">
//                     <h2>Address Info</h2>
//                     <p>Back to Address!</p>
//                   </div>
//                   <div className="img-btn" onClick={handleClick}>
//                     <span className="m-up">Next</span>
//                     <span className="m-in">Back</span>
//                   </div>
//                 </div>

             
//                 <form action="#" onSubmit={handleSubmit(onSubmitPayment)}>
//                     <h1>Payment Information</h1>
//                     <div className="control">
//                       <input
//                         className={`input ${errors.paymentMethod && 'text-warn'}`}
//                         type="text"
//                         placeholder="Payment Method"
//                         name="paymentMethod"
//                         ref={register({
//                           required: 'paymentMethod is required',
//                         })}
//                       />
//                         {errors.paymentMethod && (
//                           <p className="helper has-text-danger">{errors.paymentMethod.message}</p>
//                         )}
//                     </div>
//                     <div className="control">
//                       <input
//                         className={`input ${errors.nameOnCard && 'text-warn'}`}
//                         type="text"
//                         placeholder="Name on Card"
//                         name="nameOnCard"
//                         ref={register({
//                           required: 'nameOnCard is required',
//                         })}
//                       />
//                       {errors.nameOnCard && (
//                         <p className="helper has-text-danger">{errors.nameOnCard.message}</p>
//                       )}
//                     </div>
//                     <div className="control">
//                       <input
//                         className={`input ${errors.cardNumber && 'text-warn'}`}
//                         type="text"
//                         placeholder="Card Number"
//                         name="cardNumber"
//                         ref={register({
//                           required: 'cardNumber is required',
//                         })}
//                       />
//                       {errors.cardNumber && (
//                         <p className="helper has-text-danger">{errors.cardNumber.message}</p>
//                       )}
//                     </div>
//                     <div className="control">
//                       <input
//                         className={`input ${errors.month && 'text-warn'}`}
//                         type="Month"
//                         placeholder="Month"
//                         name="month"
//                         ref={register({
//                           required: 'month is required',
//                         })}
//                       />
//                       {errors.month && (
//                         <p className="helper has-text-danger">{errors.month.message}</p>
//                       )}
//                     </div>
//                     <div className="control">
//                       <input
//                         className={`input ${errors.cvv && 'text-warn'}`}
//                         type="text"
//                         placeholder="CVV"
//                         name="cvv"
//                         ref={register({
//                           required: 'CVV is required',
//                         })}
//                       />
//                       {errors.cvv && (
//                         <p className="helper has-text-danger">{errors.cvv.message}</p>
//                       )}
//                     </div>
//                     <button >checkout</button>
//                   </form>

//               </div>
//             </div>
//           </div>
//           </Container>
//         </PageTemplate>
//     );
//   };
  
//   export default withRouter(NewCheckout);




  






  

