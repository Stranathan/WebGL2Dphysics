function seperatingAxisTheorem(polygonRef1, polygonRef2)
{
    var collision = true;
    // ---- check projection overlap for first polygon ----
    // for each edge on first polygon:
    for(let i = 0; i < polygonRef1.vertices.length; i+=2)
    {
        let edge;
        if(i < polygonRef1.vertices.length - 2)
        {
            edge = vec2.fromValues(polygonRef1.vertices[i + 2] - polygonRef1.vertices[i],
                                   polygonRef1.vertices[i + 3] - polygonRef1.vertices[i + 1]
                                  );
            vec2.normalize(edge, edge);
            
            // for each vertex of poly 1, get the max and min projected length onto the expressed edge
            let minProjectedLengthPoly1;
            let maxProjectedLengthPoly1;
            for(let i = 0; i < polygonRef1.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef1.vertices[i], polygonRef1.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly1 = projectedLength;
                    maxProjectedLengthPoly1 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly1 = Math.min(minProjectedLengthPoly1, projectedLength);
                    maxProjectedLengthPoly1 = Math.max(maxProjectedLengthPoly1, projectedLength);
                }
            }
            // for each vertex of poly 2, find the min and max projection lengths
            let minProjectedLengthPoly2;
            let maxProjectedLengthPoly2;
            for(let i = 0; i < polygonRef2.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef2.vertices[i], polygonRef2.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly2 = projectedLength;
                    maxProjectedLengthPoly2 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly2 = Math.min(minProjectedLengthPoly2, projectedLength);
                    maxProjectedLengthPoly2 = Math.max(maxProjectedLengthPoly2, projectedLength);
                }
            }
            
            if(maxProjectedLengthPoly2 >= maxProjectedLengthPoly1 &&  maxProjectedLengthPoly1 >= minProjectedLengthPoly2)
            {
                // there is an axial overlap
                continue;
            }
            else if(maxProjectedLengthPoly1 >= maxProjectedLengthPoly2 &&  maxProjectedLengthPoly2 >= minProjectedLengthPoly1)
            {
                // there is an axial overlap
                continue;
            }
            else
            {
                // no overlap and can immediately end algorithm
                collision = false;
                break;
            }
            
        }
        else
        {
            edge = vec2.fromValues(polygonRef1.vertices[0] - polygonRef1.vertices[i],
                                   polygonRef1.vertices[1] - polygonRef1.vertices[i + 1]
                                  );
            vec2.normalize(edge, edge);

            // for each vertex of poly 1, get the max and min projected length
            let minProjectedLengthPoly1;
            let maxProjectedLengthPoly1;
            for(let i = 0; i < polygonRef1.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef2.vertices[i], polygonRef2.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly1 = projectedLength;
                    maxProjectedLengthPoly1 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly1 = Math.min(minProjectedLengthPoly1, projectedLength);
                    maxProjectedLengthPoly1 = Math.max(maxProjectedLengthPoly1, projectedLength);
                }
            }
            // for each vertex of poly 2, find the min and max projection lengths
            let minProjectedLengthPoly2;
            let maxProjectedLengthPoly2;
            for(let i = 0; i < polygonRef2.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef2.vertices[i], polygonRef2.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly2 = projectedLength;
                    maxProjectedLengthPoly2 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly2 = Math.min(minProjectedLengthPoly2, projectedLength);
                    maxProjectedLengthPoly2 = Math.max(maxProjectedLengthPoly2, projectedLength);
                }
            }
            
            if(maxProjectedLengthPoly2 >= maxProjectedLengthPoly1 &&  maxProjectedLengthPoly1 >= minProjectedLengthPoly2)
            {
                // there is an axial overlap
                continue;
            }
            else if(maxProjectedLengthPoly1 >= maxProjectedLengthPoly2 &&  maxProjectedLengthPoly2 >= minProjectedLengthPoly1)
            {
                // there is an axial overlap
                continue;
            }
            else
            {
                // no collision and take an early out
                collision = false;
                break;
            }
        }
    }
    // check projection overlap for second polygon:
    for(let i = 0; i < polygonRef2.vertices.length; i+=2)
    {
        if(collision == false)
        {
            break;
        }
        
        let edge;

        // for each edge poly 1
        if(i < polygonRef2.vertices.length - 2) // to not null ref array
        {
            edge = vec2.fromValues(polygonRef2.vertices[i + 2] - polygonRef2.vertices[i],
                                   polygonRef2.vertices[i + 3] - polygonRef2.vertices[i + 1]
                                  );
            vec2.normalize(edge, edge);
            
            // for each vertex of poly 1, get the max and min projected length
            let minProjectedLengthPoly1;
            let maxProjectedLengthPoly1;
            for(let i = 0; i < polygonRef1.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef1.vertices[i], polygonRef1.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly1 = projectedLength;
                    maxProjectedLengthPoly1 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly1 = Math.min(minProjectedLengthPoly1, projectedLength);
                    maxProjectedLengthPoly1 = Math.max(maxProjectedLengthPoly1, projectedLength);
                }
            }
            // for each vertex of poly 2, find the min and max projection lengths
            let minProjectedLengthPoly2;
            let maxProjectedLengthPoly2;
            for(let i = 0; i < polygonRef2.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef2.vertices[i], polygonRef2.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly2 = projectedLength;
                    maxProjectedLengthPoly2 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly2 = Math.min(minProjectedLengthPoly2, projectedLength);
                    maxProjectedLengthPoly2 = Math.max(maxProjectedLengthPoly2, projectedLength);
                }
            }
            
            if(maxProjectedLengthPoly2 >= maxProjectedLengthPoly1 &&  maxProjectedLengthPoly1 >= minProjectedLengthPoly2)
            {
                // there is an axial overlap
                continue;
            }
            else if(maxProjectedLengthPoly1 >= maxProjectedLengthPoly2 &&  maxProjectedLengthPoly2 >= minProjectedLengthPoly1)
            {
                // there is an axial overlap
                continue;
            }
            else
            {
                // no collision and take an early out
                collision = false;
                break;
            }
            
        }
        else
        {
            edge = vec2.fromValues(polygonRef1.vertices[0] - polygonRef1.vertices[i],
                                   polygonRef1.vertices[1] - polygonRef1.vertices[i + 1]
                                  );
            vec2.normalize(edge, edge);

            // for each vertex of poly 1, get the max and min projected length
            let minProjectedLengthPoly1;
            let maxProjectedLengthPoly1;
            for(let i = 0; i < polygonRef1.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef2.vertices[i], polygonRef2.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly1 = projectedLength;
                    maxProjectedLengthPoly1 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly1 = Math.min(minProjectedLengthPoly1, projectedLength);
                    maxProjectedLengthPoly1 = Math.max(maxProjectedLengthPoly1, projectedLength);
                }
            }
            // for each vertex of poly 2, find the min and max projection lengths
            let minProjectedLengthPoly2;
            let maxProjectedLengthPoly2;
            for(let i = 0; i < polygonRef2.vertices.length; i+=2)
            {
                let vertexPos = vec2.fromValues(polygonRef2.vertices[i], polygonRef2.vertices[i + 1]);
                let projectedLength = vec2.dot(edge, vertexPos);
                if(i == 0)
                {
                    minProjectedLengthPoly2 = projectedLength;
                    maxProjectedLengthPoly2 = projectedLength;
                }
                else
                {
                    minProjectedLengthPoly2 = Math.min(minProjectedLengthPoly2, projectedLength);
                    maxProjectedLengthPoly2 = Math.max(maxProjectedLengthPoly2, projectedLength);
                }
            }
            
            if(maxProjectedLengthPoly2 >= maxProjectedLengthPoly1 &&  maxProjectedLengthPoly1 >= minProjectedLengthPoly2)
            {
                // there is an axial overlap
                continue;
            }
            else if(maxProjectedLengthPoly1 >= maxProjectedLengthPoly2 &&  maxProjectedLengthPoly2 >= minProjectedLengthPoly1)
            {
                // there is an axial overlap
                continue;
            }
            else
            {
                // no collision and take an early out
                collision = false;
                break;
            }
        }
    }

    if(collision == true)
    {
        polygonRef1.outlineCol = [255, 0, 255];
    }
}

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
                arrOfPolys[i].outlineCol = [255, 255, 0];
                arrOfPolys[j].outlineCol = [255, 255, 0];
            }
            else
            {
                arrOfPolys[i].outlineCol = arrOfPolys[i].defaultOutlineCol;
                arrOfPolys[j].outlineCol = arrOfPolys[j].defaultOutlineCol;
            }
        }
    }
}