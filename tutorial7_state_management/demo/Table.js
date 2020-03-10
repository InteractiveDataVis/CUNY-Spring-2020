class Table {
  // initialize properties here
  setState;
  colorScale;
  table;
  tableRows;

  init(state, setState) {
    // save our global update function to this component so we can use it from within
    this.setState = setState;

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
      .scaleLog()
      .domain(d3.extent(countryData, ([country, total]) => total))
      .range([0.5, 1]);

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

    this.tableRows.on("click", ([country, value]) =>
      setState({ selectedCountry: country })
    );
  }

  update(state) {
    console.log("now I am drawing my table");

    // console.log('d3.selectAll("tr")', d3.selectAll("tr"));
    // update the row to display selected country
    this.tableRows.style("background-color", ([country, value]) =>
      state.selectedCountry === country ? "grey" : this.colorScale(value)
    );
  }
}

export { Table };
