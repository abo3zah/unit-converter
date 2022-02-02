const svg = d3.select("#main")
  .append('svg')

const width = svg.attr('width');
const height = svg.attr('height');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection)
const colorScale = d3.scaleOrdinal(d3.schemeAccent)
/*const colorScale = d3.scaleLinear()
  .domain([0,240])
  .range(['green','yellow'])*/

const g = svg.append('g')
  .attr('transform','translate(' + (width/2) + ',' + (height /2) +')');

g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({
    type: 'Sphere'
  }));

svg.call(d3.zoom().on('zoom', e => {
  g.attr('transform', (transform = e.transform));
}));

Promise.all([
  d3.json('https://unpkg.com/world-atlas@2.0.2/countries-50m.json'),
]).then(([topology]) => {

  const countries = topojson.feature(topology, topology.objects.countries);

  console.log(countries);

  g.selectAll('path').data(countries.features)
    .enter()
    .append('path')
      .attr('d', d => pathGenerator(d))
      .attr('class', 'country')
      .attr('fill', d => colorScale(d.id))
      .append('title')
        .text(d => d.properties.name)
})
