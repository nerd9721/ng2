var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap', 'angular-loading-bar']);

//todos.controller('todoCtrl', function ($scope, $http, $rootScope, $timeout, $dialogs){
todos.controller('todoCtrl', function ($scope, $http){

  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  
});
