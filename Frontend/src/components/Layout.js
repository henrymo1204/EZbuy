/*************************************************************
                   Layout component
    This is the template include Header and fooder
*************************************************************/
import React from 'react';


//Import components
import MyNavbar from './Navbar';
import HomeButton from './HomeButton';
import AboutBar from './AboutBar';


//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import { withRouter } from 'react-router-dom';

const welcome = {
  greeting: 'Hey',
  title: 'EZBut Layout',
};


const Layout = props =>(
    <Container fluid={true} className="pt-2">
        
        <HomeButton />

        <MyNavbar />
         {props.children}
    
        <AboutBar />

      </Container>
)

export default withRouter(Layout);