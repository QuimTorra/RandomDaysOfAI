function DNA (genes) {

  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (let i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.2);
    }
  }

  this.crossover = (parent) => {
    let newGenes = [];

    let mid = floor(random(lifespan));
    for(let i = 0; i < lifespan; i++) {
      if (i < mid) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = parent.genes[i];
      }
    }

    return new DNA(newGenes);
  }

  this.mutate = () => {
    this.genes.forEach(gene => {
      if (random(1) < 0.5) {
        gene = p5.Vector.random2D();
        gene.setMag(0.2);
      }
    });
  }
}