import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';


class HomeButton extends Component {
    render() {
        return (
            <div>
                {/* TODO: change link */}
                <a href="http://localhost:3000/">
                    <Image src="./images/ez_buy_logo.jpg" className="ezBuyIcon" />
                </a>
            </div>
        );
    }
}

export default HomeButton;