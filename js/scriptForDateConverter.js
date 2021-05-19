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
    $("#gShortDate").text("التاريخ الميلادي :" + date.format("dddd,     D / MMMM (M) / YYYY") + " م");
});

$("#gpicker").on('dp.change', function (arg) {
    if (!arg.date) {
        $("#hShortDate").html('');
        return;
    };
    let date = arg.date;
    $("#hShortDate").text("التاريخ الهجري :" + date.format("dddd, iD / iMMMM (iM) / iYYYY") + " هـ");
});