// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, { Component } from 'react';

//Import components
import ProductDetailItemCarousel from './ProductDetailItemCarousel';
import PageTemplate from './PageTemplate'
// import './XRViewer';
import axios from './commons/axios';

//Import render styling from react bootstrap
import Badge from 'react-bootstrap/Badge';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button'

import '../css/product/ProductItemDetail.scss';

class ProductDetailItem extends Component {

    constructor(props) {
        super(props);
        this.state = { products: null };
    }

    componentDidMount() {
        const productID = window.location.search.slice(11);

        axios.get(`/api/v1/products/${productID}`).then((res) => {
            this.setState({ products: res.data['product'][0] })
        })
            .catch((error) => {
                console.log(error);
            });
    }

    updatePage = () => {
        this.forceUpdate();
    }

    render() {
        const { products } = this.state;

        if (products === null) {
            return (<div></div>);
        }
        return (
            <PageTemplate>
                <Row className="product-container">
                    <Col className="product-control">
                        <div className="product_detail">
                            <Card className="product-detail-card box-detail">
                                <ProductDetailItemCarousel image={products.productImage} />
                                <Card.Body>
                                    <Card.Title className="product_detail">{products.productDetail}</Card.Title>
                                    <Card.Text id="productDescription">{products.productDescription}</Card.Text>
                                    <Card.Text id="price">{products.price}</Card.Text>
                                    <Button variant="primary">Add to cart</Button>
                                </Card.Body>
                            </Card>

                            <Card className="product-detail-card box-detail">
                                <Card.Title>3D Product Viewer</Card.Title>
                                <Card.Body>
                                    <a-scene embedded>
                                        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                                        <a-gltf-model id="model" src={products.product3DImage}></a-gltf-model>
                                        <a-sky color="#ECECEC"></a-sky>
                                        <a-camera position="0 1 4"></a-camera>
                                    </a-scene>
                                </Card.Body>
                            </Card>
                            <Card className="product-detail-card box-detail">
                                <Card.Body>
                                    <Card.Link href={`/allproducts?shopID=${products.shopID}`}>{products.shopName}</Card.Link>
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
