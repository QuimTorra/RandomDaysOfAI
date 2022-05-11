class NeuralLayer {
  /**
   * @param {Integer} numOfNeurons number of neurons for the Layer
   * @param {Integer} prevLayerNeurons number of neurons from the previous Layer
   * @param {activationFunction} act_f activation function type: SIGMOID, TANH, ReLU, LINEAR
   */
  constructor (numOfNeurons, prevLayerNeurons, act_f, input = false) {
    this.isInputL = input;
    this.nn = numOfNeurons;
    this.pn = prevLayerNeurons;
    
    this.setActivation(act_f);
    if (input) {
      this.weights = this.randomize(this.pn, this.nn, 1, 1);
      this.bias = this.randomize(1, this.pn, 0, 0);
      return;
    }
    this.weights = this.randomize(this.pn, this.nn);
    this.bias = this.randomize(1, this.nn);
  }

  forward (input) {
    var result = input;
    if (!this.isInputL) {
      // Make the Net Sum
      result = this.matrixMultiplication(input, this.weights);

      // Add the bias
      result = this.matrixAdd(result, this.bias);
    }

    // Apply the activation function
    for (let i = 0; i < result[0].length; i++) {
      result[0][i] = this.act_f(result[0][i]);
    }

    // console.table(result);

    // output
    return result;
  }

  backward (cost) {
    console.log("not yet implemented");
  }

  setActivation (act_f) {
    switch (act_f) {
      case "SIGMOID":
        this.act_f = (x) => {
          return 1 / (1 + Math.exp(-x));
        }
        this.act_f_der = (x) => {
          var ex = Math.exp(-x);
          return ex / Math.pow((1 + ex), 2);
        }
        break;
      
      case "TANH":
        this.act_f = (x) => {
          return Math.tanh(x);
        }
        break;
    
      case "ReLU":
        this.act_f = (x) => {
          return Math.max(0, x);
        }
        break;
      case "STEP":
        this.act_f = (x) => {
          return Math.tanh(x) > 0 ? 1 : 0;
        }
        break;

      default:
        break;
    }
  }

  randomize (rows, cols, min = -1, max = 1) {
    var arr = [];
    for (let i = 0; i < rows; i++) {
      let a = [];
      for (let j = 0; j < cols; j++) {
        a.push(Math.random() * (max - min) + min); 
      }
      arr.push(a);
    }
    return arr;
  }

  matrixMultiplication (a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
      throw new Error('arguments should be in 2-dimensional array format');
   }
   let x = a.length,
   z = a[0].length,
   y = b[0].length;
   if (b.length !== z) {
      console.table(a);
      console.table(b);
      throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
   }
   let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
   let product = new Array(x);
   for (let p = 0; p < x; p++) {
      product[p] = productRow.slice();
   }
   for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
         for (let k = 0; k < z; k++) {
            product[i][j] += a[i][k] * b[k][j];
         }
      }
   }
   return product;
  }

  matrixAdd (a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
      throw new Error('arguments should be in 2-dimensional array format');
    }

    var x = a.length,
    y = a[0].length;

    var sum = [];
    for (let i = 0; i < x; i++) {
      var s = [];
      for (let j = 0; j < y; j++) {
        s.push( a[i][j] + b[i][j] );
      }
      sum.push(s);
    }

    return sum;
  }

}

class NeuralNetwork {
  /**
   * @param {Array: Integer} layers array of integers representing the neurons for each layer
   * @param {activationFunction} act_f activation function type: SIGMOID, TANH, ReLU, LINEAR
   */
  constructor (layers, act_f) {
    this.layers = [];
    var nn = layers[0];
    var pn = nn;
    this.layers.push(new NeuralLayer(nn, pn, act_f, true));
    for (let i = 1; i < layers.length; i++) {
      var pn = nn;
      var nn = layers[i];
      this.layers.push(new NeuralLayer(nn, pn, act_f));
    }
  }

  predict (input) {
   
    var output = input;
    for (let i = 0; i < this.layers.length; i++) {
      output = this.layers[i].forward(output);
    }

    return output[0];
  }

  changeActivation(act_f) {
    this.layers.forEach(L => {
      L.setActivation(act_f);
    });
  }

  setLayerActivation(layer, act_f) {
    this.layers[layer].setActivation(act_f);
  }
}