var app=angular.module('myApp',['ngRoute','ngCookies','main-controller','profile-controller','createUser-controller','login-controller','user-service','image-service','upload-directive']);
app.config(function($routeProvider){
  $routeProvider
  .when('/profile',{templateUrl:'views/profile.html',controller:'profileController'})
  .when('/login',{templateUrl:'views/login.html',controller:'loginController'})
  .when('/create',{templateUrl:'views/createUser.html',controller:'createUserController'})
  .when('/main',{templateUrl:'views/main.html',controller:'mainController'})
  .otherwise({redirectTo:'/main'});

});
app.controller('appController', function($location,$cookies,$scope,$route) {
  $scope.disco = function(){
    return $cookies.get("current");
  }
    $scope.logout = function(){
      $cookies.remove("current");
      $route.reload();
    }
});
