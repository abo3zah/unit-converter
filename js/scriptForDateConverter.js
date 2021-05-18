$(function () {
    $('#hpicker').hijriDatePicker({
        hijri: true,
        viewMode: 'months',
        showSwitcher: false
    });
});

$(function () {
    $('#gpicker').hijriDatePicker({
        hijri: false,
        viewMode: 'months',
        showSwitcher: false
    });
});

$("#hpicker").on('dp.change', function (arg) {
    if (!arg.date) {
        $("#gShortDate").html('');
        return;
    };
    let date = arg.date;
    $("#gShortDate").text("التاريخ الميلادي :" + date.format("YYYY/M/D") + " م");
});

$("#gpicker").on('dp.change', function (arg) {
    if (!arg.date) {
        $("#hShortDate").html('');
        return;
    };
    let date = arg.date;
    $("#hShortDate").text("التاريخ الهجري :" + date.format("iYYYY/iM/iD") + " هـ");
});