// tt = millis() / 1000;

// ------------------------------------------------------

// function A()
// {
// 		var a = [1,2,3];
//     var b = [4,5,6];
    
//     B(a, b);
//     function B(c,b)
//     {
// 			for(let i in c)
//       {
//       	console.log(c[i]);
//         console.log(b[i]);
//       }
//     }
// }

// A();

// ------------------------------------------------------

// function drawNormalsAndNormalPlanes(polygonRef)
// {
// 	stroke(255, 0, 0);
// 	// polygonRef.vertices = [x0, y0, x1, y1 ... xN, yN]
// 	for(let i = 0; i < polygonRef.vertices.length; i+=2)
// 	{
// 		let edge;
// 		let normal;
// 		let slope;

// 		if(i < polygonRef.vertices.length - 2) // to not null ref array
// 		{
// 			edge = [polygonRef.vertices[i + 2] - polygonRef.vertices[i], 	
// 					polygonRef.vertices[i + 3] - polygonRef.vertices[i + 1] ];
// 			normal = [edge[1], - edge[0]];
// 			slope = edge[1] / edge[0];
// 			console.log
// 			// normal
// 			stroke(255, 0, 0);
// 			line(polygonRef.vertices[i    ] + (edge[0] / 2),
// 				polygonRef.vertices[i + 1] + (edge[1] / 2),
// 				polygonRef.vertices[i    ] + (edge[0] / 2) + normal[0],
// 				polygonRef.vertices[i + 1] + (edge[1] / 2) + normal[1]
// 				);

// 			// normal plane
// 			stroke(0, 255, 255);
// 			let x0 = polygonRef.vertices[i    ] + normal[0] * normalPlaneRadialScale;
// 			let y0 = polygonRef.vertices[i + 1] + normal[1] * normalPlaneRadialScale;
// 			let x1 = polygonRef.vertices[i + 2] + normal[0] * normalPlaneRadialScale;
// 			let y1 = polygonRef.vertices[i + 3] + normal[1] * normalPlaneRadialScale;

// 			let scaledCoord0 = linearScale(x0, y0, x0 - normalPlaneAxialScale, slope);
// 			let scaledCoord1 = linearScale(x1, y1, x1 + normalPlaneAxialScale, slope);

// 			line(scaledCoord0[0], scaledCoord0[1], scaledCoord1[0], scaledCoord1[1]);
// 		}
// 		else
// 		{
// 			edge = [polygonRef.vertices[0] - polygonRef.vertices[i], polygonRef.vertices[1] - polygonRef.vertices[i + 1]];
// 			normal = [edge[1], - edge[0]];
// 			slope = edge[1] / edge[0];

// 			// normal
// 			stroke(255, 0, 0);
// 			line(polygonRef.vertices[i    ] + (edge[0] / 2),
// 				polygonRef.vertices[i + 1] + (edge[1] / 2),
// 				polygonRef.vertices[i    ] + (edge[0] / 2) + normal[0],
// 				polygonRef.vertices[i + 1] + (edge[1] / 2) + normal[1]
// 				);
// 			// normal plane
// 			stroke(255, 0, 255);
// 			// radially scale out:
// 			let x0 = polygonRef.vertices[0    ] + normal[0] * normalPlaneRadialScale;
// 			let y0 = polygonRef.vertices[1    ] + normal[1] * normalPlaneRadialScale;
// 			let x1 = polygonRef.vertices[i    ] + normal[0] * normalPlaneRadialScale;
// 			let y1 = polygonRef.vertices[i + 1] + normal[1] * normalPlaneRadialScale;

// 			let scaledCoord0 = linearScale(x0, y0, x0 -normalPlaneAxialScale, slope);
// 			let scaledCoord1 = linearScale(x1, y1, x1 + normalPlaneAxialScale, slope);

// 			line(scaledCoord0[0], scaledCoord0[1], scaledCoord1[0], scaledCoord1[1]);
// 		}
// 	}
// }