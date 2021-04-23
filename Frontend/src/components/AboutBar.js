import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AboutBar.scss'
class AboutBar extends Component {
    render() {
        return (
            <Nav className="justify-content-center bg-dark about-bar" activeKey="/About">
                <Nav.Item>
                    {/* TODO: Change link */}
                    <Nav.Link href="/About">About</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default AboutBar;