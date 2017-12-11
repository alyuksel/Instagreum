var app=angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
  .when('/home',{templateUrl:'views/home.html',controller:'homeController'})
  .when('/test',{templateUrl:'views/test.html',controller:'testController'})
  .when('/pres',{templateUrl:'views/pres.html',controller:'presController'})
  .when('',{templateUrl:'views/main.html',controller:''})
  .otherwise({redirectTo:''});

});

app.controller('homeController', function($scope) {

    $scope.text = "hello world";
});
app.controller('testController', function($scope) {

    $scope.text = "hello world";
});

//TODO: trouver un moyen de crypter le mot de passe entré avant de l'envoyer à l'api
app.controller('presController',['$scope', function($scope) {
     $scope.password ='';
     $scope.username = '';
     $scope.hash = function(){
      $scope.password = sha256($scope.password);

     }
}]);
