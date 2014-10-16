var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap']);

//todos.controller('todoCtrl', function ($scope, $http, $rootScope, $timeout, $dialogs){
todos.controller('todoCtrl', function ($scope, $http){
 
  $scope.word_container = [];
  $scope.word_btn = function(param0){

    if(param0 == 'add'){
      var len = $scope.word_container.length;

      var _index = len;
      
      var word_info = {};
      word_info.word = 'word' + _index;
      word_info.def = 'def' + _index;
      word_info.type = 'type' + _index;
      word_info.plural = 'plural' + _index;
      word_info.example = 'example' + _index;
      word_info.example_kor = 'example_kor' + _index;
      word_info.img_src = 'img_src' + _index;
      word_info.audio_src = 'audio_src' + _index;
      
      $scope.word_container.push(word_info);
    }
    else{
      $scope.word_container.pop();
    }
  };


  
  $scope.init = function(){
    $scope.word_btn('add');
  };

  $scope.init();
  

});








todos.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});


//퀴즈
todos.service("QuizService", function() {
  return new Quiz();
});

function Quiz() {
  this.score = 0;
  this.showScore = false;
  this.totalQuestions = 0;
  this.counter = 1;
  this.totalQuestions = 0;
  this.questionsAttempted = 0;
  this.correctAnswers = 0;
  this.displayAnswers = false;

  this.plusScore = function(value) {
    this.score += value;
    this.correctAnswers++;
  };
  this.minusScore = function(value) {
    this.score -= value;
    this.correctAnswers--;
  };
  this.displayScore = function() {
    this.showScore = true;
  };
  this.getCounter = function() {
    return this.counter++;
  };
  this.updateTotalQuestionsCount = function() {
    this.totalQuestions++;
  };
  this.updateQuestionsAttemptedCount = function() {
    this.questionsAttempted++;
  };
  this.updateCorrectQuestionsCount = function() {
    this.correctAnswers++;
  };
}


todos.directive("iquiz", function() {
  return {
    restrict : 'E',
    scope : {
      summary : '@'
    },
    controller : function($scope) {
    },
    templateUrl : '../quiz_assets/quiz.html'
  };
});

todos.directive("iscorecard", [ 'QuizService', function( QuizService ) {
  return {
    restrict : 'E',
    scope : {},
    controller : function($scope) {
      $scope.totalQuestions =  QuizService.totalQuestions;
      $scope.questionsAttempted =  QuizService.questionsAttempted;
      $scope.correctAnswers =  QuizService.correctAnswers;
      $scope.score =  QuizService.score;
      $scope.showscores = "";

      $scope.showAnswers = function() {
         QuizService.displayAnswers = true;
      }

      $scope.showScores = function() {
        $scope.showscores = true;
      }
    },
    link : function(scope, element, attrs) {
      scope.$watch(function() {
        return  QuizService.questionsAttempted;
      }, function() {
        scope.questionsAttempted =  QuizService.questionsAttempted;
      });
      scope.$watch(function() {
        return  QuizService.score;
      }, function() {
        scope.score =  QuizService.score;
      });
      scope.$watch(function() {
        return  QuizService.score;
      }, function() {
        scope.correctAnswers =  QuizService.correctAnswers;
      });
    },
    templateUrl : '../quiz_assets/scorecard.html'
  };
}]);

todos.directive("iquestion", [ 'QuizService', function( QuizService ) {
  return {
    restrict : 'E',
    scope : {
      text : '@',
    },
    controller : function($scope) {

      $scope.evalScore = function(id, value) {
        var rightAnswerFound = false, foundIndex = 0, i = 0, arrIndex;
        angular.forEach($scope.qna, function(qna) {
          if (qna.id === id) {
            arrIndex = i;
            angular.forEach(qna.options, function(option) {
              if (option.text === value
                  && option.correct === true) {
                rightAnswerFound = true;
              }
            });
          }
          i++;
        });
        if (rightAnswerFound === true) {
          QuizService.plusScore(1);
          $scope.qna[arrIndex].answeredCorrectly = true;
        } else {
          if ($scope.qna[arrIndex].answeredCorrectly === true) {
            QuizService.minusScore(1);
            $scope.qna[arrIndex].answeredCorrectly = false;
          }
        }
        if ($scope.qna[arrIndex].attempted === false) {
          $scope.qna[arrIndex].attempted = true;
          QuizService.updateQuestionsAttemptedCount();
        }
      };

    },
    link : function(scope, element, attrs) {
      // Update parent scope details
      //
      QuizService.updateTotalQuestionsCount();
      //
      //
      var text = scope.text;
      scope.qna = [];
      var qnaObj = new Object();
      qnaObj.id = QuizService.getCounter();
      qnaObj.tag = "q_" + qnaObj.id;
      qnaObj.answeredCorrectly = false;
      qnaObj.attempted = false;
      //
      // Processing the question and answer text
      //
      var qnaArr = text.split("::");
      qnaObj.question = "<b>Q: " + qnaArr[0] + "</b>";
      var ansArr = qnaArr[1].split(";");
      qnaObj.options = [];
      qnaObj.answers = [];
      for (i = 0; i < ansArr.length; i++) {
        var option = {
          "text" : ansArr[i],
          "correct" : false,
          "style" : ""
        };
        var optionText = option.text;
        if (optionText.indexOf("__") === 0) {
          option.text = optionText.substring(2, optionText.length);
          option.correct = true;
        }
        qnaObj.options.push(option);
      }
      scope.qna.push(qnaObj);
      
      scope.$watch(function() {
        return QuizService.displayAnswers;
      }, function() {
        angular.forEach(scope.qna, function(qna) {
          var i = 0;
          angular.forEach(qna.options, function(option) {
            if (option.correct === true
                && QuizService.displayAnswers === true) {
              qna.options[i].style = "background-color:#ffff00";
            }
            i++;
          });
        });
      });

    },
    templateUrl : '../quiz_assets/question.html'
  };
}]);
