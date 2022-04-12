# Day 3 - Evolutionary System

For this day, the idea is to make a full evolutionary system, and make it simulate the behaviour of the Darwinian Evolution.

> I've been inspired by some articles and videos, mainly by _TheCodingTrain_ YouTube channel.

## Core Concept

### Step 1: Initialize

```@javascript
  // Population.js constructor
  for(let i = 0; i < popSize; i++) {
    this.animals.push(new Animal());
  }

  // Animal.js constructor
  this.gene = random(0.15, 1);
```

The **population** is a set of **Animals**, and to initialize it, we're pushing an array of new Animals, generated with random DNA.

The **DNA** is a single number in the range 0 .. 1 that represents the **height** and the **speed** of the animal.

### Step 2 & 3: Selection & Reproduction

In this case, since the system is **Real-Time** simulated, there's no thing as a **fitness** value. 

All Animals are born with a **health** value, in this case _200_, which decreases by 1 in every frame of animation. They look for the nearest **food** and wander to it. When the manage to pick it up, their health gets a boost.

```@javascript
  // Animal.js

  // This is inside the update() function
  if(random(1) < 0.001) {
    this.reproduce();
  }

  // Reproduce Function
  this.reproduce = () => {
    let childDNA = new DNA(this.dna);
    childDNA.mutate();
    population.animals.push(new Animal(childDNA));
  }
```
The reproduction works simply as _"The more time an Animal is alife, the more chances it will have to reproduce"_

```@javascript
  // DNA.js
  this.mutate = () => {
    if(random(1) > 0.5) {
      this.gene += random(0, 0.05);
    } else {
      this.gene -= random(0, 0.05);
    }
  }
```
Once an animal reproduces, his child gets through a mutation, which consists on adding or subtracting a random value between 0 and 0.10 to the child's DNA.

### Step 4: Repeat

Since we're on a real-time simulation, there's no "repeating", it just happens to be the same in every single individual.

## Notes

### Slider
I've add a slider that controls the probability of a food spawning higher rather than in the floor.

This makes the simulation be able to see that if all food starts spawning only on higher parts of the _world_, only the tall animals get to live and reproduce, but if the food only spawns at floor level, the average height will decrease, since having more speed will make an animal eat more.

### Max Height Line
I've added a line to visualize the current max height reached in the simulation, just to see how it changes, depending on where the food spawns.
### Observation

I've observed that it takes longer to reduce the average height than to augment it, probably because tall ones can still survive without food at their head level.

## Corrections

- The way I kill the animals is not the best, but the _splice_ function was giving me more problems than solutions. 
- Some things might have a better implementation, but I'm not looking for the most efficient and perfect code, but to learn the basics of the Genetic Algorythms.