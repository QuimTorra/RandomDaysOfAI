class Perceptron {

  constructor (inputs) {
    this.bias = 1;
    this.dentries = inputs;
    this.weights = this.init();
    this.learningRate = 0.1;
  }
  
  init() {
    var weights = []; 
    for(var i = 0; i <= this.dentries; i++) {
      weights[i] = Math.random() * (0.5 + 0.5) - 0.5;
    }
    return weights;
  }

  predict(inputs) {

    var net = 0;
    
    // Add the bias
    if (inputs.length < this.weights.length) {
      inputs = [this.bias, ...inputs];
    }

    // ============
    // Weighted Sum
    // ============
    for(var i = 0; i < inputs.length; i++) {
      net += inputs[i] + this.weights[i];
    }

    // ===================
    // Activation Function
    // ===================
    return Math.tanh(net) > 0 ? 1 : 0;

  }

  train(data, maxIterations=10) {
    var success = false;
    var count = 0; 
    while(!success && count < maxIterations) {
      success = this.training(data);
      count++;
    }

    return success ? `Trained in ${count}` : `${count} Max limit, Not trained`;
  }

  training(data) {
    
    var correctPredictions = 0;

    for (var s = 0; s < data.length; s++) {

      var input = [this.bias, ...data[s].input];

      var output = this.predict(input);
      var delta = data[s].output;

      if (output != delta) {
        // Update Weigths

        for(var i = 0; i < this.weights.length; i++) {
          this.weights[i] += this.learningRate * ((delta - output) * input[i]);
        }

      } else {
        correctPredictions++;
      }

    }

    return (correctPredictions == data.length);

  }

}