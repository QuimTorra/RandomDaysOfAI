# Day 4 - G.A. Recap

## Overall Structure

### Genotype - Phenotype

First we determine what an individual is and identify it's genotype and phenotype.

The **genotype** is the genetic information of an individual, while the **phenotype** is the effects that get shown.

### Initial Population

We start with an Initial Population of *N* individuals, each one with randomly generated genes, and we let it run.

### Fittness Function

We define which individuals from the Population are the most *"fit"*, the ones that performed the better.

The better fittness value an individual gets, it's chance to reproduce will be higher.

### Reproduction

#### Cross-over

Taking multiple individuals as the *"parents"*, we combine their genetic information, in various ways:

> **Example:**
> We take part of one of the parent's information an part of the other, to make a full gene based on the parents.
> 
> Parent 1: '**AABB**|ABC'
> Parent 2: 'ABCA|**DBA**'
> 
> Cross-over: 'AABBDBA'

#### Mutation

Once we get the new child gene, it has a small chance to mutate, which is to change one bit of information to another one randomly generated.

Usually, the Mutation rate is low, not higher than *0.1*.

> **Example:**
> Having the child from the previous cross-over:
> 'AABBDBA'
> 
> It experiments a little mutation and ends up like this:
> 'AAB**C**DBA'

#### REPEAT

Once this is done, and a new *N* individual population is fully created, we repeat the process: Let them run, calculate their fitness, reproduce.

## Evolutionary Algorithms

When we're talking about *evolution*, what we notice is that, in nature, populations usualy coexist with diferent generations at a time, so, to simulate that, we go for a solution that goes like this:

> First, you create an initial population, randomly generated. 
> 
> They're given a time to live and maybe some conditions in their genes or in their behaviour make them live longer or shorter.
> 
> The more an individual is alive, the more chance it'll have to reproduce, so the new childs will inherit the genetic information from those who survive longer.

## Notes & Comments

Basically, this types of algorythms can be used to *"""solve"""* brute force problems. *(Technically it's not solving, it's getting a pretty good solution)*.

This algorythms are a pretty fun thing to work with, and to try to experiment with genotypes and phenotypes, to see how the average genetic information changes when the environment variables cange, etc.