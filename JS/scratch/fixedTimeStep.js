let processTime = (newTime - currentTime)/1000.0;
currentTime = newTime;
processTimeAccumulator += processTime;


// Render Loop -- only render every frameDeltaTime
while (processTimeAccumulator >= frameDeltaTime)
{
    processTimeAccumulator -= frameDeltaTime;
    frameTimeAccumulator += frameDeltaTime;
    renderTime += frameDeltaTime;

    // inputHandler.update();

    // physics Loop -- only calculate every physicsDeltaTime
    while (frameTimeAccumulator >= physicsDeltaTime)
    {
        frameTimeAccumulator -= physicsDeltaTime;
        physicsTime += physicsDeltaTime;
        // physicsWorld.update(physicsTime)
    }
}