import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarEnd from './NavBarEnd'

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

const MyNavBar = props => {

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
            <NavBarEnd />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavBar;