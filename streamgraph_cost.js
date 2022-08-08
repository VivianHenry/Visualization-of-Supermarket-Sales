// set the dimensions and margins of the graph
var margin7 = {top: 40, right: 30, bottom: 0, left: 10},
    width7 = 1300,
    height7 = 500;

// append the svg7 object to the body of the page
var svg7 = d3.select("#streamgraph_cost")
  .append("svg")
    .attr("width", width7 + margin7.left + margin7.right)
    .attr("height", height7 + margin7.top + margin7.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin7.left + "," + margin7.top + ")");

// Parse the Data
d3.csv("Data/streamgraph_cost.csv", function(data) {

  // List of groups = header of the csv files
  var keys = data.columns.slice(1)

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Date; }))
    .range([ 0, width7 ]);
  svg7.append("g")
    .attr("transform", "translate(0," + height7*0.8 + ")")
    .call(d3.axisBottom(x).tickSize(-height7*.7).ticks(4))
    .select(".domain").remove()
  // Customization
  svg7.selectAll(".tick line").attr("stroke", "white")

  // Add X axis label:
  svg7.append("text")
      .attr("text-anchor", "end")
      .attr("x", width7)
      .attr("y", height7-30 )
      .text("Time (year)")
      .attr("fill", "white");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-5000, 5000])
    .range([ height7, 0 ]);

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeDark2);

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)
  
  // Add chart title:
  svg7.append("text")
  .attr("text-anchor", "end")
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .attr("font-style", "normal")
  .attr("x", 0)
  .attr("y", 0)
  .text("Cost($) Trend Over Time")
  .attr("text-anchor", "start")
  .attr("fill", "#cccccc");

  // create a tooltip
  var Tooltip = svg7
    .append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("fill", "white")
    .style("opacity", 0)
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover2 = function(d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea2").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove2 = function(d,i) {
    grp = keys[i]
    Tooltip.text(grp)
  }
  var mouseleave2 = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea2").style("opacity", 1).style("stroke", "none")
   }

  // Area generator
  var area = d3.area()
    .x(function(d) { return x(d.data.Date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  svg7
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", "myArea2")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)
      .on("mouseover", mouseover2)
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2)

})