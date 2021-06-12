"use strict";

var arrOfPolygons = new Array();

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	background(40);
	
	noFill();

	let aPolygon = new Polygon([600, 600],  40,  3, [255,   255, 255]);
	let anotherPolygon = new Polygon([200, 200],  60,  4, [255,   255, 255]);
	//let anotherPolygon2 = new Polygon([800, 400],  60,  4, [255,   255, 255]);

	arrOfPolygons.push(aPolygon);
	arrOfPolygons.push(anotherPolygon);
	//arrOfPolygons.push(anotherPolygon2);
}
function draw() 
{
	// frameRate(5)
	background(40);
	let tt = (millis() / 1000);

	arrOfPolygons[0].translate(vec2.fromValues(mouseX - arrOfPolygons[0].pos[0], mouseY - arrOfPolygons[0].pos[1])  );
	pseudoBroadPhase(arrOfPolygons);

	for(let i = 0; i < arrOfPolygons.length; i++)
	{
		
		arrOfPolygons[i].display();
	}

}