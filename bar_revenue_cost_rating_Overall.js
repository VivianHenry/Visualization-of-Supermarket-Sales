// Set the dimensions and margins of the graph
var margin2 = { top: 40, right: 60, bottom: 100, left: 60 },
    width2 = 630,
    height2 = 400;

// Append the svg object to the body of the page
var svg2 = d3.select("#bar_revenue_cost_rating_Overall")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width2 ])
  .padding(0.2);
var xAxis = svg2.append("g")
  .attr("transform", "translate(0," + height2 + ")")
  .attr("class", "X_Axis");

// Add X axis label:
svg2.append("text")
    .attr("text-anchor", "end")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("font-style", "normal")
    .attr("x", width2)
    .attr("y", height2 + 60)
    .text("Categories")
    .attr("fill", "#cccccc");

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height2, 0]);
var yAxis = svg2.append("g")
  .attr("class", "Y_axis")

// Add Y axis label:
svg2.append("text")
.attr("text-anchor", "end")
.attr("font-size", "20px")
.attr("font-weight", "bold")
.attr("font-style", "normal")
.attr("x", -50)
.attr("y", -20)
.text("Dynamic Comparison of Certain Attributes")
.attr("text-anchor", "start")
.attr("fill", "#cccccc");


// A function that creates and update the plot for given variable
function update(selectedVar) {

  // Parse the Data
  d3.csv("Data/bar_revenue_cost_rating_Overall.csv", function(data) {

    // X axis
    x.domain(data.map(function(d) { return d.Branch; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) + d3.max(data, function(d) { return +d[selectedVar] }) / 5 ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Variable u: map data to existing bars
    var u = svg2.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.Branch); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height2 - y(d[selectedVar]); })
        .attr("fill", "#cccc00")
        .attr("fill-opacity", .8)
        .attr("stroke-width1", 3)
  })

}

// Initialize plot when page opens for the first time
update('Revenue')
