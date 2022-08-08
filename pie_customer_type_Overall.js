// Set the dimensions and margins of the graph
var width4 = 450
    height4 = 450
    margin4 = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width4, height4) / 2 - margin4

// Append the svg object to the div
var svg4 = d3.select("#pie_customer_type_Overall")
  .append("svg")
    .attr("width", width4)
    .attr("height", height4)
  .append("g")
    .attr("transform", "translate(" + width4 / 2 + "," + height4 / 2 + ")");

// Manual insertion of data (Since its a small dataset)
var data = {Member: 501, Guest: 499}

// Color scale
var color = d3.scaleOrdinal()
.domain(data)
.range(['#00b300', '#e60000'])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// Shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg4.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width4", "2px")
    .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
svg4.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key + ": " + d.data.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)

// Add chart title:
svg4.append("text")
.attr("text-anchor", "end")
.attr("font-size", "20px")
.attr("font-weight", "bold")
.attr("font-style", "normal")
.attr("x", -170)
.attr("y", -200)
.text("Distribution of Customer Type")
.attr("text-anchor", "start")
.attr("fill", "#cccccc");