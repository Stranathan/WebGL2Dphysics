var arrOfPolygons = new Array();

var axisScale = 100;

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	background(40);
	
	noFill();

	let rectangle = new Polygon([400, 400],  40,  3, [255,   255, 255]);
	arrOfPolygons.push(rectangle);
}
// function makeAxes(aPolygon)
// {
// 	// polygon vertices are saved [x, y.... x_n, y_n]
// 	stroke(0, 255, 0);
// 	for(let i = 0; i < aPolygon.vertices.length; i+=2)
//     {
// 		if( i  >= aPolygon.vertices.length - 2)
// 		{
// 			let x1 = aPolygon.vertices[i];
// 			let y1 = aPolygon.vertices[i+1];
// 			let x2 = aPolygon.vertices[0];
// 			let y2 = aPolygon.vertices[1];
// 			stroke(0, 255, 0);
// 			line(x1, y1, x2, y2);
// 			stroke(255, 0, 0);
// 			let dX = x2 - x1;
// 			let dY = y2 - y1;
// 			if(dY/dX > 0)
// 			{
// 				line(x1 + (dX / 2.0),
// 					y1 + (dY / 2.0),
// 					(x1 + (dX / 2.0)) + (dX / 2.0),
// 					(y1 + (dY / 2.0)) - (dY / 2.0),
// 					);
// 			}
// 			else
// 			{
// 				line(x1 + (dX / 2.0),
// 					y1 + (dY / 2.0),
// 					(x1 + (dX / 2.0)) - (dX / 2.0),
// 					(y1 + (dY / 2.0)) + (dY / 2.0),
// 					);
// 			}
// 			noFill();
// 		}
// 		else
// 		{
// 			let x1 = aPolygon.vertices[i];
// 			let y1 = aPolygon.vertices[i+1];
// 			let x2 = aPolygon.vertices[i + 2];
// 			let y2 = aPolygon.vertices[i + 3];
// 			stroke(0, 255, 0);
// 			line(x1, y1, x2, y2);
// 			stroke(255, 0, 0);
// 			let dX = x2 - x1;
// 			let dY = y2 - y1;
// 			if(dY/dX > 0)
// 			{
// 				line(x1 + (dX / 2.0),
// 					y1 + (dY / 2.0),
// 					(x1 + (dX / 2.0)) + (dX / 2.0),
// 					(y1 + (dY / 2.0)) - (dY / 2.0),
// 					);
// 			}
// 			else
// 			{
// 				line(x1 + (dX / 2.0),
// 					y1 + (dY / 2.0),
// 					(x1 + (dX / 2.0)) - (dX / 2.0),
// 					(y1 + (dY / 2.0)) + (dY / 2.0),
// 					);
// 			}
// 			noFill();
// 		}
// 	}
// }
function drawNormals(aPolygon)
{
	for(let i = 0; i < aPolygon.vertices.length; i+=2)
	{
		let x1 = aPolygon.vertices[i];
		let y1 = aPolygon.vertices[i + 1];
		let x2 = aPolygon.vertices[i + 2];
		let y2 = aPolygon.vertices[i + 3];
		let dx = x2 - x1;
		let dy = y2 - y1;
		ellipse(x1 + dx/2.0, y1 + dy / 2.0, 10, 10);
		line(x1 + dx/2.0, y1 + dy / 2.0,
			 x1 + dx/2.0 - dx / 2.0, y1 - dy / 2.0);
	}
	// make the last one
	let x1 = aPolygon.vertices[aPolygon.vertices.length - 2];
	let y1 = aPolygon.vertices[aPolygon.vertices.length - 1];
	let x2 = aPolygon.vertices[0];
	let y2 = aPolygon.vertices[1];
	let dx = x2 - x1;
	let dy = y2 - y1;
	ellipse(x1 + dx/2.0, y1 + dy / 2.0, 10, 10);
}
function draw() 
{
	background(40);
	//tt = millis() / 1000;
	arrOfPolygons[0].translate([mouseX, mouseY]);

	for(let i in arrOfPolygons)
	{
		arrOfPolygons[i].display();
	}
	drawNormals(arrOfPolygons[0]);
}