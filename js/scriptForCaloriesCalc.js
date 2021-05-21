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
                $("#bar").css("width", "0%");
                $("#bar").next().css("width", "0%");
                $("#bar").next().next().css("width", "0%");
                $("#bar").next().next().next().css("width", "0%");
                $("path").attr("visibility","hidden")
            }
        })

        if (valid) {

            $("path").attr("visibility","visible")

            if ($('input[name="sex"]:checked').val() == "male") {

                value = (10 * $("#weight").val()) + (6.25 * $("#height").val()) - (5 * $("#age").val()) + 5;
                $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي: " + value);

            } else {

                value = (10 * $("#weight").val()) + (6.25 * $("#height").val()) - (5 * $("#age").val()) - 161;
                $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي: " + value);

            }

            value = ($("#weight").val() / (($("#height").val() / 100) ** 2)).toFixed(1);

            $("g").attr("transform","translate(" + (($("#indicator")[0].clientWidth*(1-(Math.min(value,40)/40)))-10) + ",0)")

            if (value < 18.5) {

                value += " - نقص في الوزن";
                
            } else if (value < 25) {

                value += " - وزن صحي";                

            } else if (value < 30) {

                value += " - وزن زائد";

            } else {

                value += " - سمنة";

            }

            $('#BMI').text("معادلة مؤشر كتلة الجسم: " + value);
        }

    })
});