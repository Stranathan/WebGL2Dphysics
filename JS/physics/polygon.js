class Polygon
{
    constructor(pos, radius, npoints)
    {
        this.pos = vec2.fromValues(pos[0], pos[1]);
        this.radius = 1;
        this.numPoints = npoints;
        this.vertices = new Array();
        this.init();
    }
    init()
    {
        let theta = 0;
        let deltaTheta = 2. * Math.PI / this.numPoints;
        for (let a = 0; a < this.numPoints; a++)
        {
            let xx = this.pos[0] + cos(theta) * this.radius;
            let yy = this.pos[1] + sin(theta) * this.radius;
            theta += deltaTheta;
            this.vertices.push(xx);
            this.vertices.push(yy);
        }
    }
    translate(translationVec)
    {
        vec2.add(this.pos, this.pos, translationVec);
        for(let i = 0; i < this.vertices.length; i+=2)
        {
            this.vertices[i] += translationVec[0];
            this.vertices[i+1] += translationVec[1];
        }
    }
    rotate(angle)
    {
        let theta = toRadians(angle);
        let translationVec = vec2.create();
        vec2.scale(translationVec, this.pos, -1)
        this.translate(translationVec);

        for(let i = 0; i < this.vertices.length; i+=2)
        {
            let x = Math.cos(theta) * this.vertices[i] - Math.sin(theta) * this.vertices[i + 1];
            let y = Math.sin(theta) * this.vertices[i] + Math.cos(theta) * this.vertices[i + 1];
            this.vertices[i    ] = x;
            this.vertices[i + 1] = y;
        }

        vec2.scale(translationVec, translationVec, -1)
        this.translate(translationVec);

        // let rotMat = mat2.create();
        // mat2.rotate(rotMat, rotMat, theta);
        // vec2.transformMat2(this.pos, this.pos, rotMat)
    }

    accept(visitorFunction)
    {
        visitorFunction(this);
    }
}