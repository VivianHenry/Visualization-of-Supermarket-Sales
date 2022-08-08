// set the dimensions and margins of the graph
var margin4 = { top: 40, right: 60, bottom: 125, left: 60 },
    width = 900,
    height = 400;

// append the svg2 object to the body of the page
var svg2 = d3.select("#bar_graph_gender_B")
    .append("svg")
    .attr("width", width + margin4.left + margin4.right)
    .attr("height", height + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin4.left + "," + margin4.top + ")");

// Parse the Data
d3.csv("Data/bar_graph_gender_B.csv", function(data) {

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d) { return (d.Product_line) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width - (width / 3.1)])
        .padding([0.2])
    svg2.append("g")
        .attr("class", "X_Axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");;

    // // Add X axis label:
    // svg2.append("text")
    //     .attr("text-anchor", "end")
    //     .attr("font-size", "20px")
    //     .attr("font-weight", "bold")
    //     .attr("font-style", "normal")
    //     .attr("x", width + 30)
    //     .attr("y", height + 40)
    //     .text("Categories")
    //     .attr("fill", "#cccccc");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 18000])
        .range([height, 0]);
    svg2.append("g")
        .attr("class", "Y_Axis")
        .call(d3.axisLeft(y));

    // Add Y axis label:
    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("font-style", "normal")
        .attr("x", -50)
        .attr("y", -20)
        .text("Total revenue per product line by gender ($)")
        .attr("text-anchor", "start")
        .attr("fill", "#cccccc");

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c', '#4daf4a'])

    // create a tooltip
    var tooltip = d3.select("#bar_graph_gender_A")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#cccccc")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover4 = function(d) {
        tooltip
            .html("Gender: " + d.key + "<br>" + "Value: " + d.value)
            .style("opacity", 1)
            .style("background-color", "#cccccc")
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove4 = function(d) {
        tooltip
            .style("left", (1000) + "px")
            .style("top", (700) + "px")
            // .style("left", (d3.mouse(this)[0] + 1000) + "px")
            // .style("top", (d3.mouse(this)[1] + 500) + "px")
    }
    var mouseleave4 = function(d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    // Show the bars
    svg2.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d.Product_line) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return { key: key, value: d[key] }; }); })
        .enter().append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); })
        .on("mouseover", mouseover4)
        .on("mousemove", mousemove4)
        .on("mouseleave", mouseleave4);
})