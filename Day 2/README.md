# Day 2 - Shakespeare Monkey

The goal is to get a prewritten sentence by generating random sets of characters using a Genetic Algorythm.

> _For this I'm not looking at any source code, just figuring out how to do it by myself_

## Core Concept

### Step 1: Initialize

```@javascript
  for (let i = 0; i < popSize; i++) {
    let generatedStr = "";
    for (let j = 0; j < answer.length; j++) {
      generatedStr += randomChar();
    }
    population[i] = generatedStr;
  }  
```

We have a Population, which is an Array of _N_ strings generated randomly. 

### Step 2: Selection

```@javascript
  population.forEach(ans => {
    let score = 0;
    for (let i = 0; i < ans.length; i++) {
      if (ans[i] == answer[i]) {
        score++;
      }
    }

    // normalize fitness to range 0 .. 1
    fitness = score / answer.length;

    // improve fitness by making it quadratic
    fitness = pow(fitness, 2);

    if (fitness > bestFit) {
      bestFit = fitness;
      bestAnswer = ans;
    }
  }
```
> _In the code there's the matingPool, but it's never used_

Each of this strings, which we'll call _individuals_, gets a fitness score, based on the amount of characters it got right.

### Step 3: Reproduction

```@javascript
  let newPopulation = [];

  for (let i = 0; i < popSize; i++) {
    let child = bestAnswer;

    // Mutate the child and assign it to the population.
    newPopulation[i] = mutate(child, mutationRate);
  }  

  population = newPopulation;
  generation++;
```

We create a new child, from the best answer yet found. 

We **mutate** the child.

The child gets added to the newGeneration.

### Step 4: Repeat

Replace the old generation with the new one, and repeat from **Step 2**

## Notes

This problem is designed to understand the core concepts of Genetic Algorithms. It is a problem with a known answer, which gives us the ability to look how fast the algorithm can find a solution.

## Corrections

### Crossover
Crossover is never applied, it should be a part of the algorithm.

It is written in the code, but commented out, since from testing, I've seen that, _at least in this case_, it is better to just mutate from the current best guess than to crossover various parents. 

This might be because of something that I'm doing wrong in the function, but I haven't figured out what it is.