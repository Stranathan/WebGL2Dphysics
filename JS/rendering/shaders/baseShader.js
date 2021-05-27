var baseVS = `#version 300 es

precision highp float;

layout (location=0) in vec3 vertexPos;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec3 v_Barycentric;
 
void main()
{
    v_Barycentric[int(mod(float(gl_VertexID), 3.0))] = 1.0;

    gl_Position = projection * view * model * vec4(vertexPos, 1.0);
}
`

var baseFS = `#version 300 es

precision highp float;

in vec3 v_Barycentric;
out vec4 fragColor;

uniform vec2 resolution;
uniform float time;

#define PI (3.1415)

float edgeFactor()
{
    // like the avergae of dFdx & dFdy
    vec3 d = fwidth(v_Barycentric);
    // 
    vec3 val = smoothstep(vec3(0.0), d * 1.5, v_Barycentric);

    // return the min of any of the vector's components
    return min(min(val.x, val.y), val.z);
}

void main()
{
    //vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
    //vec2 uv = gl_FragCoord.xy / vec2(1086., 610.);
    //col = mix(col, vec3(0.0), edgeFactor());
    
    float edgeFactorVal = edgeFactor();
    //vec3 sCol = 0.5 + 0.5*cos(time + uv.xyx + vec3(0,2,4));
    vec3 col = vec3(1., 0.1, 1.0) * (1. - edgeFactorVal);
    fragColor = vec4(col, 1.0);
}`