class RigidBody
{
    constructor(position, velocity, transform, radius)
    {
        this.pos = position;
        this.radius = radius;
        this.inv_pos = vec3.fromValues(-this.pos[0], -this.pos[1], 0);
        this.vel = velocity;
        this.transform = transform;
        this.vertices = new Array();
        this.gravity = false;
    }
    
    eulerUpdate()
    {
        
    }
    translate(translationVec)
    {
        if(this.pos[0] != translationVec[0] &&
           this.pos[1] != translationVec[1]
          )
        {
            console.log("firing yo");
            // rigidbody:
            let translation = vec3.fromValues(translationVec[0], translationVec[1], 0);
            let transform = mat4.create();
            // transform pos
            this.pos[0] = translationVec[0];
            this.pos[1] = translationVec[1];

            // save for rotation
            this.inv_pos = vec3.fromValues(-this.pos[0], -this.pos[1], 0);
            // transform each vertex
            for(let i in this.vertices)
            {
                vec3.transformMat4(this.vertices[i], this.vertices[i], transform);
            }
            // maintain transform state for rendering:
            mat4.translate(this.transform, transform, translation)
            mat4.scale(this.transform, this.transform, [this.radius, this.radius, this.radius]);
        }
    }

    rotate(angle)
    {
        let rotMat = mat4.create();
        mat4.translate(rotMat, rotMat, this.pos);
        mat4.rotateZ(rotMat, rotMat, angle);
        mat4.scale(this.transform, rotMat, [this.radius, this.radius, this.radius]);

        let copyRotMat = mat4.create();
        mat4.rotateZ(copyRotMat, copyRotMat, angle);
        for(let i in this.vertices)
        {
            vec3.add(this.vertices[i], this.vertices[i], this.inv_pos);
            vec3.transformMat4(this.vertices[i], this.vertices[i], copyRotMat);
            vec3.add(this.vertices[i], this.vertices[i], this.pos);
        }
    }
    
    setPolygonVertices(numPoints, radius)
    {
        let theta = 0;
        let deltaTheta = 2. * Math.PI / numPoints;
        for (let a = 0; a < this.numPoints; a++)
        {
            let xx = this.pos[0] + Math.cos(theta) * radius;
            let yy = this.pos[1] + Math.sin(theta) * radius;
            theta += deltaTheta;
            this.vertices.push(vec3.fromValues(xx, yy, 0));
        }
    }
}