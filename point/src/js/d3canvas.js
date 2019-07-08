"use strict";

/* Get or create the application global variable */
var App = App || {};

var d3Canvas = function() {
	var svgContainer;

	function draw(zvalueslider){
    
    d3.queue()
	.defer(d3.csv, 'data/014_new.csv')
	.defer(d3.tsv, 'data/cor_weights_cor0-t02260.louvain_comm.tsv')
	.defer(d3.csv, 'data/N_139_W_100_T_2260_correlation.csv')
	.await(drawcanvas);

	function drawcanvas(error, data, commdata, cordata){

	d3.select(".canvasDiv").selectAll("svg").remove();
	svgContainer = d3.select('.canvasDiv').append("svg")
	                                  .attr("width", 696)
	                                   .attr("height", 520)
	                                   .attr("border", "10px solid white");
	                                   // .attr("float", "right")
	                                   // .attr("position", "absolute")
	                                   // .attr("border", "2px red");

	var imgs = svgContainer.selectAll('image').data([0]);
				imgs.enter()
				.append('svg:image')
				// .attr("width", 512)
				// .attr("height", 512)
				.attr("x", 0)
				.attr("y", 0)
				.attr("xlink:href", "https://anaik3.people.uic.edu/bvis/brainImg.png")
				.attr("border", "10px solid white");	

	var zvalues = d3.nest()
	  .key(function(d) { return (parseFloat(d.Points1)).toFixed(2); })
	  .entries(data);

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

	  // var key = zvalueslider;
	  // console.log("key now is", key);

     var keyvalues = findPointZvalueY(zvalueslider);

     function getcolor(concentration){
     	var colormax = 357.19;
            
            // if(data[i].Y > zvalue - 1  && data[i].Y < zvalue + 1){

            // var cx = 0.9;
            var cy = 255 -  ( concentration * 1000 / colormax ) ;

            // console.log("cy ", cy);

            return "rgb(" + cy + ",50,255)" ;

     }

    function getcolor_comm(cell){
     		// if(commdata[cell] == undefined){
     		if(cell == undefined){
     			return "none";
     		
     		}
     		// if (cell == 0){
     		if (cell > 8000 && cell <= 9000){

     				return "red";
	     	}
	     	// else if (cell == 1){
	     	else if (cell > 9000 && cell <= 10000){
	     			return "green";
	     	}
	     	// else if (cell == 2){
	     	else if (cell > 10000 && cell <= 11000){
	     			return "blue";
	     	}
	     	else if (cell > 11000 && cell <= 12000){
	     			return "white";
	     	}
	     	// else if (cell == 2){
	     	else if (cell > 12000 && cell <= 15000){
	     			return "cyan";
	     	}
	     	else {
	     		return "black";
	     	}
     		// }
     	
     }	

     var fill = ["red", "blue", "green", "white"];
     var hoverdiv = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

	svgContainer.selectAll("circle")
	                         .data(keyvalues)
	                         .enter()
	                         .append("circle")
	                         .attr("cx", function (d) {  return parseFloat(d.Points0)*30 + 0; })
							.attr("cy",  function (d) {  return parseFloat(d.Points2)*30 + 0; })
							.attr("r", 9)
							.attr("stroke-width", "2px")
							.attr("opacity", 1)
							// .attr("stroke", function(d){ return getcolor_comm(d.comm1);})
							.attr("stroke", function(d){ return getcolor_comm(d.intensity);})
							.attr("fill", "none")
							.on("click", function(d){
								// svgContainer.selectAll("circle").data(keyvalues)
	       //                   .enter().append("circle").style("fill", "red");
								// .style("fill", "red"); 
								d.pulse = !d.pulse;
								      if (d.pulse) {
								        var selected_circles = d3.select(this);
								        pulsate(selected_circles);

								      }

								var linechart1 = new lineChart1();
								var cellname = "cell" + d.cell;
								document.getElementById('cellname').textContent = "Cell " + d.cell;
        						linechart1.render(cellname);
							})
							.on("mouseover", function(d){   
                      d3.select(this).classed('active', true)
                      hoverdiv.transition()      
                .duration(200)      
                .style("opacity", .9);      
                hoverdiv .html(d.cell)  
                // div .html(htmlinfo(d))
                .style("left", (d3.event.pageX + 10) + "px")     
                .style("top", (d3.event.pageY) + "px");
                })
					.on("mouseout", function(d){
                      d3.select(this).classed('active', false)
                      hoverdiv.transition()      
                .duration(500)      
                .style("opacity", 0);   
                  })
							.style("pointer-events", "all");
							// .attr("fill", "none");
							// .attr("fill", "#990099");//#FF69B4");
							// .attr("fill", function (d) {  return getcolor(d.concentration);});
					function pulsate(selection) {
				    recursive_transitions();

				    function recursive_transitions() {
				      if (selection.data()[0].pulse) {
				        selection.transition()
				            .duration(400)
				            .attr("stroke-width", 2)
				            .attr("r", 8)
				            .attr("fill", "lightblue")
				            .attr("opacity","0.7")
				            .ease(d3.easeSin)
				            .transition()
				            .duration(800)
				            .attr('stroke-width', 3)
				            .attr("r", 12)
				            .ease(d3.easeBounce)
				            .on("end", recursive_transitions);
				      } else {
				        // transition back to normal
				        selection.transition()
				            .duration(200)
				            .attr("r", "none")
				            // .attr("stroke", function(d){ return getcolor_comm(d.comm1);})
				            .attr("stroke", function(d){ return getcolor_comm(d.intensity);})
				            .attr("r", 9 )
				            .attr("stroke-width", "1px")
				            .attr("opacity", 1)
				            .attr("fill", "none");
				            // .attr("stroke-dasharray", "1, 0");
				      }
				    }
				}
		}
	}


	var publiclyAvailable = {


   render: function(zvalueslider){

   	d3.queue()
	.defer(d3.csv, 'data/014_new.csv')
	.defer(d3.tsv, 'data/cor_weights_cor0-t02260.louvain_comm.tsv')
	.defer(d3.csv, 'data/N_139_W_100_T_2260_correlation.csv')
	.await(drawcanvas);
     	

	function drawcanvas(error, data, commdata, cordata){

		// console.log(commdata[2]);
		

		d3.select(".canvasDiv").selectAll("svg").remove(); 
	var svgContainer = d3.select('.canvasDiv').append("svg")
	                                  .attr("width", 696)
	                                   .attr("height", 520)
	                                   .attr("border", "10px solid white");

	 var imgs = svgContainer.selectAll('image').data([0]);
				imgs.enter()
				.append('svg:image')
				// .attr("width", 512)
				// .attr("height", 512)
				.attr("x", 0)
				.attr("y", 0)
				.attr("xlink:href", "https://anaik3.people.uic.edu/bvis/brainImg.png")
				.attr("border", "10px solid white");

	var zvalues = d3.nest()
	  .key(function(d) { return (parseFloat(d.Points1)).toFixed(1); })
	  .entries(data);

	    function findPointZvalueY(key){
	  		for(var i in zvalues){
	  			if(zvalues[i].key == key){
	  				// for(var j in zvalues[i].values){
	  				// return parseFloat(zvalues[i].values[j].Points2);
	  			// }r
	  			// console.log("key is", key);
	  			return zvalues[i].values;
	  			}
	  		}

	  }



	  var key = zvalueslider;
	  // console.log("key now is", key);

	  // var keyvalues = findPointZvalueY("0.0");

     var keyvalues = findPointZvalueY(zvalueslider);

     // svgContainer.selectAll("rect")
     // .append()
     function getcolor(concentration){
     	var colormax = 357.19;
            

            var cy = 255 -  ( concentration * 1000 / colormax ) ;

            // console.log("cy ", cy);

            return "rgb(" + cy + ",50,255)" ;

     }

     var fill = ["red", "blue", "green", "white"];

     // function getcolor_comm(cell){
     // 		if(commdata[cell] == undefined){
     // 			return "none";
     // 		}
     // 		if (commdata[cell][1] == "0"){

     // 				return "blue";
	    //  	}
	    //  	else if (commdata[cell][1] == "1"){
	    //  			return "green";
	    //  	}
	    //  	else {
	    //  			return "red";
	    //  	}
     // 		// }
     	
     // }

      function getcolor_comm(cell){
     		// if(commdata[cell] == undefined){
     		if(cell == undefined){
     			return "none";
     		
     		}
     		// if (cell == 0){
     		if (cell > 8000 && cell <= 9000){

     				return "red";
	     	}
	     	// else if (cell == 1){
	     	else if (cell > 9000 && cell <= 10000){
	     			return "green";
	     	}
	     	// else if (cell == 2){
	     	else if (cell > 10000 && cell <= 11000){
	     			return "blue";
	     	}
	     	else if (cell > 11000 && cell <= 12000){
	     			return "white";
	     	}
	     	// else if (cell == 2){
	     	else if (cell > 12000 && cell <= 15000){
	     			return "cyan";
	     	}
	     	else {
	     		return "black";
	     	}
     		// }
     	
     }

     var hoverdiv = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

        var selected_circles;
       	var color_switch = false;

	svgContainer.selectAll("circle")
	                         .data(keyvalues)
	                         .enter()
	                         .append("circle")
	                         .attr("cx", function (d) {  return parseFloat(d.Points0)*30 + 0;})// + 300; })
							.attr("cy",  function (d) {  return parseFloat(d.Points2)*30 + 0;})// + 150; })
							.attr("r", 9)
							.attr("stroke-width", "1px")
							.attr("opacity", 1)
							// .attr("stroke", function(d){ return fill[Math.floor(Math.random() * 4)];})
							// .attr("stroke", function(d){ return getcolor_comm(d.comm1);})
							.attr("stroke", function(d){ return getcolor_comm(d.intensity);})
							.attr("fill", "none")
							.on("click", function(d){
								// .append("circle").style("fill", "red"); 
								// color_switch =! color_switch;
								// if(color_switch){
									// selected_circles = d3.select(this);
									// selected_circles.transition()
									// // .duration(10)
									// .attr("fill", "#00FF00")
									// .attr("opacity", "0.5");
									// var cellname = document.getElementById("cellname");
									// cellname.text = "Cell " + d.cell;
									d.pulse = !d.pulse;
								      if (d.pulse) {
								        var selected_circles = d3.select(this);
								        pulsate(selected_circles);

								      }
								// }	
								var linechart1 = new lineChart1();
								var cellname = "cell" + d.cell;
								// console.log(document.getElementById('cellname').textContent);
								document.getElementById('cellname').textContent = "Cell " + d.cell;
        						linechart1.render(cellname);
							})
							.on("mouseover", function(d){   
                      d3.select(this).classed('active', true)
                      hoverdiv.transition()      
                .duration(200)      
                .style("opacity", .9);      
                hoverdiv .html(d.cell)  
                // div .html(htmlinfo(d))
                .style("left", (d3.event.pageX + 10) + "px")     
                .style("top", (d3.event.pageY) + "px");
    

                  })
							 .on("mouseout", function(d){
                      d3.select(this).classed('active', false)
                      hoverdiv.transition()      
                .duration(500)      
                .style("opacity", 0);   
                  })

							.style("pointer-events", "all");
							// .attr("stroke", "white")
							// .attr("fill", function(d){ return fill[Math.floor(Math.random() * 4)];});
							// .attr("fill", "none");
							// .attr("fill", "#990099");//#FF69B4");
							// .attr("fill", function (d) {  return getcolor(d.concentration);});

					function pulsate(selection) {
				    recursive_transitions();

				    function recursive_transitions() {
				      if (selection.data()[0].pulse) {
				        selection.transition()
				            .duration(400)
				            .attr("stroke-width", 2)
				            .attr("r", 8)
				            .attr("fill", "lightblue")
				            .attr("opacity","0.7")
				            .ease(d3.easeSin)
				            .transition()
				            .duration(800)
				            .attr('stroke-width', 3)
				            .attr("r", 12)
				            .ease(d3.easeBounce)
				            .on("end", recursive_transitions);
				      } else {
				        // transition back to normal
				        selection.transition()
				            .duration(200)
				            .attr("r", "none")
				            // .attr("stroke", function(d){ return getcolor_comm(d.comm1);})
				            .attr("stroke", function(d){ return getcolor_comm(d.intensity);})
				            .attr("r", 9 )
				            .attr("stroke-width", "1px")
				            .attr("opacity", 1)
				            .attr("fill", "none");
				            // .attr("stroke-dasharray", "1, 0");
				      }
				    }
				}
		}



    // var linechart = new linechart();
    },

    clearCanvas: function(zvalueslider){
    	// d3.selectAll("svg > *").remove();
    	draw(zvalueslider);
    	// var linechart = new linechart();
    	// linechart.linechartcall();
    }

    // render("-4.2");

   };

   return publiclyAvailable;


};


   



