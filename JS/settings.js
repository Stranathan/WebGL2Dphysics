// ------------------ Time Step/ Time Init ------------------
var renderTime = 0.0;
var frameDeltaTime = 1.0/60.0;
var physicsDeltaTime = 2. * frameDeltaTime;
var processTimeAccumulator = 0.0;
var frameTimeAccumulator = 0.0;
var currentTime = 0.0;
var renderTime = 0.0;
var physicsTime = 0.0;
//
var time = 0.0;

// ------------------ glMatrix Lib Aliases ------------------
var vec2 = glMatrix.vec2;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;
var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;

// ------------------ Attribute binding points ------------------
var positionAttribLoc = 0;
var normalAttribLoc = 1;
var colorAttribLoc = 2;