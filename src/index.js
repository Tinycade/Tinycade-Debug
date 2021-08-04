const Beholder = window['beholder-detection'];

var marker1 = new Square();

function lerp(a,b, c, d, v) {
  return c + (d - c) * (v - a) / (b - a); 
}

//init
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

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
  //for the markers that are present:
  //get the size, location, and position of each marker
  //draw a rectangle for each one we have

  //drawing
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.lineCap = "round";

  marker1.draw(ctx);
}

window.onload = init;
