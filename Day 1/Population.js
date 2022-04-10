function Population () {
  this.rockets = [];
  this.popsize = 25;

  for (let i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }
  
  this.evaluate = () => {
    let maxfit = 0;

    this.rockets.forEach(rocket => {
      rocket.calcFitness();

      if(rocket.fitness > maxfit) {
        maxfit = rocket.fitness;
      }
    });

    this.rockets.forEach(rocket => {
      rocket.fitness /= maxfit;
    });

    let matingDNA = [];
    this.rockets.forEach(rocket => {
      let n = rocket.fitness * 100;
      for (let i = 0; i < n; i++) {
        matingDNA.push(rocket.dna);
      }
    })
  
    // Create the new generation
    let newRockets = [];
    for(let i = 0; i < this.popsize; i++) {
      let parentA = random(matingDNA);
      let parentB = random(matingDNA);
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