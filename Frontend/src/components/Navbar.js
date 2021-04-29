import React, {Component} from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarEnd from './NavBarEnd'
import { toast } from 'react-toastify';

class MyNavbar extends Component {

    search = async () => {
        var search_key = document.getElementById('search_key').value;
        var keyword = search_key.substring(0, 10)
        if (keyword) {
            await global.appState.updateSearchResult(keyword);
            await global.appState.updateProductCatagory();
            window.location.href=`/search?keyword=` + document.getElementById('search_key').value;
        } else {
            toast.info('Please search with a keyword.');
        }
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
                    <FormControl type="text" id='search_key' placeholder="Search" className="mr-sm-2" />
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