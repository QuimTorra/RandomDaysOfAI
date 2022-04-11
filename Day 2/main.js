const input = document.getElementById("answer-input");
const bestGuess = document.getElementById("best-guess");
const genDisplay = document.getElementById("gen-display");

let answer = "To be or not to be, that's the question.";

let bestFit = -1;
let bestAnswer = "";

let generation = 1;
let popSize = 1000; //Amount of individuals in a population
let population = []; //Population
let matingPool = [];

const mutationRate = 0.01;

function start () {
  answer = input.value;
  bestGuess.style = "";
  if (answer === undefined || answer === "") {
    answer = "you didnt set anything to find";
  }

  generation = 1;
  bestFit = -1;

  nextGen();

  loop();
}

function setup() {

  for (let i = 0; i < popSize; i++) {
    let generatedStr = "";
    for (let j = 0; j < answer.length; j++) {
      generatedStr += randomChar();
    }
    population[i] = generatedStr;
  }  

}

function draw () {
  // Calculate Fitness
  calcFitness();

  // Stop when we find the answer
  if (bestFit == 1) {
    bestGuess.style = "color: limegreen";
    noLoop();
  }
  // Show best answer, fitness and current generation on screen
  bestGuess.textContent = bestAnswer + " : " + floor(bestFit*100) + "%";
  genDisplay.textContent = "Generation " + generation;

  // Create Next Generation
  nextGen();

}

function randomChar() { 
  let c = floor(random(32, 123));
  
  return String.fromCharCode(c);
}

function calcFitness () {


  // initialize the mating pool empty
  matingPool = [];
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

    // Construct matingPool

    // fill the mating pool with this dna the amount of times the probability is.
    let n = floor(fitness * 100);
    for ( let i = 0; i < n+1; i++ ) {
      matingPool.push(ans);
    }
  })
  // console.log(matingPool);
}

function nextGen () {
  
  let newPopulation = [];

  for (let i = 0; i < popSize; i++) {
    // Create a child from 2 parents.
    // !!! It seems to be working faster without crossover, so I'm leaving the crossover commented out
    // let parentA = floor(random(0, matingPool.length));
    // let parentB = floor(random(0, matingPool.length));
    // let child = crossover(matingPool[parentA], matingPool[parentB]);

    let child = bestAnswer;

    // Mutate the child and assign it to the population.
    newPopulation[i] = mutate(child, mutationRate);
  }  

  population = newPopulation;
  generation++;

}

function crossover(parentA, parentB) {
  let child = "";
  
  let midpoint = random(1, parentA.length);
  for ( let i = 0; i < answer.length; i++ ) {
    child += i < midpoint ? parentA[i] : parentB[i]; 
  }

  // for ( let i = 0; i < answer.length; i++ ) {
  //   child += random(1) < 0.5 ? parentA[i] : parentB[i]; 
  // }

  return child;
}

function mutate (oldDNA, _mutationRate) {

  let newDNA = "";

  for (let i = 0; i < answer.length; i++) {
    newDNA += random(1) < _mutationRate ? randomChar() : oldDNA[i];
  }

  return newDNA;
}