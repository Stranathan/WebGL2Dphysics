class ProcessManager
{
    constructor(gl)
    {
        this.renderer = new Renderer(gl)
        this.inputManager = new InputManager(this.renderer); // needs to know about resolution
        this.physicsWorld = new PhysicsWorld();
        // objectManager
        this.arrOfPolygons = new Array();

        makeGUI(this.arrOfPolygons);
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
        var t1 = new Triangle(this.renderer,  vec3.fromValues(-10, 0, 0),  1.0);
        t1.rotate(90);
        this.arrOfPolygons.push(t1);
        //
        var t2 = new Triangle(this.renderer,  vec3.fromValues(15, 5, 0),  2.0);
        t2.rotate(Math.random() * 100);
        t2.rigidBody.mass = 20;
        t2.rigidBody.inv_mass = 1 / 20;
        this.arrOfPolygons.push(t2);
        //
        
        //create a bunch of random shapes in a grid
        let spacingNum = 2;
        for(let i = 1; i < 5; i++)
        {
            for(let j = 1; j < 5; j++)
            {
                let rnd = Math.floor(Math.random() * 2) + 1;
                let shape;
                if( rnd == 1 )
                {
                    shape = new Triangle(this.renderer,  vec3.fromValues(spacingNum * i, spacingNum * j, 0),  1.0);
                }
                else
                {
                    shape = new Rectangle(this.renderer, vec3.fromValues(spacingNum * i, spacingNum * j, 0), 1.0);
                }
                shape.rigidBody.gravity = false;
                shape.rigidBody.mass = 1.5;
                shape.rigidBody.inv_mass = 1 / shape.rigidBody.mass;
                shape.rotate(Math.random() * 160);
                this.arrOfPolygons.push(shape);
            }
        }
        
        var r1 = new Rectangle(this.renderer, vec3.fromValues(0, -40, 0), 40.0);
        r1.rotate(-45);
        r1.rigidBody.mass = 100;
        r1.rigidBody.inv_mass = 1 / 100;
        this.arrOfPolygons.push(r1);

        this.physicsWorld.initializeObjects(this.arrOfPolygons);
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