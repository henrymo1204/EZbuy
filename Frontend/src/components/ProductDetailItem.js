// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, { Component } from 'react';
import 'aframe';

//Import components
import ProductDetailItemCarousel from './ProductDetailItemCarousel';
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

//Import render styling from react bootstrap
import Badge from 'react-bootstrap/Badge';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ButtonGroup, Card, CardColumns } from "react-bootstrap";
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
                            {/* <CardColumns> */}
                            <Card border="primary" className="text-center" style={{ height: "fit-content", padding: "1rem"}}>
                                <Card.Img className="card-img" variant="top" src={products.productImage} />
                                <Card.Body>
                                    <Card.Title>{products.productName}</Card.Title>
                                    <Card.Text>{products.productDescription}</Card.Text>
                                    <Card.Text>${products.productPrice}</Card.Text>
                                </Card.Body>
                                <br />
                                <Card.Body>
                                    <ButtonGroup vertical>
                                        <Button variant="primary">Add to cart</Button>
                                        <br />
                                        <Button href={`/allproducts?shopID=${products.shopID}`} style={{ width: "auto" }} variant="info">{products.shopName}</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>

                            <Card border="success" className="product-detail-card box-detail">
                                <Card.Title>3D Product Viewer</Card.Title>
                                <Card.Body>
                                    <a-scene embedded>
                                        <a-assets>
                                            <a-asset-item id="model" src={products.product3DImage}></a-asset-item>
                                        </a-assets>

                                        <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>
                                        <a-gltf-model src="#model"></a-gltf-model>
                                        <a-sky color="#ECECEC"></a-sky>
                                        <a-camera position="0 1 4"></a-camera>
                                    </a-scene>
                                </Card.Body>
                            </Card>
                            {/* </CardColumns> */}
                        </div>
                    </Col>
                </Row>
            </PageTemplate >
        );
    }
}


export default ProductDetailItem;
