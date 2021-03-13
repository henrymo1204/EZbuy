import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import "../../css/account/Register.scss"

class Register extends React.Component {
    render () {
        return (
            <div class="container">
            <div class="register-wrapper">
                <Form class="register-form">
                    <Form.Group className="register-title">
                            <Form.Label as={Row} className="justify-content-center">Account</Form.Label>
                            <Form.Label as={Row} className="justify-content-center">Registration</Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">Username</Form.Label>
                        <Col sm="10">
                            <Form.Control type="username" placeholder="Username" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">Email</Form.Label>
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

                    <fieldset>
                        <Form.Group as={Row} className="justify-content-center">
                        <Form.Label as="legend" column sm={5}>
                            Register as:
                        </Form.Label>
                        <Col>
                            <Form.Check
                            type="radio"
                            label="Seller"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            />
                            <Form.Check
                            type="radio"
                            label="Buyer"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            />
                        </Col>
                        </Form.Group>
                    </fieldset>
                    
                    <Nav className="justify-content-center">
                        <Nav.Link href="/login"><Button className="button">Register</Button></Nav.Link>
                    </Nav>

                    <Form.Group>
                        <Form.Text className="text-center">Already have an account?</Form.Text>
                        <Nav className="justify-content-center">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Form.Group>
                
                </Form>
            </div>
</div>
        );
    }
}

export default Register;