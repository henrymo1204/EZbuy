// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, {useEffect} from 'react';

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
import image1 from "../src/images/2.jpg";
import image2 from "../src/images/3.jpg";
import image3 from "../src/images/4.jpg";
import image4 from "../src/images/5.jpg";
import axios from './components/commons/appState';

const App = props => {

  useEffect(async () => {
    await global.appState.updateLocalCartNum();
    console.log("test");
    // this.forceUpdate();
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

  // const ads = [
  //   {productName:'name', productDescription:'description', imageurl:image1, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image2, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image3, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image4, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image2, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image4, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image3, productURL: 'productURL', timeLeft: "24 hrs"},
  //   {productName:'name', productDescription:'description', imageurl:image1, productURL: 'productURL', timeLeft: "24 hrs"}
  // ]

    const ads = global.appState.getRandomProducts();
    
    if (ads === null) {
      global.appState.setRandomProducts();
      const ads = global.appState.getRandomProducts();
    }

    if (ads === null) {
      return (
        <div></div>
      )
    }

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
                  ads.map((ad, index) => <Advertisement><ContentCard adDetail={ad} key={index} attributes="advertisement"/></Advertisement>)
                }
                {/* <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement>
                <Advertisement><ContentCard imageurl={"/images/model.jpg"} timeleft="3 hours" /></Advertisement> */}
              </Carousel>
            </div>
          </Row>

          {/* <Row>
            <Col className="3D-adv">
              <ContentCard header="Featured" imageurl={"/images/WebXR_Banner.png"} producturl={"3dviewer"} timeleft="2 days"/>
            </Col>
          </Row> */}
          {/* {<br></br>} */}
          {/* <div className="home-page-slider">
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
          </div> */}

        {/* {<br></br>}
        {<br></br>}
        {<br></br>} */}

      </PageTemplate>
    );
}


export default App;
