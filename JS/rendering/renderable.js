

class Renderable
{
    constructor(aRenderer, shape, pos)
    {
        this.pos = vec3.clone(pos);
        this.tag = shape;
        this.vao = aRenderer.availableVaos.get(shape);
        this.transform = mat4.create();
        mat4.translate(this.transform, this.transform, this.pos);
        this.primitiveType = aRenderer.gl.TRIANGLES,
        //this.vertCount = 6;
        this.program = aRenderer.availablePrograms.get("base").program;
        this.uniforms = 
        { 
            resolution: aRenderer.availablePrograms.get("base").programUResolution,
            time: aRenderer.availablePrograms.get("base").programUTime,
            model: aRenderer.availablePrograms.get("base").programUModel,
            view: aRenderer.availablePrograms.get("base").programUView,
            projection: aRenderer.availablePrograms.get("base").programUProjection
        };
        switch(shape) {
            case "triangle":
                this.vertCount = 3;
                break;
            case "rectangle":
                this.vertCount = 6;
                break;
            case "circle":
                this.vertCount = circleNumSides * 3;
                // console.log(circleNumSides * 3);
                break;
            default:
                console.log("you typed in a shape that doesn't exist")
                this.vertCount = 3;
          }
        aRenderer.add(this);
    }
    update(aPos)
    {
        this.pos = aPos;
        this.transform = mat4.create();
        mat4.translate(this.transform, this.transform, this.pos);
    }
}
