// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import Button from 'react-bootstrap/Button';

import React, {useEffect} from 'react';

//Import components
import PageTemplate from './components/PageTemplate'
import ContentCard from './components/ContentCard';

//Import render styling from react bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './App.scss';

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

const App = props => {

  useEffect(async () => {
    await global.appState.updateLocalCartNum();
    // this.forceUpdate();
  }, []);

    return (
      <PageTemplate>

        {<br></br>}
        <Container fluid={true}>
          <Row>
            <Col>
            {/* Change product urls */}
              <ContentCard header="Featured" imageurl={"/images/WebXR_Banner.png"} producturl={"3dviewer"} timeleft="2 days"/>
            </Col>
          </Row>
          {<br></br>}
          <Row>
            <Col>
              <ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" />
            </Col>
            <Col>
              <ContentCard imageurl={"/images/model.jpg"} timeleft="1 day"/>
            </Col>
            <Col>
              <ContentCard imageurl={"/images/model.jpg"} timeleft="4 hours"/>
            </Col>
          </Row>
        </Container>

        {<br></br>}
        {<br></br>}
        {<br></br>}

      </PageTemplate>
    );
}


export default App;
