var app=angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
  .when('/home',{templateUrl:'views/home.html',controller:'homeController'})
  .when('/test',{templateUrl:'views/test.html',controller:'testController'})
  .when('/login',{templateUrl:'views/login.html',controller:'loginController'})
  .when('/create',{templateUrl:'views/createUser.html',controller:'createUserController'})
  .when('',{templateUrl:'views/main.html',controller:''})
  .otherwise({redirectTo:''});

});

app.controller('homeController', function($location,$rootScope,$scope) {
  if($rootScope.loggedUser == null){
    $location.path("/login");
  }
  $scope.text = "hello world";
});
app.controller('testController', function($scope) {

  $scope.text = "hello world";
});
app.controller('createUserController', function($scope,$location,$http) {
  $scope.username ="";
  $scope.name ="";
  $scope.firstname="";
  $scope.password="";
  $scope.password2="";
  $scope.birthdate="";
  $scope.mail="";
  $scope.error="";
  $scope.valid = function()
  {
    if($scope.password != $scope.password2){
      $scope.error="vos mots de passes sont differents";
    }else{
      var data = {
        username:$scope.username,
        name:$scope.name,
        firstname:$scope.firstname,
        birthdate:$scope.birthdate,
        password:sha256($scope.password),
        mail:$scope.mail
      };

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
      $http.post('/api/createUser', data, config);
    }
  }
});

app.controller('loginController',['$scope', function($scope) {
  $scope.password ='';
  $scope.username = '';
  $scope.hash = function(){
    $scope.password = sha256($scope.password);

  }
}]);
