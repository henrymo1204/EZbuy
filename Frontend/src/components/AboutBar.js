import React, { Component } from 'react';
import {Nav, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AboutBar.scss'
class AboutBar extends Component {
    render() {
        return (
            <div className="justify-content-center about-bar">
                <Row className="about-bar-row">
                    <Col className="about-bar-about">About</Col>
                </Row>
                <Row className="about-bar-row">
                    <Col className="about-bar-project">
                        <div>Class: CPSC 462</div>
                        <div>Project: EZ Buy</div>
                        <div>Professor: Dr. Lidia Morrison</div>
                    </Col>
                    <Col className="about-bar-team">
                        <div>Team Members</div>
                        <div>Ying Luo</div>
                        <div>Gabriel Magallanes</div>
                        <div>Juheng Mo</div>
                        <div>Mohammad Mirwais</div>
                    </Col>
                </Row>
                {/* <Row className="about-bar-row">
                    <Col className="about-bar-professor">Professor: Dr. Lidia Morrison</Col>
                </Row>
                <Row className="about-bar-row">
                    <Col className="about-bar-team">Team Members: </Col>
                    <Col className="about-bar-team">Gabriel Magallanes</Col>
                    <Col className="about-bar-team">Ying Luo </Col>
                    <Col className="about-bar-team">Juheng Mo </Col>
                    <Col className="about-bar-team">Mohammad Mirwais </Col>
                </Row> */}
 
            </div>
        );
    }
}

export default AboutBar;