

class Renderable
{
    constructor(aRenderer, shape)
    {
        this.tag = shape;
        this.vao = aRenderer.availableVaos.get(shape);
        this.transform = mat4.create();
        this.primitiveType = aRenderer.gl.TRIANGLES,
        this.vertCount = 6;
        this.program = aRenderer.availablePrograms.get("base").program;
        this.uniforms = 
        { 
            resolution: aRenderer.availablePrograms.get("base").programUResolution,
            time: aRenderer.availablePrograms.get("base").programUTime,
            model: aRenderer.availablePrograms.get("base").programUModel,
            view: aRenderer.availablePrograms.get("base").programUView,
            projection: aRenderer.availablePrograms.get("base").programUProjection
        };

        aRenderer.add(this);
    }
}
