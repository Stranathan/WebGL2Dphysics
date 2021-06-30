class RigidBody
{
    constructor(position, velocity, transform, radius)
    {
        this.pos = position;
        this.angle = 0;
        this.radius = radius;
        this.inv_pos = vec3.fromValues(-this.pos[0], -this.pos[1], 0);
        this.vel = velocity;
        this.transform = transform;
        this.vertices = new Array();
        this.geometry = new Array();
        this.gravity = false;
        this.scaleVec = vec3.fromValues(this.radius, this.radius, this.radius);
    }
    
    eulerUpdate()
    {
        
    }
    rotate(angle)
    {
        let theta = toRadians(angle);
        this.angle = theta;
        
        let transform = mat4.create();
        mat4.rotateZ(transform, transform, this.angle);

        for(let i in this.vertices)
        {
            vec3.add(this.vertices[i], this.vertices[i], this.inv_pos);
            vec3.transformMat4(this.vertices[i], this.vertices[i], transform);
            vec3.add(this.vertices[i], this.vertices[i], this.pos);
        }
        let translatation = mat4.create();
        mat4.translate(translatation, translatation, this.pos);
        mat4.multiply(this.transform, translatation, transform);
        mat4.scale(this.transform, this.transform, this.scaleVec)
    }
    translate(translationVec)
    {
        let translation = vec3.fromValues(translationVec[0], translationVec[1], 0);
        vec3.add(this.pos, this.pos, translation);
        this.inv_pos = vec3.fromValues(-this.pos[0], -this.pos[1], 0);
        let transform = mat4.create();
        mat4.translate(transform, transform, translation)
        for(let i in this.vertices)
        {
            vec3.transformMat4(this.vertices[i], this.vertices[i], transform);
        }
        transform = mat4.create();
        mat4.translate(transform, transform, this.pos);
        mat4.rotateZ(transform, transform, this.angle);
        mat4.scale(this.transform, transform, [this.radius, this.radius, this.radius]);
    }
    setPolygonVertices(numPoints, radius)
    {
        let theta = 0;
        let deltaTheta = 2 * Math.PI / numPoints;
        for (let a = 0; a < numPoints; a++)
        {
            let xx = this.pos[0] + Math.cos(theta) * radius;
            let yy = this.pos[1] + Math.sin(theta) * radius;
            theta += deltaTheta;
            this.vertices.push(vec3.fromValues(xx, yy, 0));
            this.geometry.push(vec3.fromValues(xx, yy, 0))
        }
    }
}