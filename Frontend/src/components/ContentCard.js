// This component class uses cards which can be found here 
//https://react-bootstrap.github.io/components/cards/

import React from 'react';
import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ContentCard extends Component {

    render() {
        return (
            <Card className="text-center">
                <Card.Header>{this.props.header}</Card.Header>
                <Card.Img variant="top" src={this.props.imageurl} />
                <Card.Body>
                    <Card.Text>
                        Product description here
                    </Card.Text>
                    <Button variant="primary">Go to product</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{this.props.timeleft}</Card.Footer>
            </Card>
        );
    }
}

export default ContentCard;