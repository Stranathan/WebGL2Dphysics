/*
    loads all vertex array objects at start of program and
    deletes them before terminating program
*/

class VaoManager
{
    constructor(gl)
    {   
        this.gl = gl;
        this.vaos = {rectangle : 0};
        this.setVaos();
    }
    setVaos()
    {
        var rectangleVAO = gl.createVertexArray();
        this.gl.bindVertexArray(rectangleVAO);
        var rectangleVBO = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, rectangleVBO);

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(theUnitQuad), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttribLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionAttribLoc);
    
        this.vaos.rectangle = rectangleVAO;
    }
    clear()
    {
        for(let vao in this.vaos)
        {
            this.gl.deleteVertexArray(this.vaos[vao]);
        }
    }
}