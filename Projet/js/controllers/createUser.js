angular.module('createUser-controller',[]).controller('createUserController', function($scope,$location,$http) {
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
      var data = JSON.stringify({
        username:$scope.username,
        name:$scope.name,
        firstname:$scope.firstname,
        birthdate:$scope.birthdate,
        password:sha256($scope.password),
        mail:$scope.mail
      });
      var username = $scope.username;
      var get = $http.get('/api/login/'+username, data);
      get.then(function(response){

        var post = $http.post('/api/createUser', data);
        post.then(function(response){
           $location.path('/login');
        },function(response){
            $scope.error="erreur dans la saisies des informations";
        });
      },function(response){
          $scope.error="erreur dans la saisies des informations";
      });
    }
  }
});
