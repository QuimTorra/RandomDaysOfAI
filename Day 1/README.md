# Day 1 -- Rockets

> _This has been made, following the smart rockets video by TheCodingTrain_

I've implemented a simple Genetic Algorythm, to get a population of rockets to reach a certain target.

Components:
- **main.js**
  - Main entrypoint for the code, where the Canvas, the Target, the Barrier and the Population are created.
- **Population.js**
  - The Population Object, consisting of an array of Rockets.
  - Methods: Run, ComputeFitness, Evaluate and Selection.
- **Rocket.js**
  - The Rocket Object, has a DNA object associated.
  - Has a basic Physics Engine to calculate forces, collisions and position.
  - Methods: CalcFitness, ApplyForce, Update, Draw.
- **DNA.js**
  - The DNA Object, represents a set of genes.
  - A _gene_ is a 2Dvector which the rocket will apply as a force on a certain frame.
  - Methods: Crossover, Mutate.

## Mutation

> _code from [DNA.js]_
```@javascript
  this.mutate = () => {
    this.genes.forEach(gene => {
      if (random(1) < 0.1) {
        gene = p5.Vector.random2D();
        gene.setMag(0.2);
      }
    });
  }
```

I've tried to modify the amount of random mutation that a child gets, but what I've seen, is that it tends to mutate only in the last bits of the DNA, which probably is because of a flaw in the code, but I haven't been able to see it.

## Fitness

> _code from [Rocket.js]_
```@javascript
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
```

Also, I've tried modifying the fitness, while in the _TheCodingTrain_ video, fitness is calculated by the distance between the rocket and the target, and I've tried to implement a way to reward with more fitness to the fastest rocket to reach the target, but it hasn't shown to work as intended, or it didn't have as much impact as I thought it would have.