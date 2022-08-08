// set the dimensions and margins of the graph
var margin6 = {top: 40, right: 30, bottom: 0, left: 10},
    width6 = 1300,
    height6 = 500;

// append the svg6 object to the body of the page
var svg6 = d3.select("#streamgraph_revenue")
  .append("svg")
    .attr("width", width6 + margin6.left + margin6.right)
    .attr("height", height6 + margin6.top + margin6.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin6.left + "," + margin6.top + ")");

// Parse the Data
d3.csv("Data/streamgraph_revenue.csv", function(data) {

  // List of groups = header of the csv files
  var keys = data.columns.slice(1)

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Date; }))
    .range([ 0, width6 ]);
  svg6.append("g")
    .attr("transform", "translate(0," + height6*0.8 + ")")
    .call(d3.axisBottom(x).tickSize(-height6*.7).ticks(4))
    .select(".domain").remove()
  // Customization
  svg6.selectAll(".tick line").attr("stroke", "white")

  // Add X axis label:
  svg6.append("text")
      .attr("text-anchor", "end")
      .attr("x", width6)
      .attr("y", height6-30 )
      .text("Time (year)")
      .attr("fill", "white");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-5000, 5000])
    .range([ height6, 0 ]);

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
  svg6.append("text")
  .attr("text-anchor", "end")
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .attr("font-style", "normal")
  .attr("x", 0)
  .attr("y", 0)
  .text("Revenue($) Trend Over Time")
  .attr("text-anchor", "start")
  .attr("fill", "#cccccc");

  // create a tooltip
  var Tooltip = svg6
    .append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("fill", "white")
    .style("opacity", 0)
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d,i) {
    grp = keys[i]
    Tooltip.text(grp)
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
   }

  // Area generator
  var area = d3.area()
    .x(function(d) { return x(d.data.Date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  svg6
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", "myArea")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

})