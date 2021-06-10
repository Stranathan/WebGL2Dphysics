"use strict";

var arrOfPolygons = new Array();

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	background(40);
	
	noFill();

	let aPolygon = new Polygon([600, 100],  40,  5, [255,   255, 255]);
	let anotherPolygon = new Polygon([400, 400],  80,  3, [255,   255, 255]);

	arrOfPolygons.push(aPolygon);
	arrOfPolygons.push(anotherPolygon);
}
function draw() 
{
	// frameRate(5)
	background(40);
	arrOfPolygons[0].translate([mouseX, mouseY]);

	pseudoBroadPhase(arrOfPolygons);
	for(let i in arrOfPolygons)
	{
		arrOfPolygons[i].display();
	}

}