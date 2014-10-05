var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap', 'infinite-scroll']);

//todos.controller('todoCtrl', function ($scope, $http, $rootScope, $timeout, $dialogs){
todos.controller('todoCtrl', function ($scope, $http){

  // 제목
  $scope.title = 'Peppa Pig Shopping'
    
  $scope.videoquiz_info_container = [];

  $scope.init = function(){

    for(var i=0; i<10; i++){
      $scope.videoquiz_info_container.push( {
	title:'happy: ' + i.toString(),
	time: '2014/09/30',
	pic: 'http://somewhere.com/pic.jpg'
      } );
    }
  };
  
  $scope.init();
  
  $scope.loadMore = function() {

    var begin_pos = $scope.videoquiz_info_container.length;
    //alert(begin_pos);
    
    for(var i=begin_pos; i<begin_pos+10; i++){

      var _img_url = '';
      
      if(i%2==0)
      {
	_img_url = "http://templateninja.net/themes/jessica/img/jessica-background-about.jp";
      }
      else
      {
	_img_url = "http://camendesign.com/code/video_for_everybody/poster.jp";
      }

      
      $scope.videoquiz_info_container.push( {
	title:'happy: ' + i.toString(),
	upload_date: '2014/09/30',
	img_url : _img_url
      });
    }
  };

  

  
   
});
