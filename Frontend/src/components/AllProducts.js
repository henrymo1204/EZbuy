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
import Products from './Products';
import Filter from './Filter';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'

import { Component } from 'react';

import '../css/styles.css';

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

const products = [
  {
    id: 1,
    name: "Apple",
    description: "Red Apple",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },

  {
    id: 2,
    name: "Banana",
    description: "Yellow Banana",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },

  {
    id: 3,
    name: "Orange",
    description: "Orange Orange",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },

  {
    id: 4,
    name: "Strawberry",
    description: "Red Strawberry",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },

  {
    id: 5,
    name: "Watermellon",
    description: "Green Watermellon",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },

  {
    id: 6,
    name: "Cat",
    description: "Cat",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },

  
  {
    id: 7,
    name: "Dog",
    description: "Dog",
    img: "/images/ez_buy_logo.jpg",
    price: 100
  },
]

class AllProducts extends Component {
  
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

        
        <Row>
          <Col md='auto'>
            <div classNane="radio-buttons">
              <Filter />
            </div>
          </Col>
          <Col>
            <div className="products">
              {
                products.map(p => <Products key={p.id} {...p} />)
              }
            </div>
          </Col>
        </Row>

        
        {/* got the code from https://www.youtube.com/watch?v=2-S-FiEl07I */}

        <AboutBar />

      </Container>
    );
  }
}


export default AllProducts;