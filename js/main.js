// var renderer = new THREE.CanvasRenderer( { alpha:true});
// renderer.setClearColor(0xffffff, 0);

// var container = document.getElementById('canvas');
//          var w = container.offsetWidth;
//          var h = container.offsetHeight;
//          renderer.setSize(w, h);
//          container.appendChild(renderer.domElement);

// function capture() {
//     $("#solnePuzzle").html2canvas({
//         onrendered: function (e) {
//             $("#img_val").val(e.toDataURL("image/png"));
//             var t = $("#myForm").serializeArray();
//             $.ajax({
//                 url: "save.php",
//                 type: "POST",
//                 dataType: "json",
//                 data: {
//                     box: box,
//                     form: t
//                 },
//                 success: function (e) {
//                     alert(e.text)
//                 }
//             })
//         }
//     })
// }

var data = [];

d3.csv('data/XYcoordinates.json')
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                // bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                // bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                // bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2);

                // // get the max bounds
                // bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                // bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                // bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2);

                // add the element to the data collection
                data.push({
                    // concentration density
                    // concentration: Number(d.concentration),
                    // Position
                    X: Number(d.x),
                    Y: Number(d.y)

                    
                });
				console.log("data1", data);
            });

var scene = new THREE.Scene( );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer( { alpha:true});
renderer.setClearColor(0xffffff, 0);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize( width, height );
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});
scene.add( new THREE.AmbientLight( 0x222222 ) );
var light = new THREE.PointLight( 0xffffff );
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
light.position.copy( camera.position );
scene.add( light );

// create the shape
var geometry = new THREE.BoxGeometry( 2, 2, 2);
var geometry2 = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );



var color = new THREE.Color("rgb(100,100,0)");
	// create a material, colour or image texture
	controls = new THREE.OrbitControls(camera, renderer.domElement );

var material = new THREE.MeshPhongMaterial( {color: 0x0000ff, transparent:true, opacity: 0.4});
var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent:true, opacity: 0.2});
var cube = new THREE.Mesh( geometry, material );
var edges = new THREE.EdgesGeometry( geometry );
var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x4F34B8, opacity: 1.0} ) );



var cube2 = new THREE.Mesh( geometry2, material2 );

// scene.add( cube );
scene.add( line );

//scene.add( cube2 );
	camera.position.z = 3;
camera.position.y = 0;

var slider2On = false;

// var planeG, line2;
//function drawPlane(sliderName){
	 // plane
var testmat = document.getElementById('neurons');
var planeG = new THREE.PlaneGeometry(2, 2);
var imgMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
map: new THREE.TextureLoader().load('chart2.png'), side: THREE.DoubleSide});
var plane = new THREE.Mesh(planeG, imgMaterial);
plane.overdraw = true;
scene.add(plane);

var slider = document.getElementById("slider");
slider.addEventListener("input", movePlane);

var edges2 = new THREE.EdgesGeometry( planeG );
var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xdf65b0, opacity: 1.0} ) );
//create color
scene.add(line2);

var starsGeometry = new THREE.Geometry();

var sprite = new THREE.TextureLoader().load( 'data/disc.png' );

// var starsGeometry = new THREE.BufferGeometry(2, 2, 2, 32);

for ( var i = 0; i < 1000; i ++ ) {

	// for(var i = 0; i< data.length; i++){


	// }

	var star = new THREE.Vector3();
	star.x = THREE.Math.randFloatSpread( 2 );
	star.y = THREE.Math.randFloatSpread( 2 );
	star.z = THREE.Math.randFloatSpread( 2 );

	starsGeometry.vertices.push( star );

}

console.log("data",data[0]);

var starsMaterial = new THREE.PointsMaterial( { color: 0x8800ff, map:sprite, size: 15, sizeAttenuation: false, alphaTest: 0.5, transparent: true  } );
// var starsMaterial = new THREE.PointsMaterial( { color: 0x4F34B8, map:sprite, size: 15, sizeAttenuation: false, alphaTest: 0.5, transparent: true  } );
// starsMaterial.color.setHSL( 1.0, 0.3, 0.7 );
var starField = new THREE.Points( starsGeometry, starsMaterial );

scene.add( starField );

////////////////////////////////////////////

