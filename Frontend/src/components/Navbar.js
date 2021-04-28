import React, {Component} from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarEnd from './NavBarEnd'

class MyNavbar extends Component {

    search = () => {
        window.location.href=`/search?keyword=` + document.getElementById('text1').value;
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/allproducts">All Products</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" id='text1' placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" onClick={this.search}>Search</Button>
                </Form>
                {/* extract login and cart button to a separate component */}
                <NavBarEnd />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default MyNavbar;