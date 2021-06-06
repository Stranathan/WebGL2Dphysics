class RigidBody
{
    constructor(aPhysicsWorld, position)
    {
        this.pos = position;
        this.vel = vec3.create();
        this.accl = vec3.create();
        this.force = vec3.create();
        this.mass = 1;
        this.gravity = false;
        aPhysicsWorld.addRigidBody(this);
    }
    eulerUpdate()
    {
        vec3.add(this.accl, this.accl, this.force);
        vec3.add(this.vel, this.vel, this.accl);
        vec3.add(this.pos, this.pos, this.vel);
        vec3.zero(this.force);
        vec3.zero(this.accl);
    }
}