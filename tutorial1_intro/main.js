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
      .text("Week One Results");
  
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
  
      
    rows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .text(d => d)
      .attr("class", function (d) { 
        if (d < 3) {return 'low'}
        else if (d > 2) {return 'high'}
        else {return 'date_f'} ;
},)}) ;
