class Graph {
  /* this is run when we create the first "new Graph", so it acts as our init function did */
  constructor(state, setGlobalState) {
    console.log("Graph component is loaded...", state);

    this.svg = d3.select("#chart").append("svg");
  }

  draw(state) {
    console.log("now I am drawing my graph");
  }
}

export { Graph };
