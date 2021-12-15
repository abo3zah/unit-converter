function toggleDrop(dropdownList) {
    document.getElementById(dropdownList).classList.toggle("show");
}
  
function filterFunction(dropdownList) {
    var input, filter, elements, i;
    input = document.getElementById("country");
    filter = input.value.toUpperCase();
    div = document.getElementById(dropdownList);
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

