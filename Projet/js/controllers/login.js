angular.module('login-controller',[]).controller('loginController', function($scope,$location,$rootScope,$http) {
  if($rootScope.loggedUser)
  {
    $location.path('/home');
  }
  $scope.password ='';
  $scope.username = '';
  $scope.error='';
  $scope.hash = function(){
    $scope.password = sha256($scope.password);
    var get = $http.get('/api/login/'+$scope.username);
    get.then(function(response)
    {
      if(response.status ==204){
        $scope.error = "nom d'utilisateur innexistant";
        $scope.username='';
        $scope.password='';
      }else{
        if(response.data.password == $scope.password){
          $rootScope.loggedUser=$scope.username;
          $location.path('/home');
        }else{
          $scope.error = "nom d'utilisateur ou mot de passe incorrectes";
          $scope.username='';
          $scope.password='';
        }
      }
    },function(response)
    {
      $scope.error = "le serveur ne répond pas réessayer plus tard";
      $scope.username='';
      $scope.password='';
    });

  }
});
