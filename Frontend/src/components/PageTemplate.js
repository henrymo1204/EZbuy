/*************************************************************
                   Layout component
    This is the template include Header and fooder
*************************************************************/
import React, {useEffect } from 'react';

//Import components
import MyNavbar from './Navbar';
import HomeButton from './HomeButton';
import AboutBar from './AboutBar';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import { withRouter } from 'react-router-dom';

import '../css/common/PageTemplate.scss';

const PageTemplate = props => {

  useEffect(() => {
    global.appState.updateLocalCartNum();
  });

  return (
    <Container fluid={true} className="page-wrapper">  
      <HomeButton className="page-home"/>
      <MyNavbar className="page-nav"/>
      {props.children}
      <AboutBar className="page-about"/>
    </Container>
  );
}

export default withRouter(PageTemplate);