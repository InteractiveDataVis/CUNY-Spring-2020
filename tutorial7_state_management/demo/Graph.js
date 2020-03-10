class Graph {
  // initialize properties here
  setState;
  svg;
  width = 500;
  height;

  init(state, setState) {
    // save our global update function to this component so we can use it from within
    this.setState = setState;
    this.svg = d3.select("#chart").append("svg");
  }

  update(state) {
    console.log("now I am drawing my graph");
  }
}

export { Graph };
