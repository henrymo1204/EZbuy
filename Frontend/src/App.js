// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, {useEffect, useState} from 'react';

//Import components
import PageTemplate from './components/PageTemplate'
import ContentCard from './components/ContentCard';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import V02 from './videos/V02.mp4'
import './App.scss';
import Carousel from "react-elastic-carousel";
import Advertisement from "./Advertisement";
// import image1 from "../src/images/2.jpg";
// import image2 from "../src/images/3.jpg";
// import image3 from "../src/images/4.jpg";
// import image4 from "../src/images/5.jpg";
// import axios from './components/commons/appState';
import "./css/home.scss"

const App = props => {

  const [ads, setADs] = useState([]);

  useEffect(async () => {
    if (global.appState.getUserID() != null) {
      await global.appState.updateLocalCartNum();
    } else {
      global.appState.setLocalCartNum(0);
    }

    if (ads.length == 0) {
      await global.appState.setRandomProducts();
      const ads = global.appState.getRandomProducts();
      setADs(ads);
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

    return (
      <PageTemplate>
          <Row>
            <Col className="home-video-container">
              <div className="home-video">
               <h1><i className="fas fa-shopping-cart"></i> Welcome to EZ Buy</h1>
                <div className="home-video-part"></div>
                <div className="color-overlay">
                <video muted autoPlay loop className="home-video">
                  <source src={V02} type="video/mp4" />
                </video>
                </div>
              </div>
             
            </Col>
          </Row>

          <Row>            
            <div className="home-page-slick">            
              <Carousel breakPoints={breakPoints}>
                {
                  ads.map((ad, index) => <Advertisement><ContentCard className="ads-card" adDetail={ad} key={index} attributes="advertisement"/></Advertisement>)
                }
              </Carousel>
            </div>
          </Row>

      </PageTemplate>
    );
}


export default App;
