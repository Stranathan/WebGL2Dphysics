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
        for(let i = 0; i < this.objects.length - 1; i++)
        {
            this.objects[i].rigidBody.eulerUpdate();
        }
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