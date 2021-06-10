/* 
    Check bounding circle radius squared of each polygon with every other polygon once
*/
function pseudoBroadPhase(arrOfPolys)
{
    for(let i = 0; i < arrOfPolygons.length; i++)
    {
        j = i;
        
        while(j < arrOfPolygons.length - 1)
        {
            j += 1;

            let sqrdDist = vec2.squaredDistance(arrOfPolys[i].pos, arrOfPolys[j].pos);
            if(sqrdDist < Math.pow(arrOfPolys[i].radius + arrOfPolys[j].radius, 2))
            {
                //arrOfPolys[i].outlineCol = [255, 255, 0];
                //arrOfPolys[j].outlineCol = [255, 255, 0];
                // narrow phase resolution
                SAT(arrOfPolys[i], arrOfPolys[j])
            }
            else
            {
                arrOfPolys[i].outlineCol = arrOfPolys[i].defaultOutlineCol;
                arrOfPolys[j].outlineCol = arrOfPolys[j].defaultOutlineCol;
            }
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

    keep it D.R.Y --> nested function for project lenght comparisons
*/
function SAT(polygonReferenceA, polygonReferenceB)
{
    function projectedLengthComparison(polygonA, polygonB)
    {
        let overlapBool;

        for(let i = 0; i < polygonA.vertices.length; i+=2)
        {
            let edge;
   
            // each edge to the last vertex
            if(i < polygonA.vertices.length - 2)
            {
                edge = vec2.fromValues(polygonA.vertices[i + 2] - polygonA.vertices[i], 	
                        polygonA.vertices[i + 3] - polygonA.vertices[i + 1] );
            }
            // edge connecting last vertex to first vertex
            else
            {
                edge = vec2.fromValues(polygonA.vertices[0] - polygonA.vertices[i], polygonA.vertices[1] - polygonA.vertices[i + 1]);
            }

            // Create normalized axis from each edge of polygon 
            vec2.normalize(edge, edge);
            
            // Project each vertex's position vector of both polygons onto the axis.
            let minA;
            let maxA;
            for(let a = 0; a < polygonA.vertices.length; a+=2)
            {
                let vertexPositionVec = vec2.fromValues(polygonA.vertices[a], polygonA.vertices[a + 1]);
                let projectedLen = vec2.dot(edge, vertexPositionVec);
                
                //console.log(vec2.str(vertexPositionVec));
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
                // if(isNaN(polygonA.vertices[b]))
                // {
                //     console.log("check index: " + b);
                // }
                let projectedLen = vec2.dot(edge, vertexPositionVec);
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
                overlapBool = true;
                //console.log("we're in here");
            }
            else if(maxB >= maxA && maxA >= minB)
            {
                overlapBool = true;
                //console.log("estamos aqui");
            }
            else
            {
                return false
            }
        }
        return overlapBool;
    }
    // -------- check using edges of polygonA --------
    var overlap = projectedLengthComparison(polygonReferenceA, polygonReferenceB);
    if(overlap == false)
    {
        return;
    }
    // -------- check using edges of polygonB --------
    overlap = projectedLengthComparison(polygonReferenceB, polygonReferenceA);
    if(overlap == false)
    {
        return;
    }
    polygonReferenceA.outlineCol = polygonReferenceA.collisionCol;
    polygonReferenceB.outlineCol = polygonReferenceB.collisionCol;
}