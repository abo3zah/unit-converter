function showDropdownList(dropdownListID) {
  $("#" + dropdownListID).addClass("show")
}

$.ajax({
  url: "https://www.google.com/search?q=%D9%85%D8%B3%D8%A7%D8%AD%D8%A9+%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9",
  dataType: 'text',
  success: function (data) {
    console.log($(".Z0LcW").html());
  }
});

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
      div = d3.select("#countryDiv");

      div.selectAll("p, img").remove();

      div.append("img").attr("src", d['flags/svg']).attr("width", 200).attr("height", 150).style('margin', '10px').attr('align', 'left').style('border', '1px solid black');
      div.append("img").attr("src", d['coatOfArms/svg']).attr("width", 200).attr("height", 150).style('margin', '10px').attr('align', 'left').style('border', '1px solid black');
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

});
