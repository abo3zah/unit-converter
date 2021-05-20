$(document).ready(function() {
    $('button').click(function(){


        let valid = true;
        $("input[required]").each(function(){
            if ($(this).val() > 0){
                $(this).removeClass("bg-danger");
            } else{
                $(this).addClass("bg-danger");
                valid=false;
            }
        })

        if(valid){
            if($('input[name="sex"]:checked').val() == "male"){

                value = (10 * $("#weight").val()) + (6.25 * $("#height").val()) - (5 * $("#age").val()) + 5;
                $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي (BMR): " + value);

            } else {

                value = (10 * $("#weight").val()) + (6.25 * $("#height").val()) - (5 * $("#age").val()) - 161;
                $('#BMR').text("معادلة حساب السعرات الحرارية معدل الأيض الساسي (BMR): " + value);

            }

            value = parseInt($("#weight").val() / (($("#height").val()/100)**2));
            $('#BMI').text("معادلة مؤشر كتلة الجسم (BMI): " + value);
        }
        
    })
});