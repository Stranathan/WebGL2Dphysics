class PhysicsWorld 
{
    constructor()
    {
        this.objects;
        this.gravity = vec3.fromValues();
    }
    
    addObject(obj)
    {
        if(this.objects)
        {
            this.objects.push(obj);
        }
        else
        {
            this.objects.push(obj);
        }
    }
    initializeObjects(arr)
    {
        this.objects = arr;
    }
    // removeObject(){}
    process()
    {
        this.objects[0].rigidBody.eulerUpdate();
        //console.log(this.objects[0].rigidBody.pos);
        this.resolveCollisions();
    }

    resolveCollisions()
    {
        if(this.objects)
        {
            pseudoBroadPhase(this.objects);
        }
    }
}