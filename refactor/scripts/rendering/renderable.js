// "Abstract" class for polygons"

class Renderable
{
    constructor(aRenderer, aTransform)
    {
        this.renderer = aRenderer;
        //this.positionComponent = aPositionComponent;
        this.vao;
        //this.transform = mat4.create();
        this.transform = aTransform;
        this.vertCount;
        //mat4.translate(this.transform, this.transform, this.positionComponent.position); // positionComponent.position should be a vec3
        this.primitiveType = this.renderer.gl.TRIANGLES; // otherwise wireframe shader won't work
        this.program = this.renderer.availablePrograms.get("base").program;
        this.uniforms = 
        { 
            resolution: this.renderer.availablePrograms.get("base").programUResolution,
            time: this.renderer.availablePrograms.get("base").programUTime,
            model: this.renderer.availablePrograms.get("base").programUModel,
            view: this.renderer.availablePrograms.get("base").programUView,
            projection: this.renderer.availablePrograms.get("base").programUProjection
        };
    }    
}