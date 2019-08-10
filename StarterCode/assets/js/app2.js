// @TODO: YOUR CODE HERE!
// Step 1: Set up the chart

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
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

// var chosenXAxis = "poverty"



// function xScale(StateData, chosenXAxis) {
//     // create scales
//     var xLinearScale = d3.scaleLinear()
//         .domain([d3.min(StateData, d => d[chosenXAxis]) * 0.8,
//         d3.max(StateData, d => d[chosenXAxis]) * 1.2
//         ])
//         .range([0, width]);

//     return xLinearScale;

// }

// function renderAxes(newXScale, xAxis) {
//     var bottomAxis = d3.axisBottom(newXScale);

//     xAxis.transition()
//         .duration(1000)
//         .call(bottomAxis);

//     return xAxis;
// }


// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//     circlesGroup.transition()
//         .duration(1000)
//         .attr("cx", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;
// }
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

        // var xLinearScale = d3.scaleLinear()
        //     .domain([d3.min(StateData, d => d[chosenXAxis]) * 0.8,
        //     d3.max(StateData, d => d[chosenXAxis]) * 1.2
        //     ])
        //     .range([0, width]);
        // var xLinearScale = xScale(StateData, chosenXAxis);

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
        var xAxis = scatterGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // y-axis
        scatterGroup.append("g").call(leftAxis);

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

        // var labelsGroup = scatterGroup.append("g")
        //     .attr("transform", `translate(${width / 2}, ${height + 20})`);

        // var povertyLengthLabel = labelsGroup.append("text")
        //     .attr("x", 0)
        //     .attr("y", 20)
        //     .attr("value", "poverty") // value to grab for event listener
        //     .classed("active", true)
        //     .text("% of Poverty");

        // var ageLabel = labelsGroup.append("text")
        //     .attr("x", 0)
        //     .attr("y", 40)
        //     .attr("value", "age") // value to grab for event listener
        //     .classed("inactive", true)
        //     .text("Age (Median");

        // // x axis labels event listener
        // labelsGroup.selectAll("text")
        //     .on("click", function () {
        //         // get value of selection
        //         var value = d3.select(this).attr("value");
        //         if (value !== chosenXAxis) {

        //             // replaces chosenXAxis with value
        //             chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        // xLinearScale = xScale(StateData, d.poverty);

        // // updates x axis with transition
        // xAxis = renderAxes(xLinearScale, xAxis);

        // // updates circles with new x values
        // circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        circlesGroup.append("text")
            .text(function (d) { return d.abbr })
            .attr("dx", d => xLinearScale(d.poverty))
            .attr("dy", d => yLinearScale(d.healthcare))
            .style("text-anchor", "middle")
            .attr("font-size", 8)
            .attr("fill", "white")
            .attr("r", 10)
            .attr("opacity", ".5");

        //     if (chosenXAxis === "age") {
        //         ageLabel
        //           .classed("active", true)
        //           .classed("inactive", false);
        //         povertyLengthLabel
        //           .classed("active", false)
        //           .classed("inactive", true);
        //       }
        //       else {
        //         ageLabel
        //           .classed("active", false)
        //           .classed("inactive", true);
        //         povertyLengthLabel
        //           .classed("active", true)
        //           .classed("inactive", false);
        //       }
        //     }
        //   });


        scatterGroup
            .append("path")
            .attr("d")



        // var toolTip = d3.tip()
        //     .attr("class", "tooltip")
        //     .offset([80, -60])
        //     .html(function (d) {
        //         return ("test");
        //     });
        // scatterGroup.call(toolTip);

        // scatterGroup.on("mouseover", function (data) {
        //     toolTip.show(data);
        // })

        //     .on("mouseout", function (data, index) {
        //         toolTip.hide(data);
        //     });

        // var toolTip = d3.select("body").append("div")
        //     .attr("class", "tooltip");

        // scatterGroup.on("mouseover", function (d, ) {
        //     toolTip.style("display", "block");
        //     toolTip.html(`Pizzas eaten:`)
        //         .style("left", d3.event.pageX + "px")
        //         .style("top", d3.event.pageY + "px");
        // })
        //     // Step 3: Add an onmouseout event to make the tooltip invisible
        //     .on("mouseout", function () {
        //         toolTip.style("display", "none");
        //     });

    });
