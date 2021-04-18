/*********************************************************************************
                This is the UI page of the Payment Info
*********************************************************************************/

import React from 'react';
import { Component } from 'react';

import {Button,Container, Col,Form,Nav} from'react-bootstrap'
import PageTemplate from '../../components/PageTemplate'
import '../../css/common/BodyWrapper.scss'


const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

class PaymentInfo extends Component {

  render() {
    return (
        <PageTemplate>
          <Container fluid={true}>
          
            <div className="body-wrapper">

            <p className="title has-text-centered">Place Your Order</p>
            <div className="body-form">
              <Form>

              <Form.Row>
              <Form.Label> </Form.Label>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhoneNum">
                  <Form.Label >User's Name</Form.Label>
                  <Form.Control placeholder=" Lily " />

                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control placeholder="+1 XXX XXX XXXX " />

                  <Form.Label>Address Detail</Form.Label>
                  <Form.Control size="lg" placeholder="St，Apartment, studio, or floor" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhoneNum">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control as="select" defaultValue="** Card...">
                    <option>Choose...</option>
                    <option>Visa Card</option>
                    <option>Master Card</option>
                    <option>Debit Card</option>

                  </Form.Control>
                
                  <Form.Label>Name On Card</Form.Label>
                  <Form.Control placeholder="FirstName LastName " />

                  <Form.Label>Card Number</Form.Label>
                  <Form.Control placeholder="+1 XXX XXX XXXX " />
                  
                </Form.Group>

              </Form.Row>
              
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>Alaska</option>
                    <option>California</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Kentucky</option>
                    <option>Louisiana</option>
                    <option>Nevada</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>

                {/* ********************************************************* */}
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Month</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>MM</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Year</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>YYYY</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control />
                </Form.Group>

              </Form.Row>
              <Form.Row> 

              
              <Col>
                <Nav.Link href="cart" >
                <Button className="common-button"> Back </Button>
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link href="buyerfinishorder" >
                <Button className="common-button"> Checkout </Button>
                </Nav.Link>
              </Col> 
              </Form.Row>
              {<br></br>}

            </Form>
            </div>
            </div>
            
          </Container>
        </PageTemplate>
    );
  }
}


export default PaymentInfo;