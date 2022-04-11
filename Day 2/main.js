const input = document.getElementById("answer-input");
const bestGuess = document.getElementById("best-guess");
const genDisplay = document.getElementById("gen-display");

let answer = "imagine if this AI found this text";

let bestFit = -1;
let bestAnswer = "";

let generation = 1;
let popSize = 500; //Amount of individuals in a population
let population = []; //Population

const mutationRate = 0.1;

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
  if (bestFit == answer.length) {
    bestGuess.style = "color: limegreen";
    noLoop();
  }
  // Show best answer, fitness and current generation on screen
  bestGuess.textContent = bestAnswer + " : " + bestFit;
  genDisplay.textContent = "Generation " + generation;

  // crossOver();

  // Create Next Generation
  nextGen();

}

function randomChar() { 
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '; 
  return random(characters.split(""));
}

function calcFitness () {

  population.forEach(ans => {
    let fitness = 0;
    for (let i = 0; i < ans.length; i++) {
      if (ans[i] == answer[i]) {
        fitness++;
      }
    }

    if (fitness > bestFit) {
      bestFit = fitness;
      bestAnswer = ans;
    }
  })

}

function nextGen () {
  
  let newPopulation = [];

  for (let i = 0; i < popSize; i++) {
    newPopulation[i] = mutate(bestAnswer, mutationRate);
  }  

  population = newPopulation;
  generation++;

}

function mutate (oldDNA, _mutationRate) {

  let newDNA = "";

  for (let i = 0; i < answer.length; i++) {
    newDNA += random(1) < _mutationRate ? randomChar() : oldDNA[i];
  }

  return newDNA;
}