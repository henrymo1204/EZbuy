// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

//Import components
import Products from './Products';

//Import render styling from react bootstrap
import Badge from 'react-bootstrap/Badge';
import { Jumbotron } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import ProductDetailItemCarousel from './ProductDetailItemCarousel';
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import '../css/product/ProductItemDetail.scss';

class ProductDetailItem extends Component {

    constructor(props) {
        super(props);
        this.state = { products: null };
    }

    componentDidMount() {
        const productID = window.location.search.slice(11);

        axios.get(`/products/${productID}`).then((res) => {
            this.setState({ products: res.data['product'][0] })
        })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { products } = this.state;
        console.log(products);
        if (products === null) {
            return <div></div>
        }

        return (
            <PageTemplate>
                <Row className="product-container">
                    <Col className="product-control">
                        <div className="product_detail">
                            <Card className="product-detail-card box-detail">
                                <ProductDetailItemCarousel />
                                <Card.Body>
                                    <Card.Title className="product_detail">{products.productName}</Card.Title>
                                    <Card.Text id="productDescription">{products.productDescription}</Card.Text>
                                    <Card.Text id="price">{products.price}</Card.Text>
                                    <Button variant="primary">Add to cart</Button>
                                </Card.Body>
                            </Card>

                            <Card className="product-detail-card box-detail">
                                <Card.Body>
                                    <a-scene class="aframebox" embedded>
                                        <a-box
                                            position="-1 0.5 -3"
                                            rotation="0 45 0"
                                            color="#4CC3D9" />
                                        <a-sphere
                                            position="0 1.25 -5"
                                            radius="1.25"
                                            color="#EF2D5E" />
                                        <a-cylinder
                                            position="1 0.75 -3"
                                            radius="0.5"
                                            height="1.5"
                                            color="#FFC65D" />
                                        <a-plane
                                            position="0 0 -4"
                                            rotation="-90 0 0"
                                            width="4"
                                            height="4"
                                            color="#7BC8A4" />
                                        <a-dodecahedron
                                            color="#FF926B"
                                            radius="5"
                                            position="0 -1 -30"></a-dodecahedron>
                                        {/* <a-sky src={require('./360_photo_sample.jpg')} /> */}
                                    </a-scene>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </PageTemplate >
        );
    }
}

export default ProductDetailItem;
