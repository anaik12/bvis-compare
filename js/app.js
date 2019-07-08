import * as d3 from 'd3'
import data from '../data/XYcoordinates.json'
			

			
			var rows, canvas;
			var color = ["blue", "green", "red"];

			function colorValue(d_i){
				if (d_i <= 5000) return "#2DDDD4";
				if (d_i > 5000 && d_i <= 7000) return "#2D9CDD";
				if (d_i > 7000 && d_i <= 9000) return "#3E2DDD";
				if (d_i > 9000 && d_i <= 11000) return "#D02DDD";
				if (d_i > 11000 && d_i <= 13000) return "#E033BB";
				if (d_i > 1300) return "#F60513";
			}


			d3.json("data/XYcoordinates.json", function(data) {
				rows=data;
				
				//console.log("hello");
			canvas = d3.select("body").append("svg").
						 attr("width",500).
						 attr("height",500).
						 style("border","2px solid green")

			var imgs = canvas.select('image').data([0]);
				imgs.enter()
				.append('svg:image')
				.attr("xlink:href", "https://anaik3.people.uic.edu/first/brainImg.png")
				.attr("x", "200")
                .attr("y", "200")
                .attr("width", "400")
                .attr("height", "400");
				
			

			var circle = canvas.select("circle")
			.data(data)
			.enter()
				.append("circle")
				.attr("cx", function (d) {  return d.x; })
				.attr("cy", function (d) {  return d.y; })
				.attr("r", 8)
				.attr("stroke-width", 2)
				.attr("stroke", "#4F34B8")//function(d,i){ return color(i); })
				.attr("fill", "none")
				.append("svg:title")
   				.text(function(d) { return d.id; });
				

			});

// var scene = new THREE.Scene( );
// 			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 			var renderer = new THREE.WebGLRenderer( { alpha:true});
// 			renderer.setClearColor(0xffffff, 0);
// 			renderer.setSize( window.innerWidth, window.innerHeight );
// 			document.body.appendChild( renderer.domElement );
			
// 			window.addEventListener('resize', function(){
// 				var width = window.innerWidth;
// 				var height = window.innerHeight;
// 				renderer.setSize( width, height );
// 				camera.aspect = width / height;
// 				camera.updateProjectionMatrix();
// 			});
// 			scene.add( new THREE.AmbientLight( 0x222222 ) );
// 			var light = new THREE.PointLight( 0xffffff );
// 			scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
// 			light.position.copy( camera.position );
// 			scene.add( light );

// 			// create the shape
// 			var geometry = new THREE.BoxGeometry( 2, 2, 2);
// 			var geometry2 = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
			
    		

// 			//var color = new THREE.Color("rgb(100,100,0)");
//  			// create a material, colour or image texture
//  			controls = new THREE.OrbitControls(camera, renderer.domElement );
			
// 			var material = new THREE.MeshPhongMaterial( {color: 0x0000ff, transparent:true, opacity: 0.4});
// 			var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent:true, opacity: 0.2});
// 			var cube = new THREE.Mesh( geometry, material );
// 			var edges = new THREE.EdgesGeometry( geometry );
// 			var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x4F34B8, opacity: 1.0} ) );

			
			
// 			var cube2 = new THREE.Mesh( geometry2, material2 );

// 			scene.add( cube );
// 			scene.add( line );
			
// 			//scene.add( cube2 );
//  			camera.position.z = 3;
// 			camera.position.y = 0;
			
			
//    			 // plane
//    			planeG = new THREE.PlaneGeometry(2, 2);
//    			var imgMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
//         	map: new THREE.TextureLoader().load('brainImg.png'), side: THREE.DoubleSide});
//     		var plane = new THREE.Mesh(planeG,imgMaterial);
//     		plane.overdraw = true;
//     		scene.add(plane);

//     		var slider = document.getElementById("slider");
// 			slider.addEventListener("input", movePlane);
// 			var edges2 = new THREE.EdgesGeometry( planeG );
// 			var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xdf65b0, opacity: 1.0} ) );
// 			//create color
// 			scene.add(line2);

