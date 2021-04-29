import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import '../css/product/ProductItemDetail.scss';

class ProductDetailItemCarousel extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-flex w-100 h-100"
            src="https://picsum.photos/1920/1080?random=1"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100 h-100"
            src="https://picsum.photos/1920/1080?random=2"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100 h-100"
            src="https://picsum.photos/1920/1080?random=3"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    )
  }
}

export default ProductDetailItemCarousel;