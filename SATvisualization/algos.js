/* 
    Check bounding circle radius squared of each polygon with every other polygon once
*/
function pseudoBroadPhase(arrOfPolys)
{
    for(let i = 0; i < arrOfPolygons.length - 1; i++)
    {
        let j = i + 1;
        
        while(j < arrOfPolygons.length)
        {
            let sqrdDist = vec2.squaredDistance(arrOfPolys[i].pos, arrOfPolys[j].pos);
            if(sqrdDist < Math.pow(arrOfPolys[i].radius + arrOfPolys[j].radius, 2))
            {
                // narrow phase resolution
                let collisionObject = SAT(arrOfPolys[i], arrOfPolys[j]);

                if(collisionObject.collision)
                {
                    stroke([0, 0, 255]);
                    line(arrOfPolys[i].pos[0],
                        arrOfPolys[i].pos[1],
                        arrOfPolys[i].pos[0] + collisionObject.mvt[0],
                        arrOfPolys[i].pos[0] + collisionObject.mvt[1]);

                    arrOfPolys[i].outlineCol = arrOfPolys[i].collisionCol;
                    arrOfPolys[j].outlineCol = arrOfPolys[j].collisionCol;
                }
                else
                {
                    arrOfPolys[i].outlineCol = arrOfPolys[i].defaultOutlineCol;
                    arrOfPolys[j].outlineCol = arrOfPolys[j].defaultOutlineCol;
                }
            }
            j += 1;
        }
    }
}

/* 
    Narrow Phase intersection test.

    * Create normalized axis from each edge of polygon.
    * Project each position vector of both polygons onto the axis.
    * Find max and min projections for each polygon and compare to see if they overlap.
    * If there are any non-overlapping projections, exit algorithm.
    
    aPolygon.vertices = [x0, y0, x1, y1 ... xN, yN]

    keep it D.R.Y --> nested function for projected length comparisons
*/
function SAT(polygonReferenceA, polygonReferenceB)
{
    function projectedLengthComparison(polygonA, polygonB, mvtReference)
    {
        
        let overlapBool;
        let mvtMagnitude;
        let mvtDir;

        for(let i = 0; i < polygonA.vertices.length; i+=2)
        {
            let edge;
            let normal;
            // edges and normals from first vertex until second to last vertex
            if(i < polygonA.vertices.length - 2)
            {
                edge = vec2.fromValues(polygonA.vertices[i + 2] - polygonA.vertices[i], 	
                        polygonA.vertices[i + 3] - polygonA.vertices[i + 1] );
                normal = vec2.fromValues(edge[1], -edge[0]);
            }
            // edge and normal from last vertex to first vertex
            else
            {
                edge = vec2.fromValues(polygonA.vertices[0] - polygonA.vertices[i], polygonA.vertices[1] - polygonA.vertices[i + 1]);
                normal = vec2.fromValues(edge[1], -edge[0]);
            }

            // Create normalized axis from each edge of polygon 
            vec2.normalize(normal, normal);
            
            // Project each vertex's position vector of both polygons onto the axis.
            let minA;
            let maxA;
            for(let a = 0; a < polygonA.vertices.length; a+=2)
            {
                let vertexPositionVec = vec2.fromValues(polygonA.vertices[a], polygonA.vertices[a + 1]);
                let projectedLen = vec2.dot(normal, vertexPositionVec);
                
                if(a == 0)
                {
                    minA = projectedLen;
                    maxA = projectedLen;
                }
                else
                {
                    minA = Math.min(projectedLen, minA);
                    maxA = Math.max(projectedLen, maxA);
                }
            }
            let minB;
            let maxB;
            for(let b = 0; b < polygonB.vertices.length; b+=2)
            {
                let vertexPositionVec = vec2.fromValues(polygonB.vertices[b], polygonB.vertices[b + 1]);
                let projectedLen = vec2.dot(normal, vertexPositionVec);

                if(b == 0)
                {
                    minB = projectedLen;
                    maxB = projectedLen;
                }
                else
                {
                    minB = Math.min(projectedLen, minB);
                    maxB = Math.max(projectedLen, maxB);
                }
            }

            if(maxA >= maxB && maxB >= minA)
            {
                if(i == 0)
                {
                    mvtMagnitude =  maxB - minA;
                    mvtDir = normal;
                }
                else
                {
                    if(mvtMagnitude > (maxB - minA))
                    {
                        mvtMagnitude =  maxB - minA;
                        mvtDir = normal;
                    }
                }
                overlapBool = true;
            }
            else if(maxB >= maxA && maxA >= minB)
            {
                if(i == 0)
                {
                    mvtMagnitude =  maxA - minB;
                    mvtDir = normal;
                }
                else
                {
                    if(maxA - minB < mvtMagnitude)
                    {
                        mvtMagnitude =  maxA - minB;
                        mvtDir = normal;
                    }
                }
                overlapBool = true;
            }
            else
            {
                return false
            }
        }
        
        vec2.scale(mvtReference, mvtDir, mvtMagnitude);
        return overlapBool;
    }

    // --------   --------
    let minimumTranslationVector = vec2.create();
    // -------- check using edges of polygonA --------
    if(!projectedLengthComparison(polygonReferenceA, polygonReferenceB, minimumTranslationVector))
    {
        return {collision: false, mvt: vec2.create()};
    }
    // -------- check using edges of polygonB --------
    if(!projectedLengthComparison(polygonReferenceB, polygonReferenceA, minimumTranslationVector))
    {
        return {collision: false, mvt: vec2.create()};
    }
    return {collision: true, mvt: minimumTranslationVector}
}