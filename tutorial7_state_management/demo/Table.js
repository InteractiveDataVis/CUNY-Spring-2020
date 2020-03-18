class Table {
  // initialize properties here
  setState;
  colorScale;
  table;
  tableRows;

  constructor(state, setGlobalState) {
    // aggregate totals per country
    // creates an array where of rows such as [country, value]
    const countryData = d3
      .rollups(
        state.data,
        v => d3.sum(v.map(d => d.total)),
        d => d.country
      )
      .sort((a, b) => d3.descending(a[1], b[1]));

    // first map our values to a logarithmic scale
    const logScale = d3
      .scaleSymlog() // like a log scale, but can handle a 0 in the domain without returning NaN
      .domain(d3.extent(countryData, ([country, total]) => total))
      .range([0.5, 1]); // to use only the darker half of the color scale

    // use that logarithmic scale in our color interpolator
    this.colorScale = d3.scaleSequential(d => d3.interpolateBuPu(logScale(d)));

    const columns = ["country", "confirmed count"];
    this.table = d3.select("#table").append("table");

    this.table
      .append("thead")
      .append("tr")
      .selectAll("th")
      .data(columns)
      .join("th")
      .text(d => d);

    this.tableRows = this.table
      .append("tbody")
      .selectAll("tr")
      .data(countryData)
      .join("tr")
      .style("background-color", ([country, value]) => this.colorScale(value))
      .style("color", "#eee");

    this.tableRows
      .selectAll("td")
      .data(d => d)
      .join("td")
      .text(d => d);

    this.tableRows.on("click", ([country, value]) => {
      setGlobalState({ selectedCountry: country });
    });
  }

  draw(state) {
    console.log("now I am drawing my table");

    // update the row to display selected country
    this.tableRows.style("background-color", ([country, value]) =>
      state.selectedCountry === country ? "grey" : this.colorScale(value)
    );
  }
}

export { Table };
