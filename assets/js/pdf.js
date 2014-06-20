var pdf = function(dist) {
  var
    margin = { top: 27, right: 15, bottom: 18, left: 30 },
    paper = { width: 480, height: 240 },
    image = { width: paper.width - margin.left - margin.right, height: paper.height - margin.top - margin.bottom },
    discreteWidth = 4,
    halfInterval,
    data = [];

halfInterval = (0.5 * image.width / (Math.floor(dist.domain.max) - Math.ceil(dist.domain.min) + 1));

var xScale = d3.scale.linear()
  .domain([dist.domain.min, dist.domain.max])
  .range([halfInterval, image.width - halfInterval]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .ticks(dist.domain.max - dist.domain.min)
  .tickSize(-image.height)
  .tickPadding(6)
  .orient('bottom');

var yScale = d3.scale.linear()
  .domain([dist.range.min, dist.range.max])
  .range([image.height, 0]);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .ticks(10)
  .tickSize(-image.width)
  .orient('left');

var svg = d3.select('body')
  .append('svg')
  .attr('width', paper.width)
  .attr('height', paper.height)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.append('rect')
  .attr('class', 'backgrid')
  .attr('width', image.width)
  .attr('height', image.height);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + image.height + ')')
  .text('foo');

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + image.height + ')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'axis')
  .call(yAxis);

for (var i = 0; i <= Math.ceil(image.width); i++) {
  var x = xScale.invert(i);
  if ((dist.f(x) !== 0 || x >= dist.domain.min) && (dist.f(x) !== 0 || x <= dist.domain.max) && (typeof dist.f(x) !== 'undefined')) {
    data.push({ x: x, y: dist.f(x) })
  }
}

var line = d3.svg.line()
  .x(function(d) { return xScale(d.x); })
  .y(function(d) { return yScale(d.y); });

svg.append('path')
  .datum(data)
  .attr('class', 'line')
  .attr('d', line);

};
