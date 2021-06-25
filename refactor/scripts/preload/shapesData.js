var triangleRenderingVertices = [];

makeTriangleRenderingVertices();

function makeTriangleRenderingVertices()
{
    let theta = 0;
    let deltaTheta = 2. * Math.PI / 3;
    for (let a = 0; a < 3; a++)
    {
        let xx = Math.cos(theta);
        let yy = Math.sin(theta);
        triangleRenderingVertices.push(xx);
        triangleRenderingVertices.push(yy);
        theta += deltaTheta;
    }
}

