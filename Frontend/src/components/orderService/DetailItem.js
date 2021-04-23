
// import axios from 'commons/axios';
// import { formatPrice } from 'commons/helper';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageTemplate from '../PageTemplate';

const DetailItem = () => {
  return (
    <PageTemplate>
      <section>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/number-1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </section>


    </PageTemplate>

  );
};

export default DetailItem;


