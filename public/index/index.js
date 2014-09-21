var todos = angular.module('todos', ['ngSanitize', 'ui.bootstrap']);

//todos.controller('todoCtrl', function ($scope, $http, $rootScope, $timeout, $dialogs){
todos.controller('todoCtrl', function ($scope, $http){
  
  
  // 제목
  $scope.title = 'Peppa Pig Shopping'
    
  // 비디오 관련 
  $scope.video_src = 'video/beginning/0_peppa_pig/peppa_pig.mp4';
  $scope.video_subtitle_src = 'video/beginning/0_peppa_pig/peppa_pig.vtt';
  
  // 단어
  $scope.oneAtATimeWord = true;
  $scope.oneAtATime = false;

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.words = [ {title: 'Dinasour',  contents: [{ type:'Noun(명사)', meaning: '공룡', example: 'A special exhibition called Discovering Dinosaur Expo is being held there.', example_kor:'찾아가는 공룡 엑스포 라고 불리는 매우 특별한 전시회 가 그 곳 에서 열리고 있습니다.'}] }, 
                   {title: 'Dinasour2',  contents: [{ type:'Noun(명사)2', meaning: '공룡2', example: 'A special exhibition called Discovering Dinosaur Expo is being held there.', example_kor:'찾아가는 공룡 엑스포 라고 불리는 매우 특별한 전시회 가 그 곳 에서 열리고 있습니다.'}] }, 
                   {title: 'Dinasour3',  contents: [{ type:'Noun(명사)3', meaning: '공룡3', example: 'A special exhibition called Discovering Dinosaur Expo is being held there.', example_kor:'찾아가는 공룡 엑스포 라고 불리는 매우 특별한 전시회 가 그 곳 에서 열리고 있습니다.'}] }]
  
  // 예제
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
    templateUrl : 'quiz_assets/quiz.html'
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
    templateUrl : 'quiz_assets/scorecard.html'
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
    templateUrl : 'quiz_assets/question.html'
  };
}]);