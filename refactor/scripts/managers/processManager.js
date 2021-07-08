class ProcessManager
{
    constructor(gl)
    {
        this.renderer = new Renderer(gl)
        this.inputManager = new InputManager(this.renderer); // needs to know about resolution
        this.physicsWorld = new PhysicsWorld();
        // objectManager
        this.arrOfPolygons = new Array();
        //  
        this.previous = window.performance.now();
        this.time = 0;
        this.physicsTime = 0;
        this.accumulator = 0;
        this.distCounter = 0;
        this.init();
    }
    
    init()
    {
        var t1 = new Triangle(this.renderer,  vec3.fromValues(0, 0, 0),  1.0);
        var t2 = new Triangle(this.renderer,  vec3.fromValues(10, 5, 0),  2.0);
        var r1 = new Rectangle(this.renderer, vec3.fromValues(0, -15, 0), 20.0);
        //
        this.arrOfPolygons.push(t1);
        this.arrOfPolygons.push(t2);
        this.arrOfPolygons.push(r1);
        //
        this.physicsWorld.initializeObjects(this.arrOfPolygons);

        this.arrOfPolygons[0].rotate(90);
        this.arrOfPolygons[1].rotate(100);
        this.arrOfPolygons[2].rotate(-45);
    }

    update()
    {
        var now = window.performance.now();
        var delta = (now - this.previous);
        this.previous = now;        
        
        this.accumulator += delta;
        
        if (this.accumulator >= frameDuration)
        {
            this.physicsTime += dt;
            this.physicsProcess(this.physicsTime);
            this.accumulator -= frameDuration;
        }
        this.time += (delta / 1000.0);
        this.renderProcess(this.time)
    }

    physicsProcess(pt)
    {
        vec3.add(this.arrOfPolygons[0].rigidBody.accl,
                 this.arrOfPolygons[0].rigidBody.accl,
                 vec3.fromValues(this.inputManager.keypad[0] * dt / 10,
                                 this.inputManager.keypad[1] * dt / 10,
                                 0));
        this.physicsWorld.process();
    }

    renderProcess(t)
    {
        this.renderer.render(t);
    }
}