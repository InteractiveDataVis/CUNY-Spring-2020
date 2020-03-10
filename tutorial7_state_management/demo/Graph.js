class Graph {
  // initialize properties here
  setState;
  svg;
  width = 500;
  height;

  init(state, setGlobalState) {
    // save our global update function to this component so we can use it from within
    this.setGlobalState = setGlobalState;
    this.svg = d3.select("#chart").append("svg");
  }

  draw(state) {
    console.log("now I am drawing my graph");
  }
}

export { Graph };
