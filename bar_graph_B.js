// set the dimensions and margins of the graph
var margin = { top: 40, right: 60, bottom: 125, left: 60 },
    width = 900,
    height = 400;

// append the svg object to the body of the page
var svg3 = d3.select("#bar_graph_B")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("Data/bar_graph_B.csv", function(data) {

    // List of subgroups(Member/Normal))
    var subgroups = data.columns.slice(1)

    // List of groups (Product categories)
    var groups = d3.map(data, function(d) { return (d.Product_line) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width - (width / 3.1)])
        .padding([0.2])
    svg3.append("g")
        .attr("class", "X_Axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // // Add X axis label:
    // svg3.append("text")
    //     .attr("text-anchor", "end")
    //     .attr("font-size", "20px")
    //     .attr("font-weight", "bold")
    //     .attr("font-style", "normal")
    //     .attr("x", width + 30 - 40)
    //     .attr("y", height + 40)
    //     .text("Categories")
    //     .attr("fill", "#cccccc");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 30000])
        .range([height, 0]);
    svg3.append("g")
        .attr("class", "Y_Axis")
        .call(d3.axisLeft(y));

    // Add Y axis label:
    svg3.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("font-style", "normal")
        .attr("x", -50)
        .attr("y", -20)
        .text("Total revenue per product line by client type ($)")
        .attr("text-anchor", "start")
        .attr("fill", "#cccccc");

    // Color palette (one color per subgroup)
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#cccc00', '#992600'])

    //Stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)

    // Create a tooltip
    var tooltip = d3.select("#bar_graph_A")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#cccccc")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // Three function that change the tooltip when user hovers/moves/leaves a cell
    var mouseover3 = function(d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];
        tooltip
            .html("Customer type: " + subgroupName + "<br>" + "Revenue: " + subgroupValue)
            .style("opacity", 1)
            .style("background-color", "#cccccc")
    }

    var mousemove3 = function(d) {
        tooltip
            .style("left", (d3.mouse(this)[0]) + "px")
            .style("top", (d3.mouse(this)[1] + 700) + "px")
    }

    var mouseleave3 = function(d) {
        tooltip
            .style("opacity", 0)
    }

    // Show the bars
    svg3.append("g")
        .selectAll("g")
        // Enter in the stack data (loop key per key)
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .attr("fill-opacity", .8)
        .attr("stroke-width", 3)
        .selectAll("rect")
        // Enter a second time (loop subgroup per subgroup to add all rectangles)
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Product_line); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .attr("stroke", "grey")
        .on("mouseover", mouseover3)
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3)
})