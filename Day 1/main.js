let rockets;
let target;
let lifespan = 200;
let frame = 0;
let generation = 1;

let frameP;
let genP;

function setup () {
  createCanvas(600, 600);
  target = createVector(500, 100);
  rockets = new Population();

  frameP = createP();
  genP = createP();
}

function draw () {
  background(0);
  stroke(255, 0, 255, 150);
  line(target.x, target.y, width/2, height);
  stroke(0);
  ellipse(target.x, target.y, 20);

  frameP.html(frame);
  genP.html("Generation " + generation);

  rockets.run();

  frame++;
  if (frame > lifespan) {
    rockets.evaluate();

    frame = 0;
    generation++;
  }
}