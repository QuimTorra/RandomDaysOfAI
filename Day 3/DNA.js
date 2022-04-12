function DNA (parentDNA) {

  // This gene determines their height
  // and their speed 
  // --> +height -speed || -height +speed
  this.gene = parentDNA ? parentDNA.gene : random(0.15, 1);

  this.mutate = () => {
    if(random(1) > 0.5) {
      this.gene += random(0, 0.05);
    } else {
      this.gene -= random(0, 0.05);
    }
  }

}