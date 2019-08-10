// @TODO: YOUR CODE HERE!
// Step 1: Set up the chart

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//  Append an SVG group
var scatterGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data
d3.csv("assets/data/data.csv")
    .then(function (StateData, error) {

        if (error) throw error;

        // Parse data
        console.log("We got to here.")
        StateData.forEach(function (data) {
            data.state = data.state;
            data.abbr = data.abbr;
            data.poverty = +data.poverty;
            data.age = +data.age;
            data.income = +data.income;
            data.healthcare = +data.healthcare;
            data.obesity = +data.obesity;
            data.smokes = +data.smokes;
        });
        // Create scales
        var xLinearScale = d3.scaleLinear()
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .range([height, 0]);

        // Set up the domain
        var xMax = d3.max(StateData, d => d.poverty) * 1.1;
        var yMax = d3.max(StateData, d => d.healthcare) * 1.1;
        var xMin = d3.min(StateData, d => d.poverty) * 0.9;
        var yMin = d3.min(StateData, d => d.healthcare) * 0.9;

        xLinearScale.domain([xMin, xMax]);
        yLinearScale.domain([yMin, yMax]);

        // Axes
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // add axes
        // x-axis
        scatterGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
        scatterGroup.append("text")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .style("text-anchor", "middle")
            .text("% Poverty");

        // y-axis
        scatterGroup.append("g").call(leftAxis)

        scatterGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - (height / 2))
            .attr("y", 0-margin.left)
            // .attr("dy", "1em")
            .classed("active", true)
            .text("% Healthcare");

        //  Charting the data
        var circlesGroup = scatterGroup.selectAll("circle")
            .data(StateData)
            .enter();

        circlesGroup.append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", 10)
            .attr("fill", "Cornflowerblue")
            .attr("opacity", ".5");


        circlesGroup.append("text")
            .text(function (d) { return d.abbr })
            .attr("dx", d => xLinearScale(d.poverty))
            .attr("dy", d => yLinearScale(d.healthcare))
            .style("text-anchor", "middle")
            .attr("font-size", 8)
            .attr("fill", "white")
            .attr("r", 10)
            .attr("opacity", ".5");


        scatterGroup
            .append("path")
            .attr("d")

    });
