//adding the svg
const svg = d3.select("#main")
  .append('svg')

const width = svg.attr('width');
const height = svg.attr('height');

//selection of projection
const projection = d3.geoNaturalEarth1()

//selection of graticule
const graticule = d3.geoGraticule()
  .step([10, 10]);

const pathGenerator = d3.geoPath().projection(projection);

//color scale
const colorScale = d3.scaleOrdinal(d3.schemeAccent)
/*const colorScale = d3.scaleLinear()
  .domain([0,240])
  .range(['green','yellow'])*/

const g = svg.append('g')
  //.attr('transform','translate(' + (960/2) + ',' + (480 /2) +')');


g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({
    type: 'Sphere'
  }));

//zooming feature
svg.call(d3.zoom().on('zoom', e => {
  g.attr('transform', (transform = e.transform));
}));

//data fetching
Promise.all([
  d3.json('https://unpkg.com/world-atlas@2.0.2/countries-50m.json'),
]).then(([topology]) => {

  const countries = topojson.feature(topology, topology.objects.countries);

  //add graticules
  g.selectAll('path.graticules')
    .data([graticule()])
    .enter()
    .append('path')
      .attr('d', d => pathGenerator(d))
      .attr('class','graticules')

  //add countries
  g.selectAll('path.country').data(countries.features)
    .enter()
    .append('path')
      .attr('d', d => pathGenerator(d))
      .attr('class', 'country')
      //.attr('fill', d => colorScale(d.id))
      .attr('fill', 'lightyellow')
      .append('title')
        .text(d => d.properties.name)
})
