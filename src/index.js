const Beholder = window['beholder-detection'];

var debugText = "Hello world";

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
  for (let i = 0; i < 10; i++) {
    //for the markers that are present:
    if(Beholder.getMarker(i).present)
    {
      console.log(Beholder.getMarker(i));
      var markerID = Beholder.getMarker(i);
      var markerLocation = new Vec2(Beholder.getMarker(i).center); //vec2

      var CenterCornerDiff = new Vec2(Beholder.getMarker(i).corners[0].x - Beholder.getMarker(i).center.x, Beholder.getMarker(i).corners[0].y - Beholder.getMarker(i).center.y); //vec2
      var markerSize = Math.sqrt( CenterCornerDiff.x*CenterCornerDiff.x + CenterCornerDiff.y*CenterCornerDiff.y ); //diff

      var markerRotation = Beholder.getMarker(i).rotation;

      //id, location, size, rotation
      var newMarker = new Square(markerID, markerLocation, markerSize, markerRotation);
    }
  }

  
  //draw a rectangle for each one we have
  //drawing
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDebug(ctx);
  
  ctx.lineCap = "round";

 //marker1.draw(ctx);
}

function drawDebug() {
  ctx.font = '48px serif';
  
  ctx.fillText(debugText, canvas.width / 2, 50);
}

window.onload = init;
