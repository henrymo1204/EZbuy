import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import '../css/home.scss'


class HomeButton extends Component {
    render() {
        return (
            <div className="home-button-container">
                {/* TODO: change link */}
                <a href="https://ezbuy.site/">
                    <Image src="./images/ez_buy_logo.jpg" className="ezBuyIcon" />
                </a>
            </div>
        );
    }
}

export default HomeButton;