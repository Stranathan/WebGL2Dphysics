/* 
    object has a rigidbody and renderable
*/

class Object
{
    constructor(shape, pos, aRenderer, aPhysicsWorld, anObjectManager)
    {
        this.renderable = new Renderable(aRenderer, shape, pos);  
        this.rigidBody = new RigidBody(aPhysicsWorld, shape, pos);
        anObjectManager.add(this);
    }
    update()
    {
        this.renderable.update(this.rigidBody.pos);
    }
}