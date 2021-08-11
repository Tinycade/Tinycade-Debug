const Beholder = window['beholder-detection'];

//var newMarker = new Square(0, new Vec2(100, 100), 5, 180);
//joystick center
var markerStartingLocation = new Vec2(175, 100);
var markerNum = 1;

var markerStartingLocation2 = new Vec2(175, 100);
var markerNum2 = 2;

//offset from center
var vectorOffset = new Vec2(0,0);
var vectorOffset2 = new Vec2(0,0);

//marker location
var markerLocationX;
var markerLocationY;

var markerLocationX2;
var markerLocationY2;
//markerID
var joystick;
var joystick2;

//test drawing
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

  joystick = Beholder.getMarker(markerNum);
  joystick2 = Beholder.getMarker(markerNum2);

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
  if(joystick.present)
  {
    markerLocationX = Math.round((joystick.center.x * 100) / 100); //vec2
    markerLocationY = Math.round((joystick.center.y * 100) / 100);
    
    vectorOffset.x = markerLocationX - markerStartingLocation.x;
    vectorOffset.y = markerLocationY - markerStartingLocation.y;
  }
  if(joystick2.present)
  {
    markerLocationX2 = Math.round((joystick2.center.x * 100) / 100); //vec2
    markerLocationY2 = Math.round((joystick2.center.y * 100) / 100);
    
    vectorOffset2.x = markerLocationX2 - markerStartingLocation2.x;
    vectorOffset2.y = markerLocationY2 - markerStartingLocation2.y;
  }
  
  if(vectorOffset.x > 3 || vectorOffset.x < -3)
  {
    circleX -= vectorOffset.x * 0.1;
  }
  if(vectorOffset.y > 3 || vectorOffset.y < -3)
  {
    circleY += vectorOffset.y * 0.1;
  }


  
  //draw a rectangle for each one we have
  //drawing
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDebugText();
  //drawCircle();
  drawLine();
  
  ctx.lineCap = "round";
  //newMarker.draw(ctx);

 //marker1.draw(ctx);
}

function drawLine()
{
  ctx.beginPath();
  ctx.moveTo(markerStartingLocation.x, markerStartingLocation.y);
  ctx.lineTo(markerStartingLocation.x - vectorOffset.x, markerStartingLocation.y + vectorOffset.y,);
  ctx.stroke();
}

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
  
  //ctx.fillText("X:" + vectorOffset.x + " Y:" + vectorOffset.y, canvas.width - 200, 50);

  ctx.fillText("X:" + markerLocationX2 + " Y:" + markerLocationY2, canvas.width - 200, 50);
}

function resetCenter(){
  markerStartingLocation.x = Math.round((joystick.center.x * 100) / 100); //vec2
  markerStartingLocation.y = Math.round((joystick.center.y * 100) / 100);
  
  markerStartingLocation2.x = Math.round((joystick2.center.x * 100) / 100); //vec2
  markerStartingLocation2.y = Math.round((joystick2.center.y * 100) / 100);
}

window.onload = init;
