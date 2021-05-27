class Renderer
{
    constructor(gl)
    {
        this.gl = gl;
        this.clearCol = vec3.fromValues(0.14, 0.14, 0.14);
        //
        this.renderables = new Array();
        //
        this.aspectRatio = this.gl.canvas.width / this.gl.canvas.height;
        this.orthoHeight = theHeight; // settings
        this.orthoWidth = this.orthoHeight * this.aspectRatio;
        //
        this.pos = vec4.fromValues(0, 0, 1, 1.);
        this.up = vec4.fromValues(0.0, 1.0, 0.0, 1.0);
        this.target = vec3.fromValues(0.0, 0.0, 0.0);
        this.view = mat4.create();
        mat4.lookAt(this.view, [this.pos[0], this.pos[1], this.pos[2]], this.target, [this.up[0], this.up[1], this.up[2]]);
        this.projection = mat4.create();
        mat4.ortho(this.projection, -this.orthoWidth / 2., this.orthoWidth / 2., -this.orthoHeight / 2., this.orthoHeight / 2., 1, 100);
        //
        this.availableVaos = new Map();
        this.availablePrograms = new Map();
        //
        this.init();
    }
    init()
    {
        this.gl.clearColor(this.clearCol[0], this.clearCol[1], this.clearCol[2], 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        // ---- managers here
        this.initVAOS();
        this.initShaderPrograms();
    }
    initVAOS()
    {
        // ---- Triangle ----
        var triangleVAO = this.gl.createVertexArray();
        this.gl.bindVertexArray(triangleVAO);
        var triangleVBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangleVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(theUnitTriangle), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttribLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionAttribLoc);
        this.availableVaos.set("triangle", triangleVAO);
        // ---- Rectangle ----
        var rectangleVAO = this.gl.createVertexArray();
        this.gl.bindVertexArray(rectangleVAO);
        var rectangleVBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, rectangleVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(theUnitQuad), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttribLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionAttribLoc);
        this.availableVaos.set("rectangle", rectangleVAO);
        // ---- Circle ----
        var circleVAO = this.gl.createVertexArray();
        this.gl.bindVertexArray(circleVAO);
        var circleVBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, circleVBO);
        let aCircleData = makeACircle(circleNumSides, 1.0);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(aCircleData.vertexData), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttribLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionAttribLoc);
        this.availableVaos.set("circle", circleVAO);
    }
    initShaderPrograms()
    {
        let program = createProgramFromSources(this.gl, baseVS, baseFS);
        let programUTime = this.gl.getUniformLocation(program, "time");
        let programUResolution = this.gl.getUniformLocation(program, "resoluton");
        let programUModel = this.gl.getUniformLocation(program, "model");
        let programUView = this.gl.getUniformLocation(program, "view");
        let programUProjection = this.gl.getUniformLocation(program, "projection");
        this.availablePrograms.set("base", 
            {program: program,
            programUTime: programUTime,
            programUResolution: programUResolution,
            programUModel: programUModel,
            programUView: programUView,
            programUProjection, programUProjection
            });

    }
    add(aRendrable)
    {
        this.renderables.push(aRendrable);
    }
    render(time)
    {
        resize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
        this.aspectRatio = this.gl.canvas.width / this.gl.canvas.height;
        this.orthoWidth = this.aspectRatio * this.orthoHeight;
        this.projection = mat4.create();
        mat4.ortho(this.projection, -this.orthoWidth / 2., this.orthoWidth / 2., -this.orthoHeight / 2., this.orthoHeight / 2., 1, 100);
    
        for(let i in this.renderables)
        {
            this.gl.bindVertexArray(this.renderables[i].vao);
            this.gl.useProgram(this.renderables[i].program);
            
            for( let uniform in this.renderables[i].uniforms)
            {
                switch(uniform)
                {
                    case "time":
                        this.gl.uniform1f(this.renderables[i].uniforms[uniform], time);
                        break;
                    case "resolution":
                        this.gl.uniform2f(this.renderables[i].uniforms[uniform], this.gl.canvas.width, this.gl.canvas.height);
                        break;
                    case "model":
                        this.gl.uniformMatrix4fv(this.renderables[i].uniforms[uniform], false, this.renderables[i].transform);
                        break;
                    case "view":
                        this.gl.uniformMatrix4fv(this.renderables[i].uniforms[uniform], false, this.view); // this is ok as long as we only have one camera
                        break;
                    case "projection":
                        this.gl.uniformMatrix4fv(this.renderables[i].uniforms[uniform], false, this.projection); //  ``
                        break;
                    default:
                        console.log("some weird uniform was attached to the renderable and it doesn't know what to do");
                }
            }
            this.gl.drawArrays(this.renderables[i].primitiveType, 0, this.renderables[i].vertCount);
        }
    }
}