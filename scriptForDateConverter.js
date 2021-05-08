
var app = angular.module("myConversionApp", []);
app.controller("myCtrl",  ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    
    //functions
    $scope.getHijriDate = function () {
        $scope.error = false;
        $.ajax({
            url: "https://api.aladhan.com/gToH?date=" + $filter('date')($scope.inputDate, "dd-MM-yyyy"),
            error: function (xhr) {
                $scope.error = true;
                $("#err").text("An error occured: " + xhr.status + " " + xhr.statusText);
            },
            success: function (result) {
                console.log(result);
                $scope.error = false;
                $("#shortDate").text(result["data"]["hijri"]["date"])
                $("#longDate").text(
                    result["data"]["hijri"]["weekday"]["ar"]+ " " + 
                    result["data"]["hijri"]["day"] + "-" +
                    result["data"]["hijri"]["month"]["ar"]+ "-" +
                    result["data"]["hijri"]["year"]
                    )
            }
        });
    }

    //defs
    $scope.inputDate = new Date('1989-03-07')
    $scope.getHijriDate();
    $scope.error = false;
}]);