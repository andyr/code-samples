var dataset = [ 5, 10, 15, 20, 25 ];

// Bar chart using divs
d3.select('body').selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', function (d) {
    var height = d * 5;
    return height + 'px';
  })

// Circles representing data size
// using svg > circle
var w = 500, h = 100;
var svg = d3.select('body').append('svg')
  .attr('width', w)
  .attr('height', h)
  .style('border', '4px dashed orange');
var circles = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle');
circles
  .attr('cx', function (d, i) {
    console.log(arguments);
    return (i*50) + 25;
  })
  .attr('cy', h/2)
  .attr('r', function (d) {
    return d;
  })
  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', function (d) {
    return d/2;    
  });

  /*
  .text(function(d) { return d; })
  .style("color", function(d) {
    if (d > 15) {   //Threshold of 15
      return "red";
    } else {
      return "black";
    }
  });
  */
