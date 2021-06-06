class InputManager
{
    constructor(rbs)
    {
        this.rigidBodies = rbs;
        window.addEventListener( "keypress", this.keypressed);
    }
    keypressed = event => 
    {
        console.log(event.code);
        let force = vec3.create();

        switch(event.code)
        {
            case "KeyW":
                if(this.rigidBodies.length == 0)
                {
                    break;
                }
                force[1] = 0.01;
                vec3.add(this.rigidBodies[0].force, this.rigidBodies[0].force, force);
                break;
            case "KeyA":
                if(this.rigidBodies.length == 0)
                {
                    break;
                }
                force[0] = -0.01;
                vec3.add(this.rigidBodies[0].force, this.rigidBodies[0].force, force);
                break;
            case "KeyS":
                if(this.rigidBodies.length == 0)
                {
                    break;
                }
                force[1] = -0.01;
                vec3.add(this.rigidBodies[0].force, this.rigidBodies[0].force, force);
                break;
            case "KeyD":
                if(this.rigidBodies.length == 0)
                {
                    break;
                }
                force[0] = 0.01;
                vec3.add(this.rigidBodies[0].force, this.rigidBodies[0].force, force);
                break;
        }
    }
}