function filterFunction(dropdownListID, inputID) {
  var input, filter, elements, i;
  input = document.getElementById(inputID);
  filter = input.value.toUpperCase();
  div = document.getElementById(dropdownListID);
  elements = div.getElementsByTagName("ul");
  for (i = 0; i < elements.length; i++) {
    txtValue = elements[i].textContent || elements[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
}

const dataFetch = async () => {
  try {
    const res = await d3.dsv(",", "csv/countryFullInfov2.csv", d3.autoType);
    return res
  } catch (err) {
    console.error(err);
  }
}

function dialogShow(str) {
  d3.dsv(",", "csv/countryFullInfov2.csv", d3.autoType, (d) => {

    if (d['اسم الدولة'] == str) {
      var div = d3.select("#dialog");

      div.selectAll("#imgDiv, #tableDiv").remove();

      var imgDiv = div.append('div')
        .attr('id', 'imgDiv')
        .attr('class', 'd-flex justify-content-center');


      imgDiv.append('img')
        .attr('class', 'm-3')
        .attr("src", d['الشعار'])
        .attr('width', '40%')
        .style('max-width', '300px')
        .attr('height', '200px');

      imgDiv.append('img')
        .attr('class', 'm-3 border border-dark')
        .attr("src", d['العلم'])
        .attr('width', '40%')
        .style('max-width', '300px')
        .attr('height', '200px')

      var table = div
        .append('div')
        .attr('id', 'tableDiv')
        .attr('class', 'table-responsive container-fluid p-1')
        .append('table')
        .attr('class', 'table table-striped table-bordered align-middle text-center')

      var tbody = table.append('tbody')

      for (var element of Object.keys(d)) {

        if (element == 'العلم') {
          break;
        }

        var row = tbody.append('tr')

        row.append('th')
          .attr('class', 'col-6 bg-light bg-gradient text-black')
          .text(element)

        if (element == 'الخريطة') {

          row.append('td')
            .attr('class', 'col-6')
            .append('a')
            .attr('href', d[element])
            .attr('target', '_blank')
            .attr('class', 'btn btn-primary link-primary text-white')
            .html('الموقع&nbsp; ')
            .append('i')
            .attr('class', 'bi bi-box-arrow-up-right')

        } else {
          row.append('td')
            .attr('class', 'col-6')
            .text(d[element].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
      }

      $("#dialog").dialog({
        classes: {
          'ui-dialog-titlebar': "ui-corner-all bg-dark text-white"
        },
        show: true,
        hide: true,
        closeOnEscape: true,
        width: $(window).width()*0.95,
        maxHeight: $(window).height() * 0.95,
        maxWidth: $(window).width() * 0.8,
        modal: true,
        title: "معلومات عن " + d['اسم الدولة']
      });

      $('.ui-dialog-titlebar-close').removeClass("ui-dialog-titlebar-close").addClass("bi bi-x-lg");
    }

  })
}

function hideContent(id){

  if (d3.select('[class*="'+id+'"]').style('display') == "block"){
    d3.selectAll('[class*="'+id+'"]').style('display', 'none');
  }else{
    d3.selectAll('[class*="'+id+'"]').style('display', 'block');
  }
  
}

dataFetch().then((data) => {


  continentArray = Array.from(d3.group(data, (d) => d['القارة']).keys())

  d3.select("div#main")
      .selectAll('div#continent')
      .data(continentArray)
      .enter()
        .append('div')
          .attr('id', (d) => d.replace(/\s/g, ''))
          .attr('class', 'col border border-dark bg-light m-3 grid-container')
          .append('h3')
            .attr('class', 'title text-center clickable')
            .attr('onclick', (d) => 'hideContent("' + d.replace(/\s/g, '') + '")')
            .text((d) => d)
  
  for (continent of continentArray) {    
    var selectedDiv = d3.select("div#" + continent.replace(/\s/g, '')).selectAll('img')
      .data(d3.sort(d3.filter(data, d => d['القارة'] == continent),(a,b) => d3.descending(a['عدد السكان'],b['عدد السكان'])))
      .enter()
      .append('div')
        .attr('class', d => d['القارة'].replace(/\s/g, '') + ' p-3')

    selectedDiv.append('img')
      .attr('src', (d) => d['العلم'])
      .attr('width', "100%")
      .attr('height', "200px")
      .attr('onclick', (d) => "dialogShow('" + d['اسم الدولة'] + "')")
      .style('cursor', 'pointer')
      .style('border', '1px solid black')
      .style('object-fit', 'fill');

    selectedDiv.append('figcaption')
      .text((d) => d['اسم الدولة'])
      .attr('class', 'fw-bold bg-dark text-white')
      .style('text-align', 'center');
  }
});
