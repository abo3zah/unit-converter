function showDropdownList(dropdownListID) {
  $("#" + dropdownListID).addClass("show")
}

function hideDropdownList(dropdownListID) {
  $("#" + dropdownListID).removeClass("show")
}

$("html").click(function (e) {
  $(e.target)[0] == $('#country')[0] ? $("#countryList").addClass("show") : $("#countryList").removeClass("show");
});

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

function ulClickCountry(inputID, str, dropdownId) {
  $(inputID).val(str);
  document.getElementById(dropdownId).classList.remove("show")
  d3.dsv(",", "csv/countryFullInfov2.csv", d3.autoType, (d) => {

    if (d['اسم الدولة'] == str) {
      var div = d3.select("#countryDiv");

      div.selectAll("#imgDiv, #tableDiv").remove();

      var imgDiv = div.append('div')
        .attr('id', 'imgDiv')
        .attr('class', 'd-flex justify-content-center');


      imgDiv.append('img')
        .attr('class', 'm-3')
        .attr("src", d['الشعار'])
        .attr('width', '40%')
        .style('max-width','300px')
        .attr('height', '200px');

      imgDiv.append('img')
        .attr('class', 'm-3 border border-dark')
        .attr("src", d['العلم'])
        .attr('width', '40%')
        .style('max-width','300px')
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

        if (element == 'الخريطة') {

        }

        var row = tbody.append('tr')

        row.append('th')
          .attr('class', 'col-6 bg-light bg-gradient text-black')
          .text(element)

        if (element == 'الخريطة') {

          row.append('td')
          .attr('class', 'col-6')
          .append('a')
            .attr('href',d[element])
            .attr('target','_blank')
            .attr('class','btn btn-primary link-primary text-white')
            .html('الموقع&nbsp; ')
            .append('i')
              .attr('class','bi bi-box-arrow-up-right')

        }else {
          row.append('td')
            .attr('class', 'col-6')
            .text(d[element].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
      }
    }

  })
}



dataFetch().then((data) => {

  var dropDown = d3.select("#countryList")


  var options = dropDown.selectAll("ul")
    .data(data)
    .enter().append("ul")
    .attr('onclick', (d) => "ulClickCountry('#country','" + d['اسم الدولة'] + "','countryList')")
    .text((d) => d['اسم الدولة']);


  ulClickCountry('#country', 'المملكة العربية السعودية', 'countryList')
});
