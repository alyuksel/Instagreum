angular.module('login-controller',[]).controller('loginController', function($scope,$cookies,$location,$http) {
  if($cookies.get("current")!=null)
  {
    $location.path('/profile');
  }
  $scope.password ='';
  $scope.username = '';
  $scope.error='';
  $scope.hash = function(){
    var pass = $scope.password;
    pass = sha256(pass);
    var get = $http.get('/api/login/'+$scope.username);
    get.then(function(response)
    {
      if(response.status ==204){
        $scope.error = "nom d'utilisateur inexistant";
        $scope.username='';
        $scope.password='';
      }else{
        if(response.data.password == pass){
          var d = Date.now()+1;
          $cookies.put("current",$scope.username,{"expires":d.toString()});
          $location.path('/profile');
        }else{
          $scope.error = "nom d'utilisateur ou mot de passe incorrects";
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
