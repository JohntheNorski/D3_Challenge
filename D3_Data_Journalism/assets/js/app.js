//@TODO: YOUR CODE HERE!
const svgWidth = 1000;
const svgHeight = 600;

const margin = {
top: 50,
bottom: 50,
right: 50,
left: 50
};

const height = svgHeight - margin.top - margin.bottom;
const width = svgWidth - margin.left - margin.right;

const svg = d3
.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

let chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {

    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.age) - 1, d3.max(data, d => d.age)])
        .range([0, width]);

    let yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.obesity) - 1, d3.max(data, d => d.obesity)])
        .range([height, 0]);

    let xAxis = d3.axisBottom(xLinearScale);
    let yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    let circlesGroup = chartGroup.selectAll("g circle")
        .data(data)
        .enter()
        .append("g");

    circlesGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "12")
        .attr("fill", "lightblue")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

    circlesGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .style("font", "9 px comic-sans")
        .attr("text-anchor", "middle")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.obesity) + 4);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left * 1.1)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("font-size", "20px") 
    .text("Obesity");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + (margin.top * .75)})`)
    .attr("class", "axisText")
    .style("font-size", "20px") 
    .text("Age");

    chartGroup.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 1.5))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("text-decoration", "underline")  
        .text("Age vs. Obesity");
})