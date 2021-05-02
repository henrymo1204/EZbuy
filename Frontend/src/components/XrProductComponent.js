import * as AFRAME from 'aframe';
import * as BABYLON from 'babylonjs';

AFRAME.registerComponent('product-scene', {
    schema: {
        event: { type: 'string', default: '' },
        srcObjectURL: { type: 'string', default: '' }
    },

    init: function () {
        // Closure to access fresh `this.data` from event handler context.
        var self = this;

        // .init() is a good place to set up initial state and variables.
        // Store a reference to the handler so we can later remove it.
        this.eventHandlerFn = function () {

            // var scene = new BABYLON.Scene(engine);

            var raw_content = BABYLON.Tools.DecodeBase64(this.data.srcObjectURL);
            var blob = new Blob([raw_content]);
            var url = URL.createObjectURL(blob);
            // BABYLON.SceneLoader.Append("", url, scene, function () {
            //     scene.createDefaultCamera(true, true, true);
            // }, undefined, undefined, ".glb");

            // return scene;
        };
    },

    update: function (oldData) {
        var data = this.data;  // Component property values.
        var el = this.el;  // Reference to the component's entity.

        if (Object.keys(oldData).length === 0) { return; }

        // `event` updated. Remove the previous event listener if it exists.
        if (oldData.event && data.event !== oldData.event) {
            el.removeEventListener(oldData.event, this.eventHandlerFn);
        }

        if (data.event) {
            el.addEventListener(data.event, this.eventHandlerFn);
        } else {
            console.log(data.srcObjectURL);
        }
    }
});