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
import axios from './commons/axios';

import { Component } from 'react';

import '../css/styles.css';

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = { products: null };
  }

  componentDidMount() {
    axios.get('/products/').then((res) => {
      this.setState({ products: res.data['products'], cartNum: 0 })
    });
  }

  getCartNum = async () => {
    const userID = 1;
    const response = await axios.get(`/cart/${userID}`);
    const cartItems = response.data['items'] || []
    const cartNum = cartItems.map(item => item['quantity']).reduce((sum, change) => sum + change, 0); 
    return cartNum;
  };

  updateCartNum = async () => {
    const cartNum = await this.getCartNum();
    this.setState({
      cartNum: cartNum
    });
  };

  render() {
    const { products } = this.state;
    if (products === null) {
      return <div></div>
    }

    return (
      // route back to homepage
      <Container fluid={true} className="pt-2">
        {/* <div>
        <a href="http://localhost:3000/">
          <Image src="/images/ez_buy_logo.jpg" className="ezBuyIcon" />
        </a>
      </div> */}
        <HomeButton />

        <MyNavbar cartNum={this.state.cartNum}/>

        
        <Row>
          <Col md='auto'>
            <div classNane="radio-buttons">
              <Filter />
            </div>
          </Col>
          <Col>
            <div className="products">
              {
                products.map(p => <Products productDetail={p} updateCartNum={this.updateCartNum}/>)
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