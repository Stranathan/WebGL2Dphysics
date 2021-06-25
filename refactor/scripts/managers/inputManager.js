class InputManager
{
    constructor(renderer)
    {
        this.renderer = renderer;
        //
        window.addEventListener( "mouseDown", this.mouseDown);
        window.addEventListener( "mousemove", this.mouseMove);
        window.addEventListener( "mouseup", this.mouseUp);
    }
    mouseDown = event => 
    {}
    mouseMove = event => 
    {
        let x =  2. * ( event.clientX - .5 * this.renderer.gl.canvas.width  ) / this.renderer.gl.canvas.width;
        let y = -2. * ( event.clientY - .5 * this.renderer.gl.canvas.height ) / this.renderer.gl.canvas.height;
        // console.log("(" + x.toFixed(2) + ", " + y.toFixed(2) + ")");
        x *= (this.renderer.orthoWidth  / 2);
        y *= (this.renderer.orthoHeight  / 2);
        // console.log("(" + x.toFixed(2) + ", " + y.toFixed(2) + ")");
        screenMousePos[0] =  x;
        screenMousePos[1] =  y;
    }
    mouseUp = event => 
    {}
}