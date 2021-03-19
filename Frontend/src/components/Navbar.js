import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Panel from './commons/Panel'
import UserProfile from './account/UserProfile'

<<<<<<< HEAD
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

    const toProfile = () => {
        Panel.open({
          component: UserProfile,
          props: {
            user: props.user
          },
          callback: data => {
            props.history.go(0);
          }
        });
    };

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
            <div className="end">
                <Nav className="mr-auto2">
                    {props.user.username ? (
                        <Nav.Link className="username" href=""onClick={toProfile}>
                        {/* <i className="far fa-user"></i> */}
                        {"Hi, " + props.user.username}
                        </Nav.Link>
                    ) : (
                        <Nav.Link href="login">Login</Nav.Link>
                    )}
=======
class MyNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* TODO: change link */}
                    <Nav.Link href="allproducts">All Products</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <Nav className="mr-auto2">
                    {/* TODO: change link */}
                    <Nav.Link href="login">Login</Nav.Link>
>>>>>>> development
                    <Nav.Link href="cart">Cart</Nav.Link>
                </Nav>
            </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(MyNavBar);