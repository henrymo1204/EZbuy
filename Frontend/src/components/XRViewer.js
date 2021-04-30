// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//

//React elements
import React from 'react';
import { Component } from 'react';

//Import A-Frame library for viewing XR content in browser
import 'aframe';

class XRViwer extends Component {

    render() {
        return (
            <a-scene className="aframebox" embedded>
                <a-box
                    position="-1 0.5 -3"
                    rotation="0 45 0"
                    color="#4CC3D9" />
                <a-sphere
                    position="0 1.25 -5"
                    radius="1.25"
                    color="#EF2D5E" />
                <a-cylinder
                    position="1 0.75 -3"
                    radius="0.5"
                    height="1.5"
                    color="#FFC65D" />
                <a-plane
                    position="0 0 -4"
                    rotation="-90 0 0"
                    width="4"
                    height="4"
                    color="#7BC8A4" />
                <a-dodecahedron
                    color="#FF926B"
                    radius="5"
                    position="0 -1 -30"></a-dodecahedron>
                {/* <a-sky src={require('./360_photo_sample.jpg')} /> */}
            </a-scene>
        );
    }
}


export default XRViwer;