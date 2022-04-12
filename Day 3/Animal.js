function Animal (dna) {

  this.pos = createVector(random(50, width-50), height-1);
  this.vel = createVector();
  this.acc = createVector();

  this.health = 200;
  this.dead = false;
  this.closest = -1;

  this.dna = dna ? dna : new DNA();
  
  if (height - this.dna.gene * 100 < maxHeight) {
    maxHeight = height - this.dna.gene * 100;
  }

  this.reproduce = () => {
    let childDNA = new DNA(this.dna);
    childDNA.mutate();
    population.animals.push(new Animal(childDNA));
  }

  this.applyForce = (force) => {
    this.acc.add(force);
  }

  this.update = () => {
    this.health--;

    this.seek();

    if(this.closest != -1) {
      let target = food[this.closest];
      let h = this.dna.gene * 100;
      let v = (1 / h) * 100;
      if ( target.x > this.pos.x && target.x < this.pos.x + 20 ) {
        if (target.y > this.pos.y - h) {
          this.closest = -1;
          // console.log("eat", target);
          food.splice(this.closest, 1);
          this.health = 200;
          // if (this.health > 200) this.health = 200;
        } else {
          this.closest = -1;
          this.seek();
        }
      }
      stroke(255, 0, 0);
      noFill();
      ellipse(target.x, target.y, 6);

      if (target.x < this.pos.x+10) {
        this.vel.x = -v;
      } else {
        this.vel.x = v;
      }
    }

    if (this.pos.x + this.vel.x < width-20 && this.pos.x + this.vel.x > 0) {
      this.pos.x += this.vel.x;
      // this.pos.add(this.vel);
    } else {
      this.vel.x = 0;
    }
    this.acc.mult(0);

    // Instead of a fitness function, the longer a individual lives, the more chance it has to make a child
    if(random(1) < 0.002) {
      this.reproduce();
    }
     
  }

  this.seek = () => {
    let record = Infinity;
    this.closest = -1;
    let h = this.dna.gene * 100;
    for (let i = 0; i < food.length; i++){
      var d = this.pos.dist(food[i]);
      if (d < record && this.pos.y - h < food[i].y ) {
        record = d;
        this.closest = i;
      }
    }
  }

  this.draw = () => {
    let h = this.dna.gene * 100;
    let alpha = map(this.health, 0, 200, 1, 255);
    stroke(0, alpha);
    fill(0,188,212, alpha);
    rect(this.pos.x, this.pos.y - h, 20, h);
  }

}