
//var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap', 'infinite-scroll', 'ngRoute']);
var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap', 'infinite-scroll']);
/*
 todos.config(function ($routeProvider, $locationProvider) {
 //configure the routing rules here
 $routeProvider.when('/videoquiz', {
 controller: 'todoCtrl'
 });

 //routing DOESN'T work without html5Mode
 $locationProvider.html5Mode(true);
 });
 */
//todos.controller('todoCtrl', function ($scope, $http, $rootScope, $timeout, $dialogs){
//todos.controller('todoCtrl', function ($scope, $http, $routeParams, $route, $location){
todos.controller('todoCtrl', function ($scope, $http, $location){
  /*
   $scope.$on('$routeChangeSuccess', function () {
   alert($routeParams.lv);
   });
   */
  
  // 제목

  $scope.level = 'lv0';
  $scope.videoquiz_info_container = [];
  
  $scope.init_done = false;
  $scope.is_requesting_next = false;
  $scope.scroll_busy = false;

  var DEFAULT_REQUEST_CNT = 10;

  var reqPromise;
  $scope.init = function(){

    var tmp = getJsonFromUrl();
    //alert(tmp['lv']);
    //var searchObject = $location.search();
    if(tmp['lv'] == 'lv1'){
      $scope.level = 'lv1';
      $scope.nav_level = "Beginner";
      reqPromise = $http.get("/get_videoquiz_title?lv=lv1&begin_cnt=0");
    }
    else if(tmp['lv'] == 'lv2'){
      $scope.level = 'lv2';
      $scope.nav_level = "Intermediate";
      reqPromise = $http.get("/get_videoquiz_title?lv=lv2&begin_cnt=0");
    }
    else if(tmp['lv'] == 'lv3'){
      $scope.level = 'lv3';
      $scope.nav_level = "Advanced";
      reqPromise = $http.get("/get_videoquiz_title?lv=lv3&begin_cnt=0");
    }
    else{
      //$scope.level = 'lv1';
      //reqPromise = $http.get("/get_videoquiz_title?lv=lv1&begin_cnt=0");
      alert('wrong argument');
    }
    
  };
     

  if(!$scope.init_done){
    $scope.init_done = true;
    $scope.init();
  }
  
  reqPromise.success( function(body, status, headers,config){
    var data = body;

    if(data.length >= DEFAULT_REQUEST_CNT){
      $scope.is_requesting_next = true;
    }
    else{
      $scope.is_requesting_next = false;
    }
    
    for(var i=0; i<data.length; i++){
      //alert(data[i].updated_date);
      //alert(data[i].title);
      //alert(data[i].poster_src);

      var temp = {};
      temp.title = data[i].title;
      temp.poster_src = '/res/videoquiz/' + $scope.level + '/' + temp.title + '/' + data[i].poster_src;
      //alert(temp.poster_src);
      temp.updated_date = data[i].updated_date;
      temp.href = '/videoquiz/content?lv=' + $scope.level + '&title=' + temp.title;

      temp.duration = data[i].duration;
      
      $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
            $scope.videoquiz_info_container.push(temp);
    }

    
    $scope.scroll_busy = false;
  });
  reqPromise.error( function(data, status, headers,config){
    alert('error from get_data');
  });
  

  $scope.load_more = function(){

    if(!$scope.is_requesting_next){
      return;
    }
    
    if ($scope.scroll_busy)
      return;
    
    $scope.scroll_busy = true;
    
    //alert('called loadmore');
    
    reqPromise = $http.get("/get_videoquiz_title?lv="  + $scope.level + "&begin_cnt=" + $scope.videoquiz_info_container.length.toString());

    reqPromise.success( function(body, status, headers,config){
      var data = body;
      for(var i=0; i<data.length; i++){
	//alert(data[i].updated_date);
	//alert(data[i].title);
	//alert(data[i].poster_src);
	
	for(var j=0; j<10; j++){
	  $scope.videoquiz_info_container.push(data[i]);
	}
	
      }
      
      $scope.scroll_busy = false;
    });
    reqPromise.error( function(data, status, headers,config){
      alert('error from get_data');
    });

  };
});


function getJsonFromUrl() {
  //return 2+3;
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
  
}
   
