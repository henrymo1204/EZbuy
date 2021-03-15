// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import Button from 'react-bootstrap/Button';

import React from 'react';

//Import components
import MyNavbar from './Navbar';
import HomeButton from './HomeButton';
import AboutBar from './AboutBar';
import ContentCard from './ContentCard';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Component } from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

class Cart extends Component {

  render() {
    return (
      <Container fluid={true} className="pt-2">
        {/* <div>
        <a href="http://localhost:3000/">
          <Image src="/images/ez_buy_logo.jpg" className="ezBuyIcon" />
        </a>
      </div> */}
        <HomeButton />

        <MyNavbar />

        <AboutBar />

      </Container>
    );
  }
}


export default Cart;