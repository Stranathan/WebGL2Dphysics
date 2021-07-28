
var theGUI;

var blah = "yoyoyoyo";

function makeGUI ()
{
    theGUI = 
    {
        SHADER: "base",
        // renderable = {},

        // changeShader: function () 
        // {
        //     console.log(blah);
        // }
    };
    
    var gui = new dat.gui.GUI();
    gui.remember(theGUI);
    gui.add(theGUI, 'SHADER', { wireframe: "base", shaded: "base2"} );
    //gui.add(theGUI, 'changeShader');
}
