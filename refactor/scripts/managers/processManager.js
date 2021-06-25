class ProcessManager
{
    constructor(gl)
    {
        this.renderer = new Renderer(gl)
        this.inputManager = new InputManager(this.renderer); // needs to know about resolution
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
        var r = new Triangle(this.renderer, vec3.fromValues(screenMousePos[0], screenMousePos[1], 0),  3.0);
        this.arrOfPolygons.push(r);
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
        //physicsWorld.process();
        this.arrOfPolygons[0].translate(screenMousePos);
        this.arrOfPolygons[0].rotate(pt);
    }

    renderProcess(t)
    {
        this.renderer.render(t);
    }
}