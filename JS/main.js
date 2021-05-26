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
    var rr = new Renderable(theRenderer, "rectangle");
    
    window.requestAnimationFrame(update); // requestAnimationFrame runs at 60 fps by default

    function update(newTime)
    {
        let deltaTime = (newTime - currentTime) / 1000;
        currentTime = newTime;
        time += deltaTime;

        theRenderer.render(time);
        
        window.requestAnimationFrame(update);
    }
}

main();
