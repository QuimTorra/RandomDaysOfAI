let popSize = 15;

let frame = 0;

let floorToTreeRatio = 0.5;
let ratioSlider;

let food = [];

let population;

let maxHeight;

function setup() {
  createCanvas(900, 300);
  maxHeight = height;
  population = new Population();

  for(let i = 0; i < 100; i++) {
    let r = random(1);
    if (frame % 10 == 0) {
      if (r > floorToTreeRatio) {
        food.push( createVector(random(0, width), height-1) );
      } else {
        food.push( createVector(random(0, width), random(height-60, height-100)) );
      }
    }
  }

  ratioSlider = createSlider(0, 1, 0.5, 0.01);
}

function draw() {
  floorToTreeRatio = ratioSlider.value();
  background(200);
  population.run();

  // Show MaxHeight
  strokeWeight(3);
  stroke(138, 74, 243, 155);
  line(0, maxHeight, width, maxHeight);
  strokeWeight(1);

  // Generate food
  let r = random(1);
  if (frame % 5 == 0) {
    if (r > floorToTreeRatio) {
      food.push( createVector(random(0, width), height-1) );
    } else {
      food.push( createVector(random(0, width), random(height-60, height-100)) );
    }
  }

  // Draw food
  food.forEach(el => {
    stroke(0);
    fill(0, 240, 0);
    ellipse(el.x, el.y, 4);
  })

  frame++;
}