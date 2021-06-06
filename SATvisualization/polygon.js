class Polygon
{
    constructor(pos, radius, npoints, aCol)
    {
        this.pos = pos;
        this.radius = radius;
        this.numPoints = npoints;
        this.vertices = new Array();
        //this.normals = new Array();
        this.col = aCol;
        this.init();
    }
    init()
    {
        stroke(this.col[0], this.col[1], this.col[2]);
        let theta = 0;
        let deltaTheta = TWO_PI / this.numPoints;
        beginShape();
        for (let a = 0; a < this.numPoints; a++)
        {
            let xx = this.pos[0] + cos(theta) * this.radius;
            let yy = this.pos[1] + sin(theta) * this.radius;
            theta += deltaTheta;
            this.vertices.push(xx);
            this.vertices.push(yy);
            vertex(xx, yy);
        }
	    endShape(CLOSE);
    }
    translate(aTranslationVec)
    {
        let relX = aTranslationVec[0] - this.pos[0];
        let relY = aTranslationVec[1] - this.pos[1];
        this.pos[0] = aTranslationVec[0];
        this.pos[1] = aTranslationVec[1];

        // go through each vertex and translate by same vector
        for(let i = 0; i < this.vertices.length; i+=2)
        {
            this.vertices[i] += relX;
            this.vertices[i+1] += relY;
        }
    }
    display()
    {
        stroke(this.col[0], this.col[1], this.col[2]);
        beginShape();
        for (let i = 0; i < this.vertices.length; i+=2)
        {
            vertex(this.vertices[i], this.vertices[i + 1]);
        }
	    endShape(CLOSE);
    }
}