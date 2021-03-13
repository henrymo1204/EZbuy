import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import "../../css/account/Logout.scss"

class Logout extends React.Component {
    render () {
        return (
            <div class="container">
            <div class="register-wrapper">
                <div className="text-center" id="title">Logout?</div>
                <Row className="justify-content-center">
                    <Nav.Link href="/"><Button className="button">YES</Button></Nav.Link>
                    <Nav.Link href="/"><Button className="button">NO</Button></Nav.Link>
                </Row>
            </div>
</div>
        );
    }
}

export default Logout;