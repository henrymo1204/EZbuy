import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import '../css/product/ProductItemDetail.scss';

const ProductDetailItemCarousel = (image) => {

  const srcImage = image.image

    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-flex w-100 h-100"
            src={srcImage}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    )
}

export default ProductDetailItemCarousel;