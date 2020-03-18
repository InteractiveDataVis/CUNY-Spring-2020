// import our components
import { Table } from "./Table.js";
import { Graph } from "./Graph.js";

// initialize components
// (since we don't have the data or setState function yet, we only initialize the component names)
let table;
let graph;

// global state
let state = {
  data: [],
  selectedCountry: null,
};

// pulling live from updating github site
d3.csv(
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
  d3.autoType
)
  .then(data =>
    data.map(d => {
      const {
        "Province/State": province,
        "Country/Region": country,
        Lat: lat,
        Long: long,
        ...days // destructures everything that is left into a variable called 'days'
      } = d;
      return {
        province,
        country,
        lat,
        long,
        days,
        total: d3.max(Object.values(days)), // these are cumulative, so we want the latest one
      };
    })
  )
  .then(data => {
    state.data = data;
    console.log("data", data);
    init();
  });

function init() {
  table = new Table(state, setGlobalState);
  graph = new Graph(state, setGlobalState);
  draw();
}

function draw() {
  table.draw(state);
  graph.draw(state);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}
