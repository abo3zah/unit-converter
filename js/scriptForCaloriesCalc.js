$(document).ready(function () {
    $('button').click(function () {


      let valid = true;
      $("input[required]").each(function () {
        if ($(this).val() > 0) {
          $(this).removeClass("bg-danger");
        } else {
          $(this).addClass("bg-danger");
          valid = false;
          $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي: ");
          $('#BMI').text("معادلة مؤشر كتلة الجسم: ");
          $(".progress-bar").css("width","0%");
          $(".progress-bar").css("background-color","");
        }
      })

      if (valid) {
        if ($('input[name="sex"]:checked').val() == "male") {

          value = (10 * $("#weight").val()) + (6.25 * $("#height").val()) - (5 * $("#age").val()) + 5;
          $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي: " + value);

        } else {

          value = (10 * $("#weight").val()) + (6.25 * $("#height").val()) - (5 * $("#age").val()) - 161;
          $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي: " + value);

        }

        value = parseInt($("#weight").val() / (($("#height").val() / 100) ** 2));

        if (value < 18.5){

          value += " - نقص في الوزن"
          $(".progress-bar").css("width","25%");
          $(".progress-bar").css("background-color","yellow");

        } else if(value <25){

          value += " - الوزن الطبيعي"
          $(".progress-bar").css("width","50%");
          $(".progress-bar").css("background-color","green");

        } else if (value < 30){

          value += " - زيادة في الوزن"
          $(".progress-bar").css("width","75%");
          $(".progress-bar").css("background-color","yellow");

        } else {

          value += " - سمنة"
          $(".progress-bar").css("width","100%");
          $(".progress-bar").css("background-color","red");

        }
        
        $('#BMI').text("معادلة مؤشر كتلة الجسم: " + value);
      }

    })
  });