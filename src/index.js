const Beholder = window['beholder-detection'];

var newMarker = new Square(0, new Vec2(100, 100), 5, 180);
var markerStartingLocation = new Vec2(175, 100);
var vectorOffset;
var markerLocationX;
var markerLocationY;
var joystick1;

var circleX = 200;
var circleY = 200;

function lerp(a,b, c, d, v) {
  return c + (d - c) * (v - a) / (b - a); 
}

//init
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  ctx.textAlign = "center";

  joystick1 = Beholder.getMarker(4);

  requestAnimationFrame(update);
}

let prevTime = Date.now();

function update() {

  //beholder update
  Beholder.update();

  //time stuff
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  prevTime = currentTime;

  //update for game elements
  //check for each marker 0-9
  //for (let i = 0; i < 10; i++) {
    //for the markers that are present:
    if(joystick1.present)
    //if(true)
    {
      markerLocationX = Math.round((joystick1.center.x * 100) / 100); //vec2
      markerLocationY = Math.round((joystick1.center.y * 100) / 100);
      
      //vectorOffset = Vec2.sub(markerStartingLocation.x, markerLocation.x);

      //debugText = Math.round(markerLocation * 100) / 100;
      //var CenterCornerDiff = new Vec2(Beholder.getMarker(4).corners[0].x - Beholder.getMarker(4).center.x, Beholder.getMarker(4).corners[0].y - Beholder.getMarker(4).center.y); //vec2
      //var markerSize = Math.sqrt( CenterCornerDiff.x*CenterCornerDiff.x + CenterCornerDiff.y*CenterCornerDiff.y ); //diff

      //var markerRotation = Beholder.getMarker(4).rotation;

      //id, location, size, rotation
      //newMarker = new Square(markerID, markerLocation, markerSize, markerRotation);
    }
  //}

  
  //draw a rectangle for each one we have
  //drawing
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDebugText();
  drawCircle();
  //drawLine();
  
  ctx.lineCap = "round";
  //newMarker.draw(ctx);

 //marker1.draw(ctx);
}

// function drawLine()
// {
//   ctx.beginPath();
//   ctx.moveTo(markerStartingLocation.x, markerStartingLocation.y);
//   ctx.lineTo(markerStartingLocation.x + vectorOffset.x, markerStartingLocation.y + vectorOffset.y,);
//   ctx.stroke();
// }

function drawCircle()
{
  ctx.beginPath();
  //x,y,rad,startang,endang
  ctx.arc(circleX, circleY, 25, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function drawDebugText() {
  ctx.font = '35px serif';
  
  ctx.fillText("X:" + markerLocationX + " Y:" + markerLocationY, canvas.width - 200, 50);
}

window.onload = init;
