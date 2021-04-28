/*********************************************************************************/
/*************This is the UI page of the Buyer Finish Order page *****************/
/*********************************************************************************/

import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import {Container, Row, Col} from'react-bootstrap'
import PageTemplate from '../PageTemplate'
import '../../css/common/Shared.scss'
import '../../css/orderService/OrderReview.scss';
import OrderListItem from './OrderListItem';
import OrderDetailItem from './OrderDetailItem';
import axios from '../commons/axios';
import {Scrollbars} from 'react-custom-scrollbars';
import { useMemo} from 'react';

const OrderReview = () => {

  const [orderItems, setOrderItems] = useState([]);
  const [isRightPanelActive, setRightPanelState] = useState('container right-panel-active');
  const [orderDetails, setOrderDetails] = useState([]);
  const [shipmentDetail, setShipmentDetail] = useState([]);
  const [paymentDetail, setPaymentDetail] = useState([]);
  const userInfo = useMemo(() => {return global.auth.getUser() || {};}, []);    

  useEffect( async () => {
    const userID = global.appState.getUserID();
    const orderServiceResponse = await axios.get(`/order/items/${userID}`);
    setOrderItems(orderServiceResponse.data['orders']);
  }, []);

  const handleSigninClick = () => {
    setRightPanelState('container');
  };

  const handleSignupClick = () => {
    setRightPanelState('container right-panel-active');
  };

  //show order/payment/shipment info for a selected single order
  const showOrderDetail = async (orderID) => {
    try {
      await reloadOrderDetails(orderID);
      await reloadShipmentDetail(orderID);
      await reloadPaymentDetail(orderID);
      handleSigninClick();
    } catch (e) {
      console.log("error when getting order detail", e);
    }
  };

  const reloadOrderDetails = async (orderID) => {
    const orderServiceResponse = await axios.get(`/order/detail/${orderID}`);
    const orderDetails = orderServiceResponse.data['orderItems']
    setOrderDetails(orderDetails);
  };

  const reloadShipmentDetail = async (orderID) => {
    const shipmentServiceResponse = await axios.get(`/shipment/${orderID}`);
    const shipmentDetail = shipmentServiceResponse.data['shipment']
    setShipmentDetail(shipmentDetail);
  };

  const reloadPaymentDetail = async (orderID) => {
    const paymentServiceResponse = await axios.get(`/payment/${orderID}`);
    const paymentDetail = paymentServiceResponse.data['payment']
    setPaymentDetail(paymentDetail);
  };

  const getSecureCardNumber = (cardNumber) => {
    let car = "**** **** **** " + String(cardNumber).substring(12, 16);
    return "**** **** **** " + String(cardNumber).substring(12, 16);
  }

  return (
     <PageTemplate>
          <Container fluid={true}>
            <div className="body-wrapper">
                <div className={isRightPanelActive} id="container">

                  <div className="review-container order-list-container">
                    <div className="order-list-title">Your order List</div>
                      <Scrollbars className="scroll-container">
                        <div className ="order-list-item">
                        {
                          orderItems.map(item => <OrderListItem orderItem={item} showOrderDetail={showOrderDetail}/>)
                        }
                        </div>
                      </Scrollbars>
                  </div>

                  <div className="review-container order-detail-container">
                  <div className="order-list-title">Order Detail</div>
                  <div className="order-info-container">                                                  
                    <Row >
                      <Col className="shipment-info-container">
                        <span className="shipment-info">Shipment Information</span>  
                          <div className = "info-item is-vcentered" >Ship To: {shipmentDetail['recipient']}</div>
                          <div className = "info-item " > Phone: {shipmentDetail['phone_number']}</div>
                          <div className = "info-item"  > Address: {shipmentDetail['addr_street']}</div>
                          <div className = "info-item"  > {shipmentDetail['addr_state'] + ", " + shipmentDetail['zipcode']}</div>
                      </Col>
                      <Col className="payment-info-container">
                        <span className="payment-info">Payment Information</span>                                
                          <div className = "info-item">Payment Method: {paymentDetail['payment_method']}</div>                               
                          <div className = "info-item" >Card Number: {getSecureCardNumber(paymentDetail['payment_card_number'])}</div>                               
                      </Col>
                    </Row>
                  </div>
                    <Scrollbars  className="scroll-container">
                      <div className ="order-detail">
                          <div classNmae = "order-detail-item">
                            {
                              orderDetails.map(detail => <OrderDetailItem orderDetail={detail}/>)
                            }
                          </div>                          
                        </div>
                    </Scrollbars>
                </div>

                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-left">
                      <h2>Your Order Has Been Placed!</h2>
                      <div className ="finish-order-nav-bar">
                        <button className="ghost " ><a href="/allproducts">Contiue Shopping</a></button>
                        <button className="ghost " ><a href="/logout">Logout and exit</a></button>
                      </div>
                    </div>
                    <div className="overlay-panel overlay-right">
                      <h2>Hi, here is your orders detail </h2>
                      <p>You can choose any one to see the order detail</p>
                      <button className="ghost"onClick={handleSignupClick}>Back to the history</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </PageTemplate>
    );
  };
  
  export default withRouter(OrderReview);