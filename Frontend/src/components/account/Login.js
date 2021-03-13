import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import "../../css/account/Login.scss"

class Login extends React.Component {
    render () {
        return (
            <div class="container">
                <div class="login-wrapper">
                    <Form class="login-form">
                        <Nav className="justify-content-center">
                            <Nav.Link href="/" id="title">Welcome</Nav.Link>
                        </Nav>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            Email
                            </Form.Label>
                            <Col sm="10">
                        <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                        <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Nav className="justify-content-center">
                            <Nav.Link href="/" ><Button className="button">Log in</Button></Nav.Link>
                        </Nav>
                        <div className="text-center">OR</div>
                        <Nav className="justify-content-center">
                            <Nav.Link href="/register">Create account</Nav.Link>
                        </Nav>
                    </Form>
                </div>
            </div> 
        );
    }
}

export default Login;