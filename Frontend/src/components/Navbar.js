import React, {Component} from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarEnd from './NavBarEnd'
//***********************************************************************************//
//Change the Navbar.js by Ying cuz make the cart botton and  login botton to Component
//***********************************************************************************//

// class MyNavbar extends Component {
//     render() {
//         return (
//             <Navbar bg="light" expand="lg">
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="mr-auto">
//                     <Nav.Link href="#link">All Products</Nav.Link>
//                 </Nav>
//                 <Form inline>
//                     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//                     <Button variant="outline-success">Search</Button>
//                 </Form>
//                 <Nav className="mr-auto2">
//                     <Nav.Link href="login">Login</Nav.Link>
//                     <Nav.Link href="cart">Cart</Nav.Link>
//                 </Nav>
//                 </Navbar.Collapse>
//             </Navbar>
//         );
//     }
// }

class MyNavbar extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#link">All Products</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                {/* extract login and cart button to a separate component */}
                <NavBarEnd cartNum={this.props.cartNum}/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default MyNavbar;