// load in csv
d3.csv("../../data/homework-hours.csv").then(data => {
    // once the data loads, console log it
    console.log("data", data);
  
    // select the `table` container in the HTML
    const table = d3.select("#d3-table");
  
    /** HEADER */
    const thead = table.append("thead");
    thead
      .append("tr")
      .append("th")
      .attr("colspan", "7")
      .text("Week One Results in Hours");
  
    thead
      .append("tr")
      .selectAll("th")
      .data(data.columns)
      .join("td")
      .text(d => d);
  
    /** BODY */
    // rows
    const rows = table
      .append("tbody")
      .selectAll("tr")
      .data(data)
      .join("tr");
  
    // cells
    // pattern = cells with slash
    regex = /\//
    rows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
        // update the below logic to apply to your dataset
      //.attr("CSS style rule", function(data) { 
      .attr("class", function(d) {
        if (d.match(regex)) {
          return 'date_f'
        } else if (d > 2) {
          return 'high'
        } else if (d < 3) {
          return 'low'
        }
      })
  });
  
