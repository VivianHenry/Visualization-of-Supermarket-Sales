// Set the dimensions and margins of the graph
var margin2 = { top: 40, right: 60, bottom: 50, left: 60 },
    // width = 800,
    // height = 400;
    width = 550,
    height = 400;

// Append the svg0 object to the body of the page
var svg0 = d3.select("#area_chart_cost_A")
    .append("svg")
    .attr("width", width + margin2.left + margin2.right)
    .attr("height", height + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

// Read the data
d3.csv("Data/area_chart_A.csv",

    // When reading the csv, format variables
    function(d) {
        return { date: d3.timeParse("%m/%d/%Y")(d.Date), value: d.cogs }
    },

    // Now use this dataset:
    function(data) {

        // Add X axis
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, width - (width/3.1)]);
        xAxis2 = svg0.append("g")
            .attr("class", "X_axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add X axis label:
        svg0.append("text")
            .attr("text-anchor", "end")
            .attr("font-size", "20px")
            .attr("font-weight", "bold")
            .attr("font-style", "normal")
            .attr("x", width - (width/3.1))
            .attr("y", height + 40)
            .text("Time")
            .attr("fill", "#cccccc");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.value; })])
            .range([height, 0]);
        yAxis2 = svg0.append("g")
            .attr("class", "Y_axis")
            .call(d3.axisLeft(y));

        // Add Y axis label:
        svg0.append("text")
            .attr("text-anchor", "end")
            .attr("font-size", "20px")
            .attr("font-weight", "bold")
            .attr("font-style", "normal")
            .attr("x", -50)
            .attr("y", -20)
            .text("Total cost ($)")
            .attr("text-anchor", "start")
            .attr("fill", "#cccccc");

        // Add a clipPath: everything out of this area won't be drawn.
        var clip = svg0.append("defs").append("svg0:clipPath")
            .attr("id", "clip")
            .append("svg0:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        var brush = d3.brushX()
            .extent([
                [0, 0],
                [width, height]
            ])
            .on("end", updateChart)

        // Create the area variable (where both the area and the brush take place)
        var area = svg0.append('g')
            .attr("clip-path", "url(#clip)")

        // Create an area generator
        var areaGenerator = d3.area()
            .x(function(d) { return x(d.date) })
            .y0(y(0))
            .y1(function(d) { return y(d.value) })

        // Add the area
        area.append("path")
            .datum(data)
            .attr("class", "myArea")
            .attr("fill", "red")
            .attr("fill-opacity", .3)
            .attr("stroke", "red")
            .attr("stroke-width", 3)
            .attr("d", areaGenerator)

        // Add the brushing
        area
            .append("g")
            .attr("class", "brush")
            .call(brush);

        // A function that set idleTimeOut to null
        var idleTimeout

        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart() {

            // What are the selected boundaries?
            extent = d3.event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain([4, 8])
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and area position
            xAxis2.transition().duration(1000).call(d3.axisBottom(x))
            area
                .select('.myArea')
                .transition()
                .duration(1000)
                .attr("d", areaGenerator)
        }

        // If user double click, reinitialize the chart
        svg0.on("dblclick", function() {
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis2.transition().call(d3.axisBottom(x))
            area
                .select('.myArea')
                .transition()
                .attr("d", areaGenerator)
        });
    })