class RigidBody
{
    constructor(aPhysicsWorld, position)
    {
        this.pos = position;
        this.vel = vec3.create();
        this.accl = vec3.create();
        this.mass = 1;
        this.gravity = true;
        aPhysicsWorld.addRigidBody(this);
    }
    eulerUpdate(dt)
    {
        vec3.add(this.vel, this.vel, this.accl);
        vec3.add(this.pos, this.pos, this.vel);
        vec3.zero(this.accl);
    }
}