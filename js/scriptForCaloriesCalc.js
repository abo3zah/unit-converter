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

            value = ($("#weight").val() / (($("#height").val() / 100) ** 2)).toFixed(1);

            if (value < 18.5) {

                barwidth = 25*value/18.5;
                value += " - نقص في الوزن";
                $("#bar").css("width", barwidth + "%");
                $("#bar").next().css("width", "0%");
                $("#bar").next().next().css("width", "0%");
                $("#bar").next().next().next().css("width", "0%");

            } else if (value < 25) {

                barwidth = 25*(value-18.5)/6.5;
                value += " - وزن صحي";
                $("#bar").css("width", "25%");
                $("#bar").next().css("width", barwidth + "%");
                $("#bar").next().next().css("width", "0%");
                $("#bar").next().next().next().css("width", "0%");

            } else if (value < 30) {

                barwidth = 25*(value-25)/5;
                value += " - وزن زائد";
                $("#bar").css("width", "25%");
                $("#bar").next().css("width", "25%");
                $("#bar").next().next().css("width", barwidth + "%");
                $("#bar").next().next().next().css("width", "0%");

            } else {

                barwidth = Math.min(25*(value-30)/10,25);
                value += " - سمنة";
                $("#bar").css("width", "25%");
                $("#bar").next().css("width", "25%");
                $("#bar").next().next().css("width", "25%");
                $("#bar").next().next().next().css("width", barwidth + "%");

            }

            $('#BMI').text("معادلة مؤشر كتلة الجسم: " + value);
        }

    })
});