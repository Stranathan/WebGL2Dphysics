class ObjectManager
{
    constructor()
    {
        this.objects = new Array();
    }
    add(anObject)
    {
        this.objects.push(anObject);
    }
    update()
    {
        for(let i in this.objects)
        {
            this.objects[i].update();
        }
    }
}