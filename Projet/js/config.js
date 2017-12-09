var app=angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
  .when('/home',{templateUrl:'views/home.html',controller:''})
  .when('/test',{templateUrl:'views/test.html',controller:''})
  .when('',{templateUrl:'views/main.html',controller:''})
  .otherwise({redirectTo:''});

});
