var data_api = {
    resource_id: '83c21090-bd19-4b54-ab6b-d999c251edcf', // the resource id
  };
  $.ajax({
    url: 'https://data.gov.sg/api/action/datastore_search?',
    data: data_api,
    success: function(data) {

    console.log(" data = " + data.result.records.value)
    record = data.result.records
    year_2011 = data.result.records[1].year

    //add dropdown box here later 
        // List of groups (here I have one group per column)
        var allGroup = d3.map(record, function(d){return(d.year)}).keys()

        // add the options to the button
        d3.select("#selectButton")
            .selectAll('myOptions')
            .data(allGroup)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }) // corresponding value returned by the button

        
    //start of generation of the chart
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1360 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    

    // Initialize the X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(record.map(function(d) { return d.level_2; }))
    .padding(0.2);

    // Initialize the Y axis
    var y = d3.scaleLinear()
    .domain([0, 18000])
    .range([ height, 0]);
    


    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y))




    // A function that create / update the plot for a given variable:
    function update(selectedVar) {

    data = record.filter(function(d) {return d.year == selectedVar})
    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
    .data(data)

    // update bars
    u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
        .attr("x", function(d) { return x(d.level_2); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")


    }
    // Initialize plot
    // Listen to the slider?
    d3.select("#selectButton").on("change", function(d){
        selectedGroup = this.value
        update(selectedGroup)
    })
    }
    
  });



