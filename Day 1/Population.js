function Population () {
  this.rockets = [];
  this.popsize = 100;
  this.matingDNA = [];

  for (let i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }
  
  this.computeFitness = () => {
    let maxfit = 0;

    this.rockets.forEach(rocket => {
      rocket.calcFitness();

      if(rocket.fitness > maxfit) {
        maxfit = rocket.fitness;
        rocket.mostFit = true;
      } else {
        rocket.mostFit = false;
      }
    });

    this.rockets.forEach(rocket => {
      rocket.fitness /= maxfit;
    });
  }

  this.evaluate = () => {
    this.computeFitness();

    this.matingDNA = [];
    this.rockets.forEach(rocket => {
      let n = rocket.fitness * 100;
      for (let i = 0; i < n; i++) {
        this.matingDNA.push(rocket.dna);
      }
    })
    this.selection();
  }

  this.selection = () => {
    // Create the new generation
    let newRockets = [];
    for(let i = 0; i < this.popsize; i++) {
      let parentA = random(this.matingDNA);
      let parentB = random(this.matingDNA);
      let child = parentA.crossover(parentB);
      child.mutate();

      newRockets[i] = new Rocket(child);
    }

    this.rockets = newRockets;
  }

  this.run = () => {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].draw();
    }
  }
}