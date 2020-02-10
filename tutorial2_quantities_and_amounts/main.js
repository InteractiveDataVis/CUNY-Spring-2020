// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("../data/ThirdEyeData_homework2.csv", d3.autoType).then(data => {
    console.log(data);
  
    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * 0.9,
      height = window.innerHeight / 2,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 100, right: 100 };
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.Items_sold)])
      .range([width - margin.left, margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.Item_type))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);
  
    // reference for d3.axis: https://github.com/d3/d3-axis
    const yAxis = d3.axisLeft(yScale).ticks(data.length);
  
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
      .attr("x", 0, d => xScale(d.Items_sold))
      .attr("y", d => yScale(d.Item_type))
      .attr("height", yScale.bandwidth())
      .attr("width", d => width - margin.left - xScale(d.Items_sold))
      .attr("transform", `translate(200, ${height - margin.bottom, margin.top})`)
      .attr("fill", "#a86487")

  // append text
    const text = svg
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("class", "label")
        // this allows us to position the text in the center of the bar
        .attr("y", d => yScale(d.Item_type) + yScale.bandwidth()+15)
        .attr("x", 0, d => xScale(d.Items_sold))
        .text(d => d.Items_sold)
        .attr("dx","220");

    svg // select the same svg element
        .append("g") // add a `g`, or `group` element
        .attr("class", "axis") // give the `g` element a class `axis`
        .attr("transform", `translate(190, ${height - margin.bottom, margin.top})`) // move the element to the bottom of the chart (hint: try commenting this line out to see what it does)
        .call(yAxis)
        .style("text-anchor", "left")
        .text(d.Item_type); 
  })