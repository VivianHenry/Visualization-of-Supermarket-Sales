// Set the dimensions and margins of the graph
var margin1 = { top: 40, right: 60, bottom: 130, left: 60 },
    width1 = 900,
    height1 = 400;

// Append the svg object to the body of the page
var svg1 = d3.select("#bar_product_line")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin1.left + "," + margin1.top + ")");

// Parse the Data
d3.csv("Data/bar_product_line_Overall.csv", function(data) {

    // List of subgroups (Branches)
    var subgroups = data.columns.slice(1)

    // List of groups (Product categories)
    var groups = d3.map(data, function(d) { return (d.Product_line) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width1 - (width1/3.1)])
        .padding([0.2])
    svg1.append("g")
        .attr("class", "X_Axis")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // // Add X axis label:
    // svg1.append("text")
    //     .attr("text-anchor", "end")
    //     .attr("font-size", "20px")
    //     .attr("font-weight", "bold")
    //     .attr("font-style", "normal")
    //     .attr("x", width1 + 30 - 40)
    //     .attr("y", height1 + 40)
    //     .text("Categories")
    //     .attr("fill", "#cccccc");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 70000])
        .range([height1, 0]);
    svg1.append("g")
        .attr("class", "Y_Axis")
        .call(d3.axisLeft(y));

    // Add Y axis label:
    svg1.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("font-style", "normal")
        .attr("x", -50)
        .attr("y", -20)
        .text("Total Revenue Per Product Line ($)")
        .attr("text-anchor", "start")
        .attr("fill", "#cccccc");

    // Color palette (one color per subgroup)
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#cccc00', '#992600', '#00e64d'])

    //Stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)

    // Create a tooltip
    var tooltip = d3.select("#bar_product_line")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#cccccc")
        .style("border", "solid")
        .style("border-width1", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // Three function that change the tooltip when user hovers/moves/leaves a cell
    var mouseover3 = function(d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];
        tooltip
            .html("Branch: " + subgroupName + "<br>" + "Revenue: " + subgroupValue)
            .style("opacity", 1)
            .style("background-color", "#cccccc")
    }

    var mousemove3 = function(d) {
        tooltip
            .style("left", (d3.mouse(this)[0]) + "px")
            .style("top", (d3.mouse(this)[1] + 175) + "px")
    }

    var mouseleave3 = function(d) {
        tooltip
            .style("opacity", 0)
    }

    // Show the bars
    svg1.append("g")
        .selectAll("g")
        // Enter in the stack data (loop key per key)
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .attr("fill-opacity", .8)
        .attr("stroke-width1", 3)
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