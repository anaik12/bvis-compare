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
        // var radius = (bounds.maxX - bounds.minX)/2.0 + 2;
        var radius = (bounds.maxX - bounds.minX)/2.0;
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

        var totalcount = 0;
        var zero = 0;
            var one = 0;
            var two = 0;
            var three = 0;
            var four = 0;

         var buttoncomm0 = document.getElementById("comm0");
         var buttoncomm1 = document.getElementById("comm1");
         var buttoncomm2 = document.getElementById("comm2");
         var buttoncomm3 = document.getElementById("comm3");

         buttoncomm0.onclick = function(){
         	sceneObject.remove(cylinder); 
        	sceneObject.remove(plane);
        	totalcount = zero = one = two = three = four = 0;
         	// var particleSystem = new ParticleSystem();
       		// this.initialize('data/014_new.csv', "comm0");
       		self.loadData('data/014_new.csv', "comm0");
         }

         buttoncomm1.onclick = function(){
         	sceneObject.remove(cylinder); 
        	sceneObject.remove(plane);
        	totalcount = zero = one = two = three = four = 0;
         	// var particleSystem = new ParticleSystem();
       		// this.initialize('data/014_new.csv', "comm1");
       		self.loadData('data/014_new.csv', "comm1");
         }

         buttoncomm2.onclick = function(){
         	sceneObject.remove(cylinder); 
        	sceneObject.remove(plane);
        	totalcount = zero = one = two = three = four = 0;
         	// var particleSystem = new ParticleSystem();
       		// this.initialize('data/014_new.csv', "comm2");
       		self.loadData('data/014_new.csv', "comm2");
         }

         buttoncomm3.onclick = function(){
         	sceneObject.remove(cylinder); 
        	sceneObject.remove(plane);

        	totalcount = zero = one = two = three = four = 0;
         	// var particleSystem = new ParticleSystem();
       		// this.initialize('data/014_new.csv', "comm3");
       		self.loadData('data/014_new.csv', "comm3");
         }

            

        var buttonred = document.getElementById("red");
            var buttongreen = document.getElementById("green");
            var buttonblue = document.getElementById("blue");
            var buttonwhite = document.getElementById("white");
            var buttoncyan = document.getElementById("cyan");
            var buttonall = document.getElementById("all");

            var rednumber = document.getElementById("rednumber");
            var greennumber = document.getElementById("greennumber");
            var bluenumber = document.getElementById("bluenumber");
            var whitenumber = document.getElementById("whitenumber");
            var cyannumber = document.getElementById("cyannumber");
            var allnumber = document.getElementById("allnumber");
            // console.log(rednumber.text);
            // rednumber.text = "12345";
            // console.log(rednumber.text);

            var red = true;
            var green = true;
            var blue = true;
            var all = true;

            // reset(radius,height,red,green,blue,all);

            buttonred.onclick= function (){
                sceneObject.remove(cylinder); 
                sceneObject.remove(plane);
                red =! red;
                // green =false;
                // blue = false;
                // all = false;
                reset(radius,height,red,green,blue,all);

            }

            buttongreen.onclick= function (){
                sceneObject.remove(cylinder); 
                sceneObject.remove(plane);
                // red = false;
                green =! green;
                // blue = false;
                // all = false;
                reset(radius,height,red,green,blue,all);
            }

            buttonblue.onclick= function (){
                sceneObject.remove(cylinder); 
                sceneObject.remove(plane);
                // red = false;
                // green = false;
                blue =! blue;
                // all = false;
                reset(radius,height,red,green,blue,all);
            }

             buttonall.onclick= function (){
                sceneObject.remove(cylinder); 
                sceneObject.remove(plane);
                red = true;
                green = true;
                blue = true;
                all = true;
                totalcount = zero = one = two = three = four = 0;
                reset(radius,height,red,green,blue,all);

            }




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

            
            var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}, {r:1.0, g:1.0, b:1.0}, {r:0.0, g:1.0, b:1.0}];
       
            // if(data[i].concentration == 0 && (red == true|| all==true)){
            if(data[i].concentration <= 7000 && (red == true|| all==true)){
            var cx = colorvalues[0].r;
            var cy = colorvalues[0].g;
            var cz = colorvalues[0].b;
            zero = zero + 1;
            }
            else
             // if(data[i].concentration == 1 && (green == true|| all==true)){
             if(data[i].concentration > 7000 && data[i].concentration <= 9000 && (green == true|| all==true)){
            var cx = colorvalues[1].r;
            var cy = colorvalues[1].g;
            var cz = colorvalues[1].b;
            one = one + 1;
            }
            else 
            // if(data[i].concentration == 2 && (blue == true|| all==true)){
            if(data[i].concentration > 9000 && data[i].concentration <= 11000 && (blue == true|| all==true)){
            var cx = colorvalues[2].r;
            var cy = colorvalues[2].g;
            var cz = colorvalues[2].b;
            two = two + 1;
            }
            else 
            // if(data[i].concentration == 3){
            if(data[i].concentration > 11000 && data[i].concentration <= 13000){
            var cx = colorvalues[3].r;
            var cy = colorvalues[3].g;
            var cz = colorvalues[3].b;
            three = three + 1;
            }
            else 
            // if(data[i].concentration == 4)if(data[i].concentration == 4){{
            if(data[i].concentration > 13000){
            var cx = colorvalues[4].r;
            var cy = colorvalues[4].g;
            var cz = colorvalues[4].b;

            four = four + 1;
            }
            else{
                var cx = 0.3;
                var cy = 0.3;
                var cz = 0;
            }
            
            
            color.setRGB(cx, cy, cz);
            colors.push( color.r, color.g, color.b );

            

        // geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

        }

        console.log("0=" +zero + " 1=" + one + " 2= " + two + " 3= "  + three + " 4=" + four);



    // geometry.colorsNeedUpdate(true);
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
      
    // var sprite = new THREE.TextureLoader().load( 'data/disc.png' );

     var fill = ["red", "blue", "green", "white"];

    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { color: fill[Math.floor(Math.random() * 4)], map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
    var textureLoader = new THREE.TextureLoader();

    var sprite = textureLoader.load( 'data/disc.png');
    // var sprite = textureLoader.load( 'data/snowflake1.png' );

        

    cylinder = new THREE.Points(geometry, material);

        // var pointCloud = new THREE.Points(geometry, material);
    // var filterbox = new THREE.PlaneGeometry( radius *2 + 2, height, 32 );
    var filterbox = new THREE.BoxGeometry( radius *1.8, height+8, 12 );

    // var material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, transparent: true, opacity:0.2} );
    var materialbox = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors, transparent: true, opacity:0.1 });
    var boundbox = new THREE.Mesh( filterbox, materialbox );
    
    // sceneObject.add( boundbox );   

    var geometry2 = new THREE.BoxGeometry( radius * 1.9, height + 8, 12);

	var color = new THREE.Color("rgb(100,100,0)");
	var material = new THREE.MeshPhongMaterial( {color: 0x0000ff, transparent:true, opacity: 0.8});

	var cube = new THREE.Mesh( geometry2, material );
	var edges = new THREE.EdgesGeometry( geometry2 );
	// var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x4F34B8, opacity: 1.0} ) );
	var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00FFFF, opacity: 1.0} ) );
	sceneObject.add( line );
    // sceneObject.add(cylinder);
   
    var slider = document.getElementById("slider");
    slider.addEventListener("input", movePlane);

    // var button = document.getElementById("Reset");

    // button.onclick = function (){
    //     sceneObject.remove(cylinder); 
    //     sceneObject.remove(plane);
    //     reset(radius, height);
    // }  

    function reset(radius,height,red,green,blue,all){
        sceneObject.remove(cylinder); 
        sceneObject.remove(plane)
        positions = [];
        colors = [];
        var color = new THREE.Color();
        zero = one = two = three = four = 0;
        var n = 1000, n2 = n / 2;
        // cylinder = new THREE.Points(geometry, material);
        var material = [];    
        var geometry = new THREE.BufferGeometry( radius, radius, height, 32 );
        for(var i = 0; i< data.length; i++) {
  
            // var x = (data[i].X - 9) ;//* height + 2 * pi * radius * radius  ;
            // var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            // var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            // positions.push( x, z, y );
        //             // colors
            var colormax = 0.98;
            var colormin = 0.18;

            //for raw intensities

      		var color_cz = d3.scaleLinear()
              .domain([4715, 14015])
              .range([0.0, 1.0]);

        	//for filtered intensities
        	// var color_cz = d3.scaleLinear()
         //      .domain([-4, 68])
         //      .range([0.0, 1.0]);

            // console.log("cz_raw = " + cz);
            // console.log("cz_filtered = " + typeof(data[i].concentration));

            // var cz_val = color_cz(data[i].concentration) * 10;

            var cz_val = color_cz(data[i].concentration);

            var cx = 0.0;
            var cy = 0.5;
            var cz = cz_val;
            // if(cz_val < 0){
            // 	// cx = cz_val * -1;
            // 	console.log("cx = " + cx);
            // 	cz = 0.0;
            // }
            // else{
            // 	// var cx = 0.0;
            // 	var cz = cz_val;
            // }
            
            // console.log("cz_filtered_val = " + cz);



    
            // var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}, {r:1.0, g:1.0, b:1.0}, {r:0.0, g:1.0, b:1.0}];
            // var colorvalues = [{r:0.7, g:0.0, b:0.0},{r:0.0, g:0.7, b:0.0},{r:0.0, g:0.0, b:0.7}, {r:0.8, g:0.8, b:0.8}, {r:0.0, g:0.8, b:0.8}];
            // // {r:1.0, g:0.5, b:0.5}, {r:0.5, g:1.0, b:0.5}];
            // // var colorindex= Math.floor(Math.random() * 3);
            // // console.log(data[i].concentration);
            // if(data[i].concentration > 8000 && data[i].concentration <= 9000 && (red == true|| all==true)){
            // // console.log(typeof(data[i].concentration));
            // // console.log(typeof(7000));
            // var cx = colorvalues[0].r;
            // var cy = colorvalues[0].g;
            // var cz = colorvalues[0].b;
            // zero = zero + 1;
            // }
            // else
            //  // if(data[i].concentration == 1 && (green == true|| all==true)){
            //  if(data[i].concentration > 9000 && data[i].concentration <= 10000 && (green == true|| all==true)){
            // var cx = colorvalues[1].r;
            // var cy = colorvalues[1].g;
            // var cz = colorvalues[1].b;
            // one = one + 1;
            // }
            // else 
            // // if(data[i].concentration == 2 && (blue == true|| all==true)){
            // if(data[i].concentration > 10000 && data[i].concentration <= 11000 && (blue == true|| all==true)){
            // var cx = colorvalues[2].r;
            // var cy = colorvalues[2].g;
            // var cz = colorvalues[2].b;
            // two = two + 1;
            // }
            // else 
            // // if(data[i].concentration == 3){
            // if(data[i].concentration > 11000 && data[i].concentration <= 12000){
            // var cx = colorvalues[3].r;
            // var cy = colorvalues[3].g;
            // var cz = colorvalues[3].b;
            // three = three + 1;
            // }
            // else 
            // // if(data[i].concentration == 4)if(data[i].concentration == 4){{
            // if(data[i].concentration > 12000 && data[i].concentration <= 15000){
            // var cx = colorvalues[4].r;
            // var cy = colorvalues[4].g;
            // var cz = colorvalues[4].b;
            // // positions.push( x, z, y );
            // // var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            // // var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            // // var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            // // positions.push( x, z, y );

            // four = four + 1;
            // }
            // else{
            //     var cx = 0.3;
            //     var cy = 0.3;
            //     var cz = 0;

                
            //     // positions.push( x, z, y );
            // }
             var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            positions.push( x, z, y );
             // positions.push( x, z, y );
            
            // color.setRGB( cx, cy, cz );
            color.setHSL( cx, cy, cz );
            colors.push( color.r, color.g, color.b );

            

        // geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

        }

        console.log("0=" +zero + " 1=" + one + " 2= " + two + " 3= "  + three + " 4=" + four);
        totalcount = zero + one + two + three + four; 
        // console.log("TC = " + totalcount);
        rednumber.innerHTML = zero;
        greennumber.innerHTML = one;
        bluenumber.innerHTML = two;
        whitenumber.innerHTML = three;
        cyannumber.innerHTML = four;
        allnumber.innerHTML = totalcount;

        // console.log(document.getElementById("allnumber").innerHTML);
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
   var textureLoader = new THREE.TextureLoader();

    var sprite = textureLoader.load( 'data/disc.png');
    // var sprite = textureLoader.load( 'data/snowflake1.png' );

        
   material = new THREE.PointsMaterial({ size:0.35, map:sprite, vertexColors: THREE.VertexColors, transparent:true, opacity:0.5});//, opacity:0.3});
    
    // var sprite = new THREE.TextureLoader().load( 'data/disc.png' );
    cylinder = new THREE.Points(geometry, material);
    // var material = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 10, sizeAttenuation: false, alphaTest: 0.2, transparent: true  } );
     var fill = ["red", "blue", "green", "white"];



    // cylinder = new THREE.Points(geometry, material);
    sceneObject.add(cylinder);
    sceneObject.add(plane);
    // cylinder.rotation

    // cylinder.rotation.x += 0.01;
    // cylinder.rotation.y += 0.005;
    // plane.rotation.x += 0.01;
    // plane.rotation.y += 0.005;
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.005;
    }

    var planeG = new THREE.PlaneGeometry(24, 20);
	var imgMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
	map: new THREE.TextureLoader().load('https://anaik12.github.io/bvis/point/brainImg.png'), side: THREE.DoubleSide});
	var plane = new THREE.Mesh(planeG, imgMaterial);
	plane.overdraw = true;
	sceneObject.add(plane);


    function movePlane(e){
        sceneObject.remove(cylinder);
        sceneObject.remove(plane);
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
        positions = [];
        colors = [];
        var color = new THREE.Color();
        var n = 1000, n2 = n / 2;
        var material = [];    
        var geometry = new THREE.BufferGeometry( radius, radius, height, 32 );
        console.log(parseFloat(zvalue));
        var zvalueleft = parseFloat(zvalue) + 1.3;
        var zvalueright = parseFloat(zvalue) + 1.7;
        console.log(zvalue, zvalueleft, zvalueright);
        // console.log(data);
        for(var i = 0; i< data.length; i++) {
            // console.log(data);

            // if(data[i].Y > boundbox.min.z && data[i].Y < boundbox.min.z){
            // if(data[i].Y > zvalue - 1  && data[i].Y < zvalue + 1){
            // if(data[i].Y > 0){
            var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            // positions.push( x, z, y );
        //             // colors
            var colormax = 357.19;
            var colormin = 0;
            // if(data[i].Y > zvalueleft  && data[i].Y < zvalueright){
            // var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}, {r:1.0, g:1.0, b:1.0}, {r:0.0, g:1.0, b:1.0}];
            var colorvalues = [{r:0.8, g:0.0, b:0.0},{r:0.0, g:0.8, b:0.0},{r:0.0, g:0.0, b:0.8}, {r:0.8, g:0.8, b:0.8}, {r:0.0, g:0.8, b:0.8}];
            // {r:1.0, g:0.5, b:0.5}, {r:0.5, g:1.0, b:0.5}];
            // var colorindex= Math.floor(Math.random() * 3);
                // console.log(data[i].concentration);
            if(data[i].concentration > 8000 && data[i].concentration <= 9000 && (red == true|| all==true)){
            var cx = colorvalues[0].r;
            var cy = colorvalues[0].g;
            var cz = colorvalues[0].b;
            zero = zero + 1;
            }
            else
             // if(data[i].concentration == 1 && (green == true|| all==true)){
            if(data[i].concentration > 9000 && data[i].concentration <= 10000 && (green == true|| all==true)){
            var cx = colorvalues[1].r;
            var cy = colorvalues[1].g;
            var cz = colorvalues[1].b;
            one = one + 1;
            }
            else 
            // if(data[i].concentration == 2 && (blue == true|| all==true)){
            if(data[i].concentration > 10000 && data[i].concentration <= 11000 && (blue == true|| all==true)){
            var cx = colorvalues[2].r;
            var cy = colorvalues[2].g;
            var cz = colorvalues[2].b;
            two = two + 1;
            }
            else 
            // if(data[i].concentration == 3){
            if(data[i].concentration > 11000 && data[i].concentration <= 12000){
            var cx = colorvalues[3].r;
            var cy = colorvalues[3].g;
            var cz = colorvalues[3].b;
            three = three + 1;
            }
            else 
            // if(data[i].concentration == 4)if(data[i].concentration == 4){{
            if(data[i].concentration > 12000 && data[i].concentration <= 15000){
                var cx = colorvalues[4].r;
                var cy = colorvalues[4].g;
                var cz = colorvalues[4].b;

                four = four + 1;
               }
                else{
                    var cx = 0.3;
                    var cy = 0.3;
                    var cz = 0;
                }
             positions.push( x, z, y );  
            
            color.setRGB( cx, cy, cz );
            colors.push( color.r, color.g, color.b );

            

        // geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

            // }

        // console.log("0=" +zero + " 1=" + one + " 2= " + two + " 3= "  + three + " 4=" + four);
            // else {

            //     var cx = 0.4;
            //     var cy = 0.2;
            //     var cz = 0.2;

            //     color.setRGB( cx, cy, cz );
            //     colors.push( color.r, color.g, color.b );

            // }
        // geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

        }
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
        
    var textureLoader = new THREE.TextureLoader();

    var sprite = textureLoader.load( 'data/disc.png');
    // var sprite = textureLoader.load( 'data/snowflake1.png' );

        
    material = new THREE.PointsMaterial({ size:0.35, map:sprite, vertexColors: THREE.VertexColors, transparent:true, opacity:0.5});//, opacity:0.3});
    
    cylinder = new THREE.Points(geometry, material);
    sceneObject.add(cylinder);
    sceneObject.add(plane);

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
    self.loadData = function(file,val){

        

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {
                // console.log(typeof(d.comm0));
                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2 - 1);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2 + 1);

                // add the element to the data collection
                // console.log(typeof(val));
                // console.log(typeof(d.filtered));
                // var concval=d.comm0;
                data.push({
                    // concentration density

                     concentration: Number(d[val]),
                    //concentration: Number(d.comm1),
                    // concentration: Number(d.comm2),
                    // concentration: Number(d.comm3),
                    // concentration: Number(d.win2comm0),
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
        initialize: function(file,val){
            // var comm = "comm0";
            self.loadData(file, val);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        }
    };
	
	// console.log("final",self.data);

    return publiclyAvailable;

};