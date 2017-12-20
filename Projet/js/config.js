var app=angular.module('myApp',['ngRoute','ngCookies','main-controller','profile-controller','createUser-controller','login-controller','user-service']);
app.config(function($routeProvider){
  $routeProvider
  .when('/profile',{templateUrl:'views/profile.html',controller:'profileController'})
  .when('/login',{templateUrl:'views/login.html',controller:'loginController'})
  .when('/create',{templateUrl:'views/createUser.html',controller:'createUserController'})
  .when('',{templateUrl:'views/main.html',controller:''})
  .otherwise({redirectTo:''});

});