// stats = new stats();
// // 				document.body.appendChild( stats.dom );
// 				//
// 				var gui = new dat.GUI();
// 				gui.add( material, 'sizeAttenuation' ).onChange( function () {
// 					material.needsUpdate = true;
// 				} );
// 				gui.open();
// 				//
// 				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// 				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
// 				document.addEventListener( 'touchmove', onDocumentTouchMove, false );


///////////////////////////////////////////


function movePlane(e){
var target = (e.target) ? e.target : e.srcElement;
	plane.position.z = target.value;
	line2.position.z = target.value;	
}
//}

// var slidername = "slider"
// drawPlane(slidername);

var button = document.getElementById("Compare"),
	count = 0;


	button.onclick = function (){
		count++;
		// console.log("Count: ", count);
		var x = document.getElementById("slider2");

		

	var planeG2 = new THREE.PlaneGeometry(2, 2);
		var imgMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
    map: new THREE.TextureLoader().load('chart.png'), side: THREE.DoubleSide});
	var plane2 = new THREE.Mesh(planeG2,imgMaterial);
	//plane2.overdraw = true;

	var edges2 = new THREE.EdgesGeometry( planeG2 );
	var line3 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xdf65b0, opacity: 1.0} ) );

		if(count%2 != 0){
		
		x.style.display = "block";
		//var slidername = "slider2";
		
		scene.add(plane2);

    	var slider2 = document.getElementById("slider2");
		slider2.addEventListener("input", movePlane2);
	
		

		//create color
		scene.add(line3);

		function movePlane2(e){
		var target = (e.target) ? e.target : e.srcElement;
			plane2.position.z = target.value;
			line3.position.z = target.value;	
	}

		
	}
	else{
		
			x.style.display = "none";
			//scene.remove(scene.children[6]);

			scene.remove(scene.children[7]);
			scene.remove(scene.children[6]);

			//console.log("now ", scene.children.length);
		}
};

console.log("plane id :", plane.id);
// game logic
var update = function ( )
{
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.005;
	// line.rotation.x += 0.01;
	// line.rotation.y += 0.005;
	// cube2.rotation.x += 0.005;
	// cube2.rotation.y += 0.0025;

};

// draw scene
var render = function ( )
{
	renderer.render( scene, camera );
	//drawPlane();
};

// run game loop (update, render, repeat)
var GameLoop = function ( )
{
	requestAnimationFrame( GameLoop );

	controls.update( );
	render( );
};

GameLoop( );

// // var html="hello";
// // d3.select(".infoDiv").html(html);

var fill = ["red", "blue", "green", "white"];

var neuroC = document.getElementById('neurons');

// var canvas = d3.select(neuroC).append("p").text("hello");

d3.json("data/XYcoordinates.json", function(data){

		console.log(data);
	     var canvas = d3.select("body").append("svg")
	     .attr("width", 512)
	     .attr("height", 512)
	     .style("border","px solid green")
	     .style("transform", "translate 1px 1px");

	 //     var image = canvas.append('svg:image')
		// .attr({
		//   'xlink:href': 'brainImg.png',  // can also add svg file here
		//   x: 0,
		//   y: 0,
		//   width: 512,
		//   height: 512
		// });

		var imgs = canvas.selectAll('image').data([0]);
				imgs.enter()
				.append('svg:image')
				// .attr("width", 512)
				// .attr("height", 512)
				.attr("x", 0)
				.attr("y", 0)
				.attr("xlink:href", "https://anaik3.people.uic.edu/first/brainImg.png");

	     var circle = canvas.selectAll("circle")
	     .data(data)
	     .enter()
	     .append("circle")
	     .attr("cx", function(d){ return Math.round(d.x);})
	     .attr("cy", function(d){ return Math.round(d.y);})
	     .attr("r", 4)
	     .attr("fill", "none")
	     .attr("stroke-width", "1px")
	     .attr("stroke", function(d){ return fill[Math.floor(Math.random() * 4)];});

	     d3.select("#Compare")
		.on('click', function(){
		    // Get the d3js SVG element and save using saveSvgAsPng.js
		    // saveSvgAsPng(document.getElementsByTagName("svg")[0], "plot.png");
		    // saveSvgAsPng(d3.select('svg').node(), 'https://anaik3.people.uic.edu/first/chart.png');

		    function svgToSvg() {
            svgAsDataUri(d3.select('svg').node(), {}, function(uri) {
                // console.log('uri', uri);
            });
        }
		})
	     // .attr("stroke", function(d){ return fill[2];});
});