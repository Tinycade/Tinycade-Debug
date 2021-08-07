const Beholder = window['beholder-detection'];

var debugText = "Hello world";
var newMarker = new Square(0, new Vec2(100, 100), 5, 180);

function lerp(a,b, c, d, v) {
  return c + (d - c) * (v - a) / (b - a); 
}

//init
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  ctx.textAlign = "center";

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
    if(Beholder.getMarker(4).present)
    {
      var markerID = Beholder.getMarker(4);
      var markerLocation = new Vec2(Beholder.getMarker(4).center); //vec2
      debugText = markerLocation.x;

      var CenterCornerDiff = new Vec2(Beholder.getMarker(4).corners[0].x - Beholder.getMarker(4).center.x, Beholder.getMarker(4).corners[0].y - Beholder.getMarker(4).center.y); //vec2
      var markerSize = Math.sqrt( CenterCornerDiff.x*CenterCornerDiff.x + CenterCornerDiff.y*CenterCornerDiff.y ); //diff

      var markerRotation = Beholder.getMarker(4).rotation;

      //id, location, size, rotation
      //newMarker = new Square(markerID, markerLocation, markerSize, markerRotation);
    }
    else{
      debugText = "hello world";
    }
  //}

  
  //draw a rectangle for each one we have
  //drawing
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDebugText(ctx);
  
  ctx.lineCap = "round";
  newMarker.draw(ctx);

 //marker1.draw(ctx);
}

function drawDebugText() {
  ctx.font = '48px serif';
  
  ctx.fillText(debugText, canvas.width / 2, 50);
}

window.onload = init;
