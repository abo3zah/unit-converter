
var app = angular.module("myConversionApp", []);
app.controller("myCtrl",  ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    
    //functions
    $scope.getHijriDate = function () {
        $scope.error = false;
        $.ajax({
            url: "https://api.aladhan.com/gToH?date=" + $filter('date')($scope.gInputDate, "dd-MM-yyyy"),
            error: function (xhr) {
                $scope.error = true;
                $("#hErr").text("An error occured: " + xhr.status + " " + xhr.statusText);
            },
            success: function (result) {
                console.log(result);
                $scope.error = false;
                $("#hShortDate").text(result["data"]["hijri"]["date"])
                $("#hLongDate").text(
                    result["data"]["hijri"]["weekday"]["ar"]+ " " + 
                    result["data"]["hijri"]["day"] + "-" +
                    result["data"]["hijri"]["month"]["ar"]+ "-" +
                    result["data"]["hijri"]["year"]
                    )
            }
        });
    }

    $scope.getGeogDate = function () {
        $scope.error = false;
        $.ajax({
            url: "https://api.aladhan.com/hToG?date=" + $filter('date')($scope.hInputDate, "dd-MM-yyyy"),
            error: function (xhr) {
                $scope.error = true;
                $("#gErr").text("An error occured: " + xhr.status + " " + xhr.statusText);
            },
            success: function (result) {
                console.log(result);
                $scope.error = false;
                $("#gShortDate").text(result["data"]["gregorian"]["date"])
                $("#gLongDate").text(
                    result["data"]["gregorian"]["weekday"]["en"]+ " " + 
                    result["data"]["gregorian"]["day"] + "-" +
                    result["data"]["gregorian"]["month"]["en"]+ "-" +
                    result["data"]["gregorian"]["year"]
                    )
            }
        });
    }

    //defs
    $scope.gInputDate = new Date('1989-03-07')
    $scope.hInputDate = new Date('1409-07-29')
    $scope.getHijriDate();
    $scope.getGeogDate();
    $scope.error = false;
}]);