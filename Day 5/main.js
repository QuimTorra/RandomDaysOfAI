let debugDrawCheckbox = document.getElementById("debugDraw");

let brain;
var points = [];

function setup() {
  createCanvas(300, 300);

  brain = new Perceptron(2);


  for (var i = 0; i < 100; i++) {
    var x = random(width);
    var y = random(height);

    var out = x >= y ? 1 : 0;
  
    points.push( { input: [x, y], output: out } )
  }

}

function draw() {
  background(150);
  line(0, 0, width, height);

  for (var i = 0; i < points.length; i++) {
    if (points[i].output == 1) {
      fill(0);
    } else {
      fill(255);
    }
    
    if (brain.predict(points[i].input) == points[i].output) {
      stroke(0, 255, 0);
    } else {
      stroke(255, 0, 0);
    }

    var x = points[i].input[0];
    var y = points[i].input[1];

    ellipse(x, y, 8);
  }

  noLoop();
}

function mouseClicked(fxn) {
  console.log(brain.train(points));
  // console.log(brain.weights);
  redraw();
}
