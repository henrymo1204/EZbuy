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

const OrderReview = () => {

  const [orderItems, setOrderItems] = useState([]);
  const [isRightPanelActive, setRightPanelState] = useState('container right-panel-active');
  const [orderDetails, setOrderDetails] = useState([]);

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

  const showOrderDetail = async (orderID) => {
    try {
      const orderServiceResponse = await axios.get(`/order/detail/${orderID}`);
      const orderDetails = orderServiceResponse.data['orderItems']
      setOrderDetails(orderDetails);
      handleSigninClick();
    } catch (e) {
      console.log("error when getting order detail", e);
    }
  };

  const reloadOrderDetails = () => {

  };

  return (
     <PageTemplate>
          <Container fluid={true}>
            <div className="body-wrapper">
                <div className={isRightPanelActive} id="container">

                  <div className="form-container sign-up-container">
                    <h1>Your order List</h1>
                    <div className="content-container">
                      {
                        orderItems.map(item => <OrderListItem orderItem={item} showOrderDetail={showOrderDetail}/>)
                      }
                    </div>

                  </div>

                  <div className="form-container sign-in-container">
                    <div  className="content-container">
                      <div className ="order-detail">
                        <div className="order-info-container"></div>
                        <Row >
                          <Col className="shipment-info-container">
                            <span className="shipment-info">shipmentInfo</span>
                            <Row>
                              <Row>
                              <span >Test0010</span>
                              <span > 323-123-9876</span>
                              </Row>
                              <Row>
                              <span >Streat Apt111</span>
                              </Row>
                              <Row>
                              <span >Fullerton, CA, 92831</span>
                              </Row>
                            </Row>
                          </Col>
                          <Col className="payment-info-container">
                            <span className="payment-info">paymentInfo</span>
                            <Row>
                              <Row>
                              <span >Visa</span>
                              </Row>
                              <Row>
                              <span >**** **** **** 9012</span>
                              </Row>
                            </Row>
                          </Col>
                        </Row>
                        <div className="order-details">
                          {
                            orderDetails.map(detail => <OrderDetailItem orderDetail={detail}/>)
                          }
                        </div>
                      </div>
                     
                    </div>
                </div>

                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-left">
                      <h2>Your Order Has Been Placed!</h2>
                      <div className ="finish-order-nav-bar">
                        {/* <button type = "button" className="ghost"  onClick={handleSigninClick}>Review Your Order</button> */}
                        <button type = "button" className="ghost " >Contiue Shopping</button>
                        <button type = "button"className="ghost " >Logout and exit</button>
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