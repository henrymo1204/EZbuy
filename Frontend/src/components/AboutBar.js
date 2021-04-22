import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AboutBar extends Component {
    render() {
        return (
            <Nav className="justify-content-center fixed-bottom bg-dark" activeKey="/About">
                <Nav.Item>
                    {/* TODO: Change link */}
                    <Nav.Link href="/About">About</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default AboutBar;