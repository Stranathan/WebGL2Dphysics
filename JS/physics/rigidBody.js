class RigidBody
{
    constructor(aPhysicsWorld, shape, position)
    {
        this.pos = position;
        this.vel = vec3.create();
        this.accl = vec3.create();
        this.force = vec3.create();
        this.mass = 1;
        this.invMass = 1.0 / this.mass;
        this.gravity = false;

        // this.transformation
        this.shape = new Polygon(shape);
        
        // Shape *shape;
        // Transform tx;
        // Material material;
        // MassData mass_data;
        // Vec2 velocity;
        // Vec2 force;
        // real gravityScale;
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