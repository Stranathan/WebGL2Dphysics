/**
 * Example function in JavaScript
 * A, B are rigidBody objects
 * Uses glMatrix as its vector/ matrix library
 */
 function resolveCollision(A, B, mtv)
 {
    // relative velocity
    let relativeVelocity = vec3.create();
    vec3.subtract(relativeVelocity, A.vel, B.vel);

    // contactNormal
    let contactNormal = vec3.create();
    vec3.subtract(contactNormal, A.pos, B.pos);
    vec3.normalize(contactNormal, contactNormal);
    
    let seperatingVelocityMagnitude = vec3.dot( relativeVelocity, contactNormal );

    // Do not resolve if velocities are separating
    if(seperatingVelocityMagnitude > 0)
        return;

    // Take least elastic restitutionCoeff coefficient
    let e = Math.min( A.restitutionCoeff, B.restitutionCoeff);
    // Calculate part of the impulse in the direction of the contact normal
    // -(1 + e) * relativeVelocity / (A.inv_mass - B.inv_mass)
    vec3.scale(relativeVelocity, relativeVelocity, -(1 + e) / (A.inv_mass + B.inv_mass));

    let impulse = vec3.create();
    let theMTV = vec3.fromValues(-mtv[0], -mtv[1], 0);
    vec3.normalize(theMTV, theMTV);
    // For friction:
    let tangentialDir = vec3.fromValues(theMTV[1], -theMTV[0], 0.0);
    //
    let impulseMagnitudeInContactNormal = vec3.dot(relativeVelocity, theMTV);

    vec3.scale(impulse, theMTV, impulseMagnitudeInContactNormal);

    // Apply impulse to bodies' velocities
    let tmp = vec3.create();
    vec3.scale(tmp, impulse, 1.0 / A.mass);

    vec3.add(A.vel, A.vel, tmp); 
    tmp = vec3.create();
    vec3.scale(tmp, impulse, 1.0 / B.mass);
    vec3.subtract(B.vel, B.vel, tmp);

    // add friction
    // F_fr = -mu * |F_n| * tangential_comp_vel
    let mu = 0.43;
    let F_n = impulseMagnitudeInContactNormal;
    let A_VelTangentialComponentMagnitude = vec3.dot(tangentialDir, A.vel);
    let friction = vec3.create();
    vec3.scale(friction, tangentialDir, -mu * F_n * A_VelTangentialComponentMagnitude);
    vec3.add(A.vel, A.vel, friction); 

    vec3.scale(friction, friction, -1);
    vec3.add(B.vel, B.vel, friction); 
}