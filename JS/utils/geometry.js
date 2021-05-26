function makeACircle(numPoints, radius)
{
    let theData = [];
    let theta = 0;
    let deltaTheta = 2.0 * Math.PI / numPoints;
    for(let i = 0; i < numPoints; i++)
    {
        let x = radius * Math.cos(theta);
        let y = radius * Math.sin(theta);

        let xx = radius * Math.cos(theta + deltaTheta);
        let yy = radius * Math.sin(theta + deltaTheta);

        theData.push(0);
        theData.push(0);
        theData.push(0);

        theData.push(x);
        theData.push(y);
        theData.push(0);
        
        theData.push(xx);
        theData.push(yy);
        theData.push(0);
        
        theta += deltaTheta;
    }
    
    let numVerts = numPoints * 3;
    return {vertexData: theData, numVerts: numVerts};
}

var theUnitQuad = 
[
    -1, +1, 0,
    -1, -1, 0,
    +1, -1, 0,
    -1, +1, 0,
    +1, -1, 0,
    +1, +1, 0
];