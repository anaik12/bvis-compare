"use strict";

/* Get or create the application global variable */
var App = App || {};

/* Create the scene class */
var Scene = function(options) {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // scale the width and height to the screen size
    var width = d3.select('.particleDiv').node().clientWidth;
    var height = width * 0.85;
    var rotateX = new THREE.Matrix4().makeRotationY( 0.005 );
    var rotateY = new THREE.Matrix4().makeRotationY( 0.005 );
    // var height = width;

    // create the scene
    self.scene = new THREE.Scene();

    //adding orbit controls
    
    // setup the camera
    self.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    // self.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 20);
    console.log("20");
    self.camera.position.set(0,2,20);
    self.camera.lookAt(0,0,0);

    // Add a directional light to show off the objects
    var light = new THREE.DirectionalLight( 0xffffff, 1.5);
    // Position the light out from the scene, pointing at the origin
    light.position.set(0,2,20);
    light.lookAt(0,0,0);

    // add the light to the camera and the camera to the scene
    self.camera.add(light);
    self.scene.add(self.camera);

    // create the renderer
    self.renderer = new THREE.WebGLRenderer();

    self.renderer.setClearColor( 0x1c1717, 1 );

    // set the size and append it to the document
    self.renderer.setSize( width, height );
    document.getElementById(options.container).appendChild( self.renderer.domElement );
//          };

    var controls = new THREE.OrbitControls(self.camera, self.renderer.domElement );
    /* add the checkboard floor to the scene */

    self.public =  {

        resize: function() {

        },

        addObject: function(obj) {
            self.scene.add( obj );
        },

        removeObject: function(obj) {
            self.scene.remove( obj );
        },

        render: function() {
            requestAnimationFrame( self.public.render );
            controls.update();
            // self.camera.applyMatrix( rotateX );
            // self.camera.applyMatrix( rotateY );
            // self.camera.updateMatrixWorld();

            self.renderer.render( self.scene, self.camera );

            // var raycaster = new THREE.Raycaster();

            // // var camera = new Scene();

            // raycaster.setFromCamera( plane, self.camera );

            // var intersects = raycaster.intersectObject( mesh );

            // console.log(intersects);
        }

    };

    return self.public;
};

