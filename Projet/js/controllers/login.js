angular.module('login-controller',[]).controller('loginController',['$scope', function($scope) {
  $scope.password ='';
  $scope.username = '';
  $scope.hash = function(){
    $scope.password = sha256($scope.password);


  }
}]);
