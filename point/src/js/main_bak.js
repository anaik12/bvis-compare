"use strict";

/* Get or create the application global variable */
var App = App || {};

/* IIFE to initialize the main entry of the application*/
(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    /* Entry point of the application */
    App.start = function()
    {
        
        
        var d3canvas = new d3Canvas();
        d3canvas.render("-3.2");
        // create a new scene
        App.scene = new Scene({container:"scene"});

        // initialize the particle system
        var particleSystem = new ParticleSystem();
        particleSystem.initialize('data/014_new.csv');

        //add the particle system to the scene
        App.scene.addObject( particleSystem.getParticleSystems());

        // render the scene
       

       
        App.scene.render();

        var linechart1 = new lineChart1();
        linechart1.render();
        // console.log("hello");
        // // d3canvas.initialize('data/058.csv');
        // console.log("hello");
    };

}) ();