function Population () {

  this.animals = [];

  for(let i = 0; i < popSize; i++) {
    this.animals.push(new Animal());
  }

  this.run = () => {

    let kill = [];
    this.animals.forEach(animal => {
      if(!animal.dead) {
        if(animal.health <= 0) {
          this.computeMaxHeight();
          animal.dead = true;
          animal = null;
        } else {
          animal.update();
          animal.draw();
        }
      }
    })
  }

  this.computeMaxHeight = () => {
    maxHeight = height;
    this.animals.forEach(animal => {
      if (height - animal.dna.gene * 100 < maxHeight) {
        maxHeight = height - animal.dna.gene * 100;
      }
    })
  }

}