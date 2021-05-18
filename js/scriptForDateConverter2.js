$(function () {
    $('#picker').hijriDatePicker({
        hijri: true,
        viewMode: 'months',
        showSwitcher: false
    });
});

$("#picker").on('dp.change', function (arg) {
    if (!arg.date) {
        $("#selected-date").html('');
        return;
    };
    let date = arg.date;
    $("#gShortDate").text("التاريخ الميلادي :" + date.format("YYYY/M/D") + " م");
});

var app = angular.module("myConversionApp", []);
app.controller("myCtrl", ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    //functions
    $scope.getHijriDate = function () {
        m = moment($scope.gInputDate);
        $("#hShortDate").text("التاريخ الهجري : " + m.format('iD / iMMMM (iM) / iYYYY هـ'));
    }

    //defs
    $scope.gInputDate = new Date("1989/03/07");
    $scope.getHijriDate();
}]);