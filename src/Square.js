class Square {
    constructor(markerID) {
        this.currentAngle = 0;
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
    ctx.rect(20, 20, 100, 100);
    ctx.stroke();
    }
}