/**
 * Created by Fathalian on 11/10/14.
 */
'use strict';

var app = angular.module('nestorApp');

app.controller('LoadInfrastructure', ['$scope', '$rootScope', '$modalInstance', '$timeout', 'Constants',
  function ($scope, $rootScope, $modalInstance, $timeout, Constants) {

    $scope.loadInfraFromAWS = function () {
      $timeout(function () {
        $modalInstance.close(Constants.infra);
      }, 1500);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }]);


app.controller('CodeGenCtrl', ['$scope', '$rootScope', '$modalInstance', '$timeout',
  function ($scope, $rootScope, $modalInstance, $timeout) {

    $scope.downloadReady = false;
    $scope.ok = function () {

      if ($scope.downloadReady) {
        $modalInstance.close();
      }
      else {
        $timeout(function () {
          $scope.downloadReady = true;
        }, 1000);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);


app.controller('OptimizeCtrl', ['$scope', '$rootScope', '$modalInstance', '$timeout', 'component','Constants',
  function ($scope, $rootScope, $modalInstance, $timeout, component, Constants) {

    //using an object to avoid ng-repeats scope creation of another variable
    $scope.activeReserved = {selectedIndex: 'none', selectedMonth: 12};
    $scope.shouldShowDiagram = false;
    $scope.componentName = component.name;
    $scope.labels = Constants.labels;
    $scope.monthsOfYear = Constants.monthsOfYear;

    $scope.series = Constants.series;
    $scope.dataCpu = Constants.dataCpu;
    $scope.dataRam = Constants.dataRam;
    $scope.colours = Constants.colours;

    $scope.ramSeries = Constants.ramSeries;
    $scope.ramColours = Constants.ramColours;

    $scope.reservedInstances = Constants.reservedInstances;

    $scope.memoryInit = function() {
      $scope.showMemory = true;
    }
    $scope.cpuInit = function() {
      $scope.showCPU = true;
    };

    //39
    var t2MediumPriceBase = 37.44;
    $scope.t2MediumPrices = _.map(_.range(1, 13), function (num) {
      return num * t2MediumPriceBase;
    });


    //12 months	$0.043	$0.024	$168.0	Amazon
    $scope.compareData = [$scope.t2MediumPrices, $scope.currentModelPrices];
    $scope.compareSeries = ['On-Demand', 'Reserved'];

    $scope.compareColors = Constants.compareColors;

    $scope.reservedSelected = function (instance) {

      //each month is around 730 hors
      var prepaid = instance.upfront;
      var currentModelPriceBase = instance.hourly * 730;
      $scope.currentModelPrices = _.map(_.range(1, 13), function (num) {
        return prepaid + num * currentModelPriceBase;
      });

      var intersection = findIntersection(0, 1, $scope.t2MediumPrices[0], $scope.t2MediumPrices[1],
        0, 1, $scope.currentModelPrices[0], $scope.currentModelPrices[1]);

      $scope.intersectionPoint = Math.ceil(intersection * 30);

      $scope.compareData[1] = $scope.currentModelPrices;

      $scope.calculateSavings();
    };

    $scope.calculateSavings = function () {

      $scope.activeReserved.totalSavings = Math.ceil($scope.t2MediumPrices[$scope.activeReserved.selectedMonth - 1] - $scope.currentModelPrices[$scope.activeReserved.selectedMonth - 1]);
      $scope.activeReserved.saveLose = $scope.activeReserved.totalSavings >= 0 ? 'save' : 'lose';
      $scope.activeReserved.totalSavings = Math.abs($scope.activeReserved.totalSavings);
    };

    //finds the x interestction of two lines given four points
    function findIntersection(x1, x2, y1, y2, xx1, xx2, yy1, yy2) {

      var m = (y2 - y1) / (x2 - x1);
      var mm = (yy2 - yy1) / (xx2 - xx1);
      //I did the math on the paper :D
      return ( (m * x1) - y1 - (mm * xx1) + yy1) / (m - mm);
    }

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.downloadReady = false;
    $scope.ok = function () {

      if ($scope.downloadReady) {
        $modalInstance.close();
      }
      else {
        $timeout(function () {
          $scope.downloadReady = true;
        }, 1000);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