// 			function movePlane(e){
// 				var target = (e.target) ? e.target : e.srcElement;
//  				plane.position.z = target.value;
//  				line2.position.z = target.value;
// 			}

// 			function compare(){
// 				var showSecondPlane = document.getElementById("showSecondPlane");
// 				var plane2, planeG2, slider2, line3;
// 				if (showSecondPlane.style.display === "none"){
// 					showSecondPlane.style.display = "block";
// 		   			var planeG2 = new THREE.PlaneGeometry(2, 2);
// 		   			var imgMaterial2= new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
// 		        	map: new THREE.TextureLoader().load('brainImg.png'), side: THREE.DoubleSide});
// 		    		var plane2 = new THREE.Mesh(planeG2, imgMaterial2);
// 		    		plane2.overdraw = true;
// 		    		scene.add(plane2);

// 		    		var slider2 = document.getElementById("slider2");
// 					slider2.addEventListener("input", movePlane2);
// 					var edges3 = new THREE.EdgesGeometry( planeG );
// 					var line3 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xd4b9da, opacity: 1.0} ) );
// 					//create color
// 					scene.add(line3);

// 					function movePlane2(e){
// 						var target = (e.target) ? e.target : e.srcElement;
// 		 				plane2.position.z = target.value;
// 		 				line3.position.z = target.value;	
// 					}
// 				}
// 				else{
// 					showSecondPlane.style.display = "none";
// 					slider2.style.display ="none";
// 					scene.remove(plane2);
// 					plane2.geometry.dispose();
// 					plane2.material.dispose();
// 					//plane2 = undefined;

// 					scene.remove(line3);
// 					line3.geometry.dispose();
// 					line3.material.dispose();
// 					//line3 = undefined;
// 				}
// 			}
// 			// game logic
// 			var update = function ( )
// 			{
// 				// cube.rotation.x += 0.01;
// 				// cube.rotation.y += 0.005;
// 				// line.rotation.x += 0.01;
// 				// line.rotation.y += 0.005;
// 				// cube2.rotation.x += 0.005;
// 				// cube2.rotation.y += 0.0025;
// 			};

// 			// draw scene
// 			var render = function ( )
// 			{
// 				renderer.render( scene, camera );
// 			};

// 			// run game loop (update, render, repeat)
// 			var GameLoop = function ( )
// 			{
// 				requestAnimationFrame( GameLoop );

// 				controls.update( );
// 				render( );
// 			};

// 			GameLoop( );
			// d3.csv("data/time_courses.csv", function(data) {
			// 	// console.log(data);
			// 	function color(d){

			// 	}
			// 	rect = canvas.selectAll("rect")
			// 	.data(rows)
			// 	.enter()
			// 	.append("rect")
			// 	.attr("x", function (d) {  return d.x + 10; })
			// 	.attr("y", function (d) {  return d.y + 10; })
			// 	.attr("width", 10)
			// 	.attr("height", 10)
			// 	.attr("stroke-width", 2)
			// 	.attr("stroke", function(d,i){  return color(colorValue(i)); })
			// 	.attr("fill", "none");

			// 	rect.transition()
			// 		.duration(2500)
			// 		.delay(1000)
			// 		.attr("stoke", function(d,i){return color(colorValue(i));} );

			// 	// console.log(data[0][1]);
			// 	console.log(data);
			// 	// console.log(rows);
			// 	// canvas.selectAll("rect")
			// 	// .data(rows)
			// 	// .enter()
			// 	// 	.append("rect")
			// 	// 	.attr("x", function (d) {  return d.x + 10; })
			// 	// 	.attr("y", function (d) {  return d.y + 10; })
			// 	// 	.attr("width", 10)
			// 	// 	.attr("height", 10)
			// 	// 	.attr("stroke-width", 2)
			// 	// 	.attr("stroke", function(d,i){return color(i); })
			// 	// 	.attr("fill", "none");
			// });
