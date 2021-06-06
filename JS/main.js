"use strict";

function main() 
{
    var canvas = document.getElementById("cc");
    var gl = canvas.getContext("webgl2");

    if (!gl) 
    {
        return;
    }

    // ---- start each subsystem in dependence order ----
    var theRenderer = new Renderer(gl);
    var thePhysicsWorld = new PhysicsWorld(gl);
    var theObjectManager = new ObjectManager;
    var anObject = new Object("circle", vec3.fromValues(Math.floor(Math.random() * theHeight / 2.), Math.floor(Math.random() * theHeight / 2.), 0.0), theRenderer, thePhysicsWorld, theObjectManager);
    var anObject = new Object("rectangle", vec3.fromValues(Math.floor(Math.random() * theHeight / 2.), Math.floor(Math.random() * theHeight / 2.), 0.0), theRenderer, thePhysicsWorld, theObjectManager);

    var theInputManager = new InputManager(thePhysicsWorld.rigidBodies);

    window.requestAnimationFrame(update); // requestAnimationFrame runs at 60 fps by default

    function update(newTime)
    {
        let deltaTime = (newTime - currentTime) / 1000;
        currentTime = newTime;
        time += deltaTime;

        thePhysicsWorld.update(deltaTime);
        theObjectManager.update();
        theRenderer.render(time);
        
        window.requestAnimationFrame(update);
    }
}

main();
