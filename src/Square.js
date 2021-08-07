class Square {
    constructor(markerID, location, size, rotation) {
        this.ID = markerID;
        this.location = location;
        this.size = size;
        this.rotation = rotation;
        // this.pointOffsets = [
        //     Vec2.sub(this.center, p1),
        //     Vec2.sub(this.center, p2),
        //     Vec2.sub(this.center, p3),
        //     Vec2.sub(this.center, p4),
        // ]
    }






    draw(ctx){
    ctx.beginPath();
    //x,y,width,height

    //fill these points with the 
    ctx.rect(100, 100, 100, 100);

    ctx.fillText(this.ID, this.location.x, this.location.y);
    

    ctx.stroke();
    }
}