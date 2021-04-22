/*********************************************************************************/
/*************This is the UI page of the Buyer Finish Order page *****************/
/*********************************************************************************/

import React from 'react';
import { Component } from 'react';
import {Button,Row,Col,Container,From} from 'react-bootstrap'

import '../../css/common/BodyWrapper.scss'
import OrderListItem from './OrderListItem';
import PageTemplate from '../../components/PageTemplate'

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

class BuyerFinOrder extends Component {

  render() {
    return (
      <PageTemplate>
        <Container fluid={true}>
          <div className="body-wrapper">
              <div className="text-center logout-title">
              Your order has been placed ! 
              </div>
              <Row>
                <Col classNmae ="bd-left">
                <div  className="text-center group-buttons">
                  <Row>
                    <button className="account-button " >
                    Review your order
                    </button>
                  </Row>
                  <Row>
                    <button className="account-button " >
                    Continue shopping
                    </button>
                  </Row>
                  <Row>
                    <button className="account-button " >
                    Log out
                    </button>
                  </Row>
                </div>
                </Col>
                <Col classNmae ="bd-right">
                  <OrderListItem/>
                  <OrderListItem/>
                  <OrderListItem/>
                </Col>
            
              </Row>
          </div>

        </Container>
       </PageTemplate>     
     );
  }
}

export default BuyerFinOrder;