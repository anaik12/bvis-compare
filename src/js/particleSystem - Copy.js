"use strict";

/* Get or create the application global variable */
var App = App || {};

var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var data = [];

    // scene graph group for the particle system
    var sceneObject = new THREE.Group();

    // bounds of the data
    var bounds = {};

    var pi = 3.147;
    var cylinder;

    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    self.drawContainment = function() {

        // get the radius and height based on the data bounds
        var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
        var height = (bounds.maxY - bounds.minY) + 1;

        // create a cylinder to contain the particle system
        //var geometry = new THREE.CylinderBufferGeometry( radius, radius, height, 32 );
        // var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
        var geometry = new THREE.BufferGeometry( radius, radius, height, 32 );
        // var material = new THREE.MeshNormalMaterial( {color: 0xffff00, wireframe: true} );
        // var cylinder = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

        // var geometry = new THREE.BufferGeometry();

        var positions = [];
        var colors = [];

        // var boundingBox = new THREE.Box3();

        var color = new THREE.Color();
        var n = 1000, n2 = n / 2;
        var material = [];      

        for(var i = 0; i< data.length; i++) {
            var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;



            positions.push( x, z, y );
        //             // colors
            var colormax = 357.19;
            var colormin = 0;

            // var cx = data[i].concentration / colormax;
            // var cy = 1.0;
            // var cz = 1.0;


            // var cx = 0.9;
            // var cy = 1 -  ( data[i].concentration / colormax ) *4;
            // var cz = 0.9;

            // var cx = Math.random();
            // var cy = Math.random();
            // var cz = Math.random();
        

            var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}];
            // {r:1.0, g:0.5, b:0.5}, {r:0.5, g:1.0, b:0.5}];
            var colorindex= Math.floor(Math.random() * 3);
            var cx = colorvalues[colorindex].r;
            var cy = colorvalues[colorindex].g;
            var cz = colorvalues[colorindex].b;
            
            
            color.setRGB( cx, cy, cz );
            colors.push( color.r, color.g, color.b );

        // geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

        }



    // geometry.colorsNeedUpdate(true);
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
      
    var sprite = new THREE.TextureLoader().load( 'data/disc.png' );

     var fill = ["red", "blue", "green", "white"];

    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { color: fill[Math.floor(Math.random() * 4)], map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );

    var material = new THREE.PointsMaterial({ size:0.2, vertexColors: THREE.VertexColors});//, opacity:0.3});
    
    // var material = new THREE.ShaderMaterial( {
    // 				size:10,
				// 	uniforms: {
				// 		color: { value: new THREE.Color( 0xffffff ) },
				// 		texture: { value: new THREE.TextureLoader().load( "data/disc.png" ) }
				// 	},
				// 	vertexShader: document.getElementById( 'vertexshader' ).textContent,
				// 	fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				// 	alphaTest: 0.9
				// } );
    cylinder = new THREE.Points(geometry, material);

        // var pointCloud = new THREE.Points(geometry, material);
    // var filterbox = new THREE.PlaneGeometry( radius *2 + 2, height, 32 );
    var filterbox = new THREE.BoxGeometry( radius *1.5, height+5, 12 );

    // var material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, transparent: true, opacity:0.2} );
    var materialbox = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors, transparent: true, opacity:0.1 });
    var boundbox = new THREE.Mesh( filterbox, materialbox );
    
    sceneObject.add( boundbox );   

    var geometry2 = new THREE.BoxGeometry( radius *1.5, height+5, 12 );

	var color = new THREE.Color("rgb(100,100,0)");
	var material = new THREE.MeshPhongMaterial( {color: 0x0000ff, transparent:true, opacity: 0.1});

	var cube = new THREE.Mesh( geometry2, material );
	var edges = new THREE.EdgesGeometry( geometry2 );
	var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x4F34B8, opacity: 1.0} ) );
	sceneObject.add( line );
    // var edges2 = new THREE.EdgesGeometry( boundbox );
	// var line3 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xdf65b0, opacity: 1.0} ) );

    // var helper = new THREE.BoxHelper(plane, 0xff0000);
    // // helper.update();
    // // // If you want a visible bounding box
    // var helpermesh = new THREE.Mesh(helper, material);
    // sceneObject.add(helper);

    // var boundboxborder = new THREE.Box3();

    // boundboxborder.setFromObject(boundbox);

    // sceneObject.add(boundboxborder);
 
    var slider = document.getElementById("slider");
    slider.addEventListener("input", movePlane);

    var button = document.getElementById("Reset");

    button.onclick = function (){
        sceneObject.remove(cylinder); 
        sceneObject.remove(plane);  
        positions = [];
        colors = [];
        var color = new THREE.Color();
        var n = 1000, n2 = n / 2;
        var material = [];    
        var geometry = new THREE.BufferGeometry( radius, radius, height, 32 );
        // console.log(data);
        for(var i = 0; i< data.length; i++) {
            // console.log(data);

            // if(data[i].Y > boundbox.min.z && data[i].Y < boundbox.min.z){
            // if(data[i].Y > zvalue - 1  && data[i].Y < zvalue + 1){
            // if(data[i].Y > 0){
            var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            positions.push( x, z, y );
        //             // colors
            var colormax = 357.19;
            var colormin = 0;
    
            var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}];
            // {r:1.0, g:0.5, b:0.5}, {r:0.5, g:1.0, b:0.5}];
            var colorindex= Math.floor(Math.random() * 3);
            var cx = colorvalues[colorindex].r;
            var cy = colorvalues[colorindex].g;
            var cz = colorvalues[colorindex].b;
            
            
            color.setRGB( cx, cy, cz );
            colors.push( color.r, color.g, color.b );

        }

        console.log(colors);
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
        
    var material = new THREE.PointsMaterial({ size:0.2, vertexColors: THREE.VertexColors, transparent:true, opacity:0.2});//, opacity:0.3});
    
    var sprite = new THREE.TextureLoader().load( 'data/disc.png' );

    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
     var fill = ["red", "blue", "green", "white"];

    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { color: fill[Math.floor(Math.random() * 4)], map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    
    // var material = new THREE.ShaderMaterial( {
				// 	uniforms: {
				// 		size:10,
				// 		color: { value: new THREE.Color( 0xffffff ) },
				// 		texture: { value: new THREE.TextureLoader().load( "data/disc.png" ) }
				// 	},
				// 	vertexShader: document.getElementById( 'vertexshader' ).textContent,
				// 	fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				// 	alphaTest: 0.9
				// } );

    var cylinder = new THREE.Points(geometry, material);
    sceneObject.add(cylinder);
    }

    var planeG = new THREE.PlaneGeometry(17, 17);
	var imgMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
	map: new THREE.TextureLoader().load('brainImg.png'), side: THREE.DoubleSide});
	var plane = new THREE.Mesh(planeG, imgMaterial);
	plane.overdraw = true;
	sceneObject.add(plane);


    sceneObject.add(cylinder);
    // sceneObject.add(pointCloud);

    function movePlane(e){
    var target = (e.target) ? e.target : e.srcElement;
        plane.position.z = target.value;
        // helper.update();
        // boundbox.setFromObject(plane);

        //console.log(boundbox.min.z, boundbox.max.z );
        updatecylinder(radius, height, (parseFloat(plane.position.z)).toFixed(2));
        // helper.position.z = target.value;
        // console.log("Z value: ", plane.position.z );
        var d3canvas = new d3Canvas();
        d3canvas.clearCanvas((parseFloat(plane.position.z)).toFixed(2));
        // d3canvas.zvalueslider = plane.position.z;
        // line2.position.z = target.value;    
    }   // add the containment to the scene
    
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    // helper.containsPoint(cylinder);
    function updatecylinder(radius, height, zvalue){
        sceneObject.remove(cylinder);
        positions = [];
        colors = [];
        var color = new THREE.Color();
        var n = 1000, n2 = n / 2;
        var material = [];    
        var geometry = new THREE.BufferGeometry( radius, radius, height, 32 );
        // console.log(data);
        for(var i = 0; i< data.length; i++) {
            // console.log(data);

            // if(data[i].Y > boundbox.min.z && data[i].Y < boundbox.min.z){
            // if(data[i].Y > zvalue - 1  && data[i].Y < zvalue + 1){
            // if(data[i].Y > 0){
            var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            positions.push( x, z, y );
        //             // colors
            var colormax = 357.19;
            var colormin = 0;
            if(data[i].Y > zvalue - 1  && data[i].Y < zvalue + 1){

            // var cx = 1 - data[i].concentration / colormax;
            // var cy = 0 ;
            // var cz = 1;

          var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}];
            // {r:1.0, g:0.5, b:0.5}, {r:0.5, g:1.0, b:0.5}];
            var colorindex= Math.floor(Math.random() * 3);
            var cx = colorvalues[colorindex].r;
            var cy = colorvalues[colorindex].g;
            var cz = colorvalues[colorindex].b;

            color.setRGB( cx, cy, cz );
            colors.push( color.r, color.g, color.b );
        }
        else {

            var cx = 0.8;
            var cy = 0.8;
            var cz = 0.8;

            // var fill = ["red", "blue", "green", "white"];
            var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}];
            // {r:1.0, g:0.5, b:0.5}, {r:0.5, g:1.0, b:0.5}];
            var colorindex= Math.floor(Math.random() * 3);
            // ,{r:0.5, g:0.5, b:0.1},
            // {r:0.0, g:0.0, b:0.5},{r:0.5, g:0.0, b:0.0},{r:0.0, g:0.0, b:0.5},{r:0.5, g:0.5, b:0.5}]
            // var colorindex= Math.floor(Math.random() * 5);
            // var cx = colorvalues[colorindex].r;
            // var cy = colorvalues[colorindex].g;
            // var cz = colorvalues[colorindex].b;
            
            color.setRGB( cx, cy, cz );
            colors.push( color.r, color.g, color.b );

        }
        // geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

        }
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
        
    var material = new THREE.PointsMaterial({ size:0.2, vertexColors: THREE.VertexColors});//, opacity:0.3});
    
    var sprite = new THREE.TextureLoader().load( 'data/disc.png' );

    var fill = ["red", "blue", "green", "white"];

    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { color: fill[Math.floor(Math.random() * 4)], map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { vertexColors: THREE.VertexColors, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    
    // var material = new THREE.ShaderMaterial( {
    // 				size:10,
				// 	uniforms: {
				// 		color: { value: new THREE.Color( 0xffffff ) },
				// 		texture: { value: new THREE.TextureLoader().load( "data/disc.png" ) }
				// 	},
				// 	vertexShader: document.getElementById( 'vertexshader' ).textContent,
				// 	fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				// 	alphaTest: 0.9
				// } );
    var cylinder = new THREE.Points(geometry, material);
    sceneObject.add(cylinder);

    }


    };

    // creates the particle system
    self.createParticleSystem = function() {
        // console.log(data);
        // use self.data to create the particle systemss

        // var tmaterial = new THREE.PointsMaterial({
        //  color: 0xff0000,
        // size: 5,
        // opacity: 1
        // });

        // var tgeometry = new THREE.Geometry();
    // var pointCloud = new THREE.Points(tgeometry, tmaterial);
    
    };

    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2);

                // add the element to the data collection
                data.push({
                    // concentration density
                    concentration: Number(d.concentration),
                    // Position
                    X: Number(d.Points0),
                    Y: Number(d.Points1),
                    Z: Number(d.Points2),
                    // Velocity
                    U: Number(d.velocity0),
                    V: Number(d.velocity1),
                    W: Number(d.velocity2)
                });
				// console.log(data);
            })
            // when done loading
            .get(function(error, rows, data) {
				//console.log("d is ", rowa.values );
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
                // console.log(data);
                self.drawContainment();

                // create the particle system
                self.createParticleSystem();
            });
            // console.log(data);
			
    };
	
    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        }
    };
	
	// console.log("final",self.data);

    return publiclyAvailable;

};