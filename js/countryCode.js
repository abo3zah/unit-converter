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
    const res = await d3.dsv(",", "csv/countryFullInfo.csv", d3.autoType);
    return res
  } catch (err) {
    console.error(err);
  }
}

function ulClickCountry(inputID, str, dropdownId) {
  $(inputID).val(str);
  document.getElementById(dropdownId).classList.remove("show")
  d3.dsv(",", "csv/countryFullInfo.csv", d3.autoType, (d) => {

    if (d['name_ar'] == str) {
      var div = d3.select("#countryDiv");

      div.selectAll("p, .imgDiv").remove();

      var imgDiv = div.append('div')
        .attr('class', 'imgDiv');


      imgDiv.append('img')
        .attr('class', 'flag')
        .attr("src", d['coatOfArms/svg'])
        .attr('width', '200px')
        .attr('height', '200px');

      imgDiv.append('img')
        .attr('class', 'flag')
        .attr("src", d['flags/svg'])
        .attr('width', '200px')
        .attr('height', '200px')

      var table = div.append('table')
      var tbody = table.append('tbody')

      var rows = tbody.selectAll('tr')
        .data(['name/official_ar','region_ar','capital_ar','area','population','Phone Code','cca3'])
        .enter()
        .append('tr')
      

      

      div.append('p').style("text-align", "right").style('margin-top', '10px').html("<b>الاسم الرسمي:</b> " + d['name/official_ar']);
      div.append('p').style("text-align", "right").html("<b>القارة: </b>" + d['region_ar']);
      div.append('p').style("text-align", "right").html("<b>العاصمة: </b>" + d['capital_ar']);
      div.append('p').style("text-align", "right").html("<b>المساحة (كيلومتر مربع): </b>" + d['area'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      div.append('p').style("text-align", "right").html("<b>عدد السكان: </b>" + d['population'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      div.append('p').style("text-align", "right").html("<b>الرقم الاتصال:</b> +" + d['Phone Code']);
      div.append('p').style("text-align", "right").html("<b>الاختصار: </b>" + d['cca3']);
    }

  })
}



dataFetch().then((data) => {

  var dropDown = d3.select("#countryList")


  var options = dropDown.selectAll("ul")
    .data(data)
    .enter().append("ul")
    .attr('onclick', "ulClickCountry('#country',$(this).text(),'countryList')")
    .text((d) => d['name_ar']);


  ulClickCountry('#country', 'المملكة العربية السعودية', 'countryList')
});
