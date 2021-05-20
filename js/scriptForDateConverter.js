function printDate(x,result,target){
    let end = new Date()
    let diffInDays = parseInt((end.getTime()-x)/86400000);

    // طباعة التاريخ المحول له
    $(target).text(result);

    // طباعة الفرق في الأيام
    $(target).next().text("عدد الأيام إلى هذه اللحظة: " + diffInDays + " يوم");

    //الحساب بالميلادي
    let years = parseInt(diffInDays / 365);
    let months = parseInt(((diffInDays/365)-years)*12);
    let days = diffInDays - (years*365) - (months * 31);
    $(target).next().next().text("الفرق بالميلادي إلى هذه اللحظة: " + years + " سنة و  " + months + " شهر و  " + days + " يوم");

    // الحساب بالهجري
    years = parseInt(diffInDays / 354);
    months = parseInt(((diffInDays/354)-years)*12);
    days = diffInDays - (years*354) - (months * 30);
    $(target).next().next().next().text("الفرق بالهجري إلى هذه اللحظة: " + years + " سنة و  " + months + " شهر و  " + days + " يوم");
}

$(function () {
    $('#hpicker').hijriDatePicker({
        hijri: true,
        viewMode: 'years',
        showSwitcher: false,
        useCurrent: false,
        showTodayButton: true
    });
});

$(function () {
    $('#gpicker').hijriDatePicker({
        hijri: false,
        viewMode: 'years',
        showSwitcher: false,
        useCurrent: false,
        showTodayButton: true
    });
});

$("#hpicker").on('dp.change', function (arg) {
    if (!arg.date) {
        $("#gShortDate").html('');
        return;
    };
    let date = arg.date;
    let result = "التاريخ الميلادي :" + date.format("dddd,     D / MMMM (M) / YYYY") + " م"
    printDate(date.format('x'),result, "#gShortDate");
});

$("#gpicker").on('dp.change', function (arg) {
    if (!arg.date) {
        $("#hShortDate").html('');
        return;
    };
    let date = arg.date;
    let result = "التاريخ الهجري :" + date.format("dddd, iD / iMMMM (iM) / iYYYY") + " هـ"
    printDate(date.format('x'),result, "#hShortDate");
});