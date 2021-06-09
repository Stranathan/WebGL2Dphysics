"use strict";

var vec2 = glMatrix.vec2;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;
var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;

var arrOfPolygons = new Array();

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	background(40);
	
	noFill();

	let aPolygon = new Polygon([400, 400],  40,  5, [255,   255, 255]);
	arrOfPolygons.push(aPolygon);
}
function draw() 
{
	// frameRate(5)
	background(40);
	arrOfPolygons[0].translate([mouseX, mouseY]);

	for(let i in arrOfPolygons)
	{
		arrOfPolygons[i].display();
	}
}