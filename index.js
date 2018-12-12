(function(){
  var url = "https://raw.githubusercontent.com/AnitaOnyimah/quarter-data.json";
  var margin = { top: 60, left: 100, bottom: 60, right: 90}
  var height = 480, width = 780;
  
  var y = d3.scale.linear().range([height, 0]);
  var x = d3.scale.linear().range([0, width]);
  
  var xAxis = d3.svg.axis().scale(x).orient("bottom")
     .tickValues([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  var yAxis = d3.svg.axis().scale(y).orient("left")
     .tickValues([0,200000,400000,600000,800000,1000000,1200000,1400000]);
  
  var svg = d3.select("#scatterplot-stats").append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right);
  
  svg.append("rect")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "white")
    .attr("fill-opacity", 0.8);
  
  svg = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var tooltip = d3.select("#scatterplot-stats").append("div")
      .attr("class", "tooltip");
  
  function showToolTip(d, i) {
    tooltip.style({
      "height" : "50px",
      "width" : "200px",
      "opacity" : 1.0
    });
    var circle = d3.event.target;
    var tippadding = 5, tipsize = {
      dx: parseInt(tooltip.style("width")),
      dy: parseInt(tooltip.style("height"))
    };
    tooltip.style({
      "top" : (d3.event.pageY - tipsize.dy - 5) + "px",
      "left" : (d3.event.pageX - tipsize.dx - 5)  + "px"
    }).html("<span><b>Revenue for Quarter " + d.Quarter + ": $" + d.Revenue + "</b></span>");
  }
  
  function hideToolTip(d, i){
    tooltip.style({
      "height" : 0,
      "width" : 0,
      "opacity" : 0
    }).html("");
  }
  
  d3.json(url, (error, data) => {
    if (error) {
      throw new Error ("d3.json error");
    } else {
       x.domain([0, 12]);
       y.domain([0, d3.max(data, (d) => { return d.Revenue; }) + 1]);
       var lg = calcLinear(data, "x", "y", d3.min(data, (d) => { return d.Quarter; }), d3.min(data, (d) => { return d.Revenue; }));

       svg.append("line")
	        .attr("class", "regression")
	        .attr("x1", x(lg.ptA.x))
	        .attr("y1", y(lg.ptA.y))
	        .attr("x2", x(lg.ptB.x))
	        .attr("y2", y(lg.ptB.y)); 
      
       svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("transform", "translate(" + width + ",-30)")
          .attr("dy", "1.8em")
          .attr("text-anchor", "end")
          .text("Quarter");
       
       svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)") 
          .attr("dy", "-0.8em") 
          .attr("text-anchor", "end")     
          .text("Revenue");
       
        var point = svg.selectAll(".point")
           .data(data)
           .enter().append("g")
           .attr("class", "point")
           .attr("x", (d) => { return x(d.Quarter); })
           .attr("y", (d) => { return y(d.Revenue); }); 
       
        point.append("circle")
           .attr("cx", (d) => { return x(d.Quarter); })
           .attr("cy", (d) => { return y(d.Revenue); })
           .attr("r", 5)
           .attr("fill", "black")
           .on("mouseover", showToolTip)
           .on ("mouseout", hideToolTip)
    }
    
     function calcLinear(data, x, y, minX, minY){
      var n = data.length;
      var pts = [];
      data.forEach(function(d,i){
        var obj = {};
        obj.x = d.Quarter;
        obj.y = d.Revenue;
        obj.mult = obj.x*obj.y;
        pts.push(obj);
      });
      var sum = 0;
      var xSum = 66;
      var ySum = 5300347;
      var sumSq = 0;
      pts.forEach(function(pt){
        sum = sum + pt.mult;
        sumSq = sumSq + (pt.x * pt.x);
      }); 
      var a = sum * n;
      var b = xSum * ySum;
      var c = sumSq * n;
      var d = xSum * xSum;
      var m = (a - b) / (c - d);
      var e = ySum;
      var f = m * xSum;
      var b = (e - f) / n;
      return {
        ptA : {
          x: minX,
          y: m * minX + b
        },
        ptB : {
          y: minY,
          x: (minY - b) / m
        } 
      } 
    } 
  });
}());
