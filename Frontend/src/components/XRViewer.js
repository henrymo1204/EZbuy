// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//

//React elements
import React, { Component } from 'react';

//Import A-Frame library for viewing XR content in browser
import 'aframe';

const XRViewer = (prop) => {

    const srcObjectURL = prop.prop

    var sceneEl = document.querySelector('a-scene');

    var entityEl = document.createElement('a-entity');
    sceneEl.appendChild(entityEl);
    entityEl.setAttribute('gltf-model', srcObjectURL);
        
    return (
        <a-scene embedded>
        </a-scene>
    );
}

export default XRViewer;


