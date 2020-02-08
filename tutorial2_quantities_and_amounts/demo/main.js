// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("../../data/squirrelActivities.csv", d3.autoType).then(data => {
  console.log(data);

  /** CONSTANTS */
  // constants help us reference the same values throughout our code
  const width = window.innerWidth * 0.9,
    height = window.innerHeight / 3,
    paddingInner = 0.2,
    margin = { top: 20, bottom: 40, left: 40, right: 40 };

  /** SCALES */
  // reference for d3.scales: https://github.com/d3/d3-scale
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.activity))
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height - margin.bottom, margin.top]);

  // reference for d3.axis: https://github.com/d3/d3-axis
  const xAxis = d3.axisBottom(xScale).ticks(data.length);

  /** MAIN CODE */
  const svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // append rects
  const rect = svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("y", d => yScale(d.count))
    .attr("x", d => xScale(d.activity))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.count))
    .attr("fill", "steelblue")

  // append text
  const text = svg
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("class", "label")
    // this allows us to position the text in the center of the bar
    .attr("x", d => xScale(d.activity) + (xScale.bandwidth() / 2))
    .attr("y", d => yScale(d.count))
    .text(d => d.count)
    .attr("dy", "1.25em");

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);
});