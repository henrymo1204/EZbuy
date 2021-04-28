// This component class uses cards which can be found here 
//https://react-bootstrap.github.io/components/cards/

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';

const ContentCard = (props) => {

    const productName = props.adDetail['productName'];
    const productDescription = props.adDetail['productDescription'];
    const imageurl = props.adDetail['imageurl'];
    const timeLeft = props.adDetail['timeLeft'];
    const productURL = props.adDetail['productURL']; 

    return (
        // <Card className={"text-center " + props.attributes}>
        //     <Card.Header>{productName}</Card.Header>
        //     <Card.Img variant="top" src={imageurl} />
        //     <Card.Body>
        //         <Card.Text>{productDescription}</Card.Text>
        //         <Button variant="primary" href={productURL}>Go to product</Button>
        //     </Card.Body>
        //     <Card.Footer className="text-muted">{timeLeft}</Card.Footer>
        // </Card>

        <Card className={"text-center " + props.attributes}>
            <Card.Img variant="top" src={imageurl} className="ad-image"/>
            <Card.Body>
                <Card.Title className="ad-detail">{productName}</Card.Title>
                <Card.Text className="ad-detail">{productDescription}</Card.Text>
                <Card.Text className="ad-detail">{timeLeft}</Card.Text>
                <Nav.Link className="ad-detail">
                    <i class="far fa-hand-point-right"></i>
                    <span> Buy Now</span>
                </Nav.Link>  
            </Card.Body>
        </Card>
    );
};

export default ContentCard;