let rockets;
let target;
let lifespan = 400;
let frame = 0;
let generation = 1;

let frameP;
let genP;

let barrierx = 150;
let barriery = 300;
let barrierw = 300;
let barrierh = 15;

function setup () {
  createCanvas(600, 600);
  target = createVector(300, 100);
  rockets = new Population();

  frameP = createP();
  genP = createP();
}

function draw () {
  background(0);

  frameP.html(frame);
  genP.html("Generation " + generation);

  rockets.run();

  frame++;
  
  //Checkpoints for better fittness calculation
  if (frame%50 == 0) {
    rockets.computeFitness();
  }

  if (frame > lifespan) {
    rockets.evaluate();

    frame = 0;
    generation++;
  }

  stroke(255, 0, 255, 150);
  line(target.x, target.y, width/2, height);
  stroke(0);
  ellipse(target.x, target.y, 20);
  rect(barrierx, barriery, barrierw, barrierh);
}