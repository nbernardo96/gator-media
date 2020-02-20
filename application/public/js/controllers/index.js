angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    'use strict';
    $scope.global = Global;
}]);