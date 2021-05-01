import {unitData} from "./unitData.js";

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
  
// Start file download.
download("hello.txt",JSON.stringify(unitData));

var app = angular.module("myConversionApp", []);
app.controller("myCtrl", function ($scope) {
    //functions
    //load units type
    $scope.loadUnits = function () {
        $scope.units = Object.keys(unitData[$scope.unitType]);
        $scope.unitFrom = $scope.units[0];
        $scope.otherUnits = {};
        $scope.fetchOtherUnits();
    }

    //load to table
    $scope.fetchOtherUnits = function () {
        if ($scope.unitFrom === undefined) {
            console.log("No unit is selected yet");
        } else {
            $scope.otherUnits = unitData[$scope.unitType];
        }
    }

    //calculate conversion
    $scope.calculate = function (x) {
        if (x["multiplier"] === undefined) {
            x["multiplier"] = 1;
        };
        if (x["offset"] === undefined) {
            x["offset"] = 0;
        };

        if ($scope.otherUnits[$scope.unitFrom]["multiplier"] === undefined) {
            $scope.otherUnits[$scope.unitFrom]["multiplier"] = 1;
        }
        if ($scope.otherUnits[$scope.unitFrom]["offset"] === undefined) {
            $scope.otherUnits[$scope.unitFrom]["offset"] = 0;
        }

        return (((($scope.valueFrom - $scope.otherUnits[$scope.unitFrom]["offset"]) * $scope.otherUnits[$scope.unitFrom]["multiplier"]) / x["multiplier"]) + x["offset"]).toFixed(5);
    }

    //defs
    $scope.unitTypes = Object.keys(unitData);
    $scope.unitType = $scope.unitTypes[0]
    $scope.valueFrom = 1;
    $scope.otherUnits = {};
    $scope.loadUnits();
});