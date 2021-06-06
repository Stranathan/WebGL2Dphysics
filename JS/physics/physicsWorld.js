class PhysicsWorld
{
    constructor()
    {
        this.rigidBodies = new Array();
    }
    addRigidBody(aRigidBody)
    {
        this.rigidBodies.push(aRigidBody);
    }
    update(dt)
    {
        for(let i in this.rigidBodies)
        {
            if(this.rigidBodies[i].gravity)
            {
                let force = vec3.fromValues(0., this.rigidBodies[i].mass * littleG * dt * dt, 0.);
                vec3.add(this.rigidBodies[i].force, this.rigidBodies[i].force, force);
                this.rigidBodies[i].eulerUpdate();
            }
            else
            {
                this.rigidBodies[i].eulerUpdate();
            }
        }
    }
}