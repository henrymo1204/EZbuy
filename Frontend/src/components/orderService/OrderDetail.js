
/****************************************************************************************
                          This is the page of order detail
****************************************************************************************/
import Button from 'react-bootstrap/Button';
import React from 'react';
import '../../css/common/BodyWrapper.scss'
import DetailItem from './DetailItem';

//Import components
import PageTemplate from '../../components/PageTemplate'
import MyNavbar from '../Navbar';
import HomeButton from '../HomeButton';
import AboutBar from '../AboutBar';
import ContentCard from '../ContentCard';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Component } from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

class OrderDetail extends Component {

  render() {
    return (
      <PageTemplate>
        <Container fluid={true}>
          
          <div className="body-wrapper">
              <div className="text-center">
                  Order Detail
                  <br></br>
                  <br></br>

              </div>
              <Row>
                <Col classNmae ="bd-left">
                
                <div> Hi Alex</div>
                <img src = "/images/ez_buy_logo.jpg" alt= "" width="100" />
                <div> </div>
                
                </Col>
                <Col classNmae ="bd-right">
                 <div>Order 1 Detail</div>
                  <DetailItem/>
                  <DetailItem/>
                  <DetailItem/>
                  <br></br>
                  <br></br>
                </Col>
            
              </Row>
              
          
          </div>

        </Container>

      </PageTemplate>
    );
  }
}


export default OrderDetail;