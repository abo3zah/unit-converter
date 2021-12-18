function showDropdownList(dropdownListID) {
  $("#"+dropdownListID).addClass("show")
}

function hideDropdownList(dropdownListID) {
  $("#"+dropdownListID).removeClass("show")
}

$( "html" ).click(function(e) {
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
    const res = await d3.dsv(",", "csv/countryInfo.csv", d3.autoType);
    return res
  } catch (err) {
    console.error(err);
  }
}

function ulClickCountry(inputID,str,dropdownId){
  $(inputID).val(str);
  document.getElementById(dropdownId).classList.remove("show")
  d3.dsv(",", "csv/countryInfo.csv", d3.autoType, (d)=> {
    d['COUNTRY']==str? $("#callingCode").text("الرقم الاتصال: +" + d['COUNTRY CODE']).next().text("عدد السكان: "+d['POPULATION']).next().text("الاختصار: "+d['ISO CODES']) : null;
  })
}



dataFetch().then((data) => {

  var dropDown = d3.select("#countryList")


  var options = dropDown.selectAll("ul")
    .data(data)
    .enter().append("ul")
    .attr('onclick', "ulClickCountry('#country',$(this).text(),'countryList')")
    .text((d) => d['COUNTRY']);

});
