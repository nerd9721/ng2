var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap', 'infinite-scroll']);

//todos.controller('todoCtrl', function ($scope, $http, $rootScope, $timeout, $dialogs){
todos.controller('todoCtrl', function ($scope, $http){

  // 제목
  $scope.title = 'Peppa Pig Shopping'
    
  $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
   
});
