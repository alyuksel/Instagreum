var app=angular.module('myApp',['ngRoute','home-controller']);
app.config(function($routeProvider){
  $routeProvider
  .when('/home',{templateUrl:'views/home.html',controller:'homeController'})
  .when('/test',{templateUrl:'views/test.html',controller:'testController'})
  .when('/login',{templateUrl:'views/login.html',controller:'loginController'})
  .when('/create',{templateUrl:'views/createUser.html',controller:'createUserController'})
  .when('',{templateUrl:'views/main.html',controller:''})
  .otherwise({redirectTo:''});

});

app.controller('testController', function($scope) {

    $scope.text = "hello world";
});
app.controller('createUserController', function($scope) {


});

app.controller('loginController',['$scope', function($scope) {
     $scope.password ='';
     $scope.username = '';
     $scope.hash = function(){
      $scope.password = sha256($scope.password);

     }
}]);
