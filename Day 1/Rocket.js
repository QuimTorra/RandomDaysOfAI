function Rocket(dna) {
  if (dna) {
    this.dna = dna;
  }
  else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.pos = createVector(width/2, height);
  this.vel = createVector(0, -1);
  this.acc = createVector();

  this.crashed = false;
  this.success = false;
  this.gotThrough = false;

  this.mostFit = false;

  this.calcFitness = () => {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, width, width, 0);

    if (this.crashed) {
      this.fitness /= 10;
    }
    if (this.success) {
      let fr = map(frame, 0, lifespan, 0, 6);
      this.fitness *= 10 + fr^2;
    }
  }

  this.applyForce = (force) => {
    this.acc.add(force);
  }

  this.update = () => {
    if (dist(this.pos.x, this.pos.y, target.x, target.y) < 10) {
      this.success = true;
      this.pos = target.copy();
    }

    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.crashed = true;
    }
    if (this.pos.x > barrierx && this.pos.x < barrierx + barrierw &&
      this.pos.y > barriery && this.pos.y < barriery + barrierh) {
        this.crashed = true;
      }

    if (!this.crashed && !this.success) {
      this.applyForce(this.dna.genes[frame]);

      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

    }

  }

  this.draw = () => {
    push();
    if (this.mostFit) {
      fill(0, 255, 0);
    }
    translate(this.pos.x, this.pos.y);

    rotate(this.vel.heading());  
    rectMode(CENTER);
    rect(0, 0, 30, 10);
    pop();
  }

}