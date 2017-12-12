var app=angular.module('myApp',['ngRoute','home-controller','createUser-controller','login-controller','test-controller']);
app.config(function($routeProvider){
  $routeProvider
  .when('/home',{templateUrl:'views/home.html',controller:'homeController'})
  .when('/test',{templateUrl:'views/test.html',controller:'testController'})
  .when('/login',{templateUrl:'views/login.html',controller:'loginController'})
  .when('/create',{templateUrl:'views/createUser.html',controller:'createUserController'})
  .when('',{templateUrl:'views/main.html',controller:''})
  .otherwise({redirectTo:''});

});
