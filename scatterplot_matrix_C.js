// Dimension of the whole chart. Only one size since it has to be square
var marginWhole = { top: 50, right: 30, bottom: 20, left: 30 },
    sizeWhole = 1400 - marginWhole.left - marginWhole.right

// Create the svg area
var svg = d3.select("#scatterplot_matrix_C")
    .append("svg")
    .attr("width", sizeWhole + marginWhole.left + marginWhole.right)
    .attr("height", sizeWhole + marginWhole.top + marginWhole.bottom)
    .append("g")
    .attr("transform", "translate(" + marginWhole.left + "," + marginWhole.top + ")")


d3.csv("Data/scatterplot_matrix_C.csv", function(data) {

    // Numeric variables in this dataset
    var allVar = ["Unit Price", "Quantity", "Tax", "Total", "COGS", "Gross Income", "Rating"]
    var numVar = allVar.length

    // Size of a single chart
    mar = 20
    size = sizeWhole / numVar

    // ----------------- //
    // Scales
    // ----------------- //

    // Create a scale: Gives the position of each pair of variables
    var position = d3.scalePoint()
        .domain(allVar)
        .range([0, sizeWhole - size])

    // Color scale: Differentiation between Male and Female
    var color = d3.scaleOrdinal()
        .domain(["Male", "Female"])
        .range(["#1ac6ff", "#ff6666"])

    // ------------------------------- //
    // Add charts
    // ------------------------------- //

    for (i in allVar) {
        for (j in allVar) {

            // Get current variable name
            var var1 = allVar[i]
            var var2 = allVar[j]

            // If var1 == var2, its a diagonal element
            if (var1 === var2) { continue; }

            // Add X Scale of each graph
            xextent = d3.extent(data, function(d) { return +d[var1] })
            var x = d3.scaleLinear()
                .domain(xextent).nice()
                .range([0, size - 2 * mar]);

            // Add Y Scale of each graph
            yextent = d3.extent(data, function(d) { return +d[var2] })
            var y = d3.scaleLinear()
                .domain(yextent).nice()
                .range([size - 2 * mar, 0]);

            // Add a 'g' at the right position
            var tmp = svg
                .append('g')
                .attr("transform", "translate(" + (position(var1) + mar) + "," + (position(var2) + mar) + ")");

            // Add X and Y axis in tmp
            tmp.append("g")
                .attr("transform", "translate(" + 0 + "," + (size - mar * 2) + ")")
                .call(d3.axisBottom(x).ticks(3))
                .attr("class", "X_axis");
            tmp.append("g")
                .call(d3.axisLeft(y).ticks(3))
                .attr("class", "Y_axis");

            // Add circle
            tmp
                .selectAll("myCircles")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return x(+d[var1]) })
                .attr("cy", function(d) { return y(+d[var2]) })
                .attr("r", 3)
                .attr("fill", function(d) { return color(d.Gender) })
        }
    }

    // ------------------------------- //
    // Add histograms at diagonal pos.
    // ------------------------------- //

    for (i in allVar) {
        for (j in allVar) {

            // Variable names
            var var1 = allVar[i]
            var var2 = allVar[j]

            // If var1 == var2 (diagonal) modify, else skip
            if (i != j) { continue; }

            // Create X Scale
            xextent = d3.extent(data, function(d) { return +d[var1] })
            var x = d3.scaleLinear()
                .domain(xextent).nice()
                .range([0, size - 2 * mar]);

            // Add a 'g' at the right position
            var tmp = svg
                .append('g')
                .attr("transform", "translate(" + (position(var1) + mar) + "," + (position(var2) + mar) + ")");

            // Add x axis
            tmp.append("g")
                .attr("transform", "translate(" + 0 + "," + (size - mar * 2) + ")")
                .call(d3.axisBottom(x).ticks(3))
                .attr("class", "X_axis");

            // Set the parameters for the histogram
            var histogram = d3.histogram()
                .value(function(d) { return +d[var1]; })
                .domain(x.domain())
                .thresholds(x.ticks(15));

            // And apply this function to data to get the bins
            var bins = histogram(data);

            // Y axis: Scale and draw
            var y = d3.scaleLinear()
                .range([size - 2 * mar, 0])
                .domain([0, d3.max(bins, function(d) { return d.length; })]); // d3.hist has to be called before the Y axis obviously

            // Append the bar rectangles to the svg element
            tmp.append('g')
                .selectAll("rect")
                .data(bins)
                .enter()
                .append("rect")
                .attr("x", 1)
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0); })
                .attr("height", function(d) { return (size - 2 * mar) - y(d.length); })
                .style("fill", "#cc0000")
                .attr("stroke", "white")
        }
    }

    // ------------------------------- //
    // Add variable names = Diagonal
    // ------------------------------- //

    for (i in allVar) {
        for (j in allVar) {
            // If var1 == var2 (diagonal), else skip
            if (i != j) { continue; }
            // Add text
            var var1 = allVar[i]
            var var2 = allVar[j]
            svg
                .append('g')
                .attr("transform", "translate(" + position(var1) + "," + position(var2) + ")")
                .append('text')
                .attr("x", size / 5)
                .attr("y", size / 12)
                .text(var1)
                .attr("font-size", "18px")
                .attr("font-weight", "bold")
                .attr("font-style", "normal")
                .attr("fill", "#3399ff")

        }
    }

    // ------------------------------- //
    // Add chart title
    // ------------------------------- //

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("font-style", "normal")
        .attr("x", -10)
        .attr("y", -20)
        .text("Scatterplot matrix of continuous attributes")
        .attr("text-anchor", "start")
        .attr("fill", "#cccccc");
})