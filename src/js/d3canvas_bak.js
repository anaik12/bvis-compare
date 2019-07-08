"use strict";

/* Get or create the application global variable */
var App = App || {};

var d3Canvas = function() {

	var zvalueslider;
	self.render = function(file){
	// d3.csv("data/058.csv" , function(data) { 
    

	var svgContainer = d3.select("body").append("svg")
	                                  .attr("width", 500)
	                                   .attr("height", 500);
	// var circles = svgContainer.selectAll("circle")
	//                          .data(d)
	//                          .enter()
	//                          .append("circle");
	// // console.log("data: ", data);.log

	console.log("d3canvas hello");
	// var circleAttributes = circles
	//                       .attr("cx", function (d) { return data.Points0; })
	//                       .attr("cy", function (d) { return data.Points2; })
	//                       .attr("r", 1)
	//                       .style("fill", "red");

	var circle = svgContainer.append("circle")
							.attr("cx", 250)
							.attr("cy", 250)
							.attr("r", 50)
							.attr("fill", "red");


		// });
	}

	var publiclyAvailable = {

		// const  zvalueslider = "-4.1";
        // load the data and setup the system
        initialize: function(){
            zvalueslider = "-4.1";

        },



     render: function(zvalueslider){
     	

	d3.csv('data/058.csv' , function(data){
	var svgContainer = d3.select("body").append("svg")
	                                  .attr("width", 500)
	                                   .attr("height", 500);

	var zvalues = d3.nest()
	  .key(function(d) { return (parseFloat(d.Points1)).toFixed(1); })
	  .entries(data);

	  // console.log(zvalueslider);

	  function findPointZvalueX(key){
	  		for(var i in zvalues){
	  			if(zvalues[i].key == key){
	  				for(var j in zvalues[i].values){
	  				return parseFloat(zvalues[i].values[j].Points0);
	  			}
	  			}
	  		}

	  }

	  console.log(zvalueslider);

	    function findPointZvalueY(key){
	  		for(var i in zvalues){
	  			if(zvalues[i].key == key){
	  				// for(var j in zvalues[i].values){
	  				// return parseFloat(zvalues[i].values[j].Points2);
	  			// }r
	  			console.log("key is", key);
	  			return zvalues[i].values;
	  			}
	  		}

	  }

	  // findPointZvalueX("-3.6");

	  var key = zvalueslider;
	  console.log("key now is", key);

	  var keyvalues = findPointZvalueY("0.0");
	  // console.log(keyvalues);
	  // console.log(data);


	svgContainer.selectAll("circle")
	                         .data(keyvalues)
	                         .enter()
	                         .append("circle")
	                         .attr("cx", function (d) {  return parseFloat(d.Points0)*25 + 350; })
							.attr("cy",  function (d) {  return parseFloat(d.Points2)*25 + 50; })
							.attr("r", 1)
							.attr("fill", "blue");

	
	
	// for(i = 0; i< data.length; i++){

	// }

	// console.log("d3canvas hello");
	// var circleAttributes = circles
	//                       .attr("cx", function (d) { return data.Points0; })
	//                       .attr("cy", function (d) { return data.Points2; })
	//                       .attr("r", 1)
	//                       .style("fill", "red");

	// var circle = svgContainer.append("circle")
	// 						.attr("cx", 250)
	// 						.attr("cy", 250)
	// 						.attr("r", 50)
	// 						.attr("fill", "red");
		})

    
    }

   



	};


    return publiclyAvailable;

};


