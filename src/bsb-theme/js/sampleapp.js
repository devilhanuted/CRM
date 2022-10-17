var sampleapp = angular.module('sampleapp', ['rzTable']);
sampleapp.controller('samplectrl', function ($scope) {
    
   $scope.resizeMode = "OverflowResizer"

    $scope.table = undefined

    $scope.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
});