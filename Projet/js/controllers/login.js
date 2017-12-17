angular.module('login-controller',[]).controller('loginController', function($scope,$cookies,$location,$http) {
  if($cookies.get("current")!=null)
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
        $scope.error = "nom d'utilisateur inexistant";
        $scope.username='';
        $scope.password='';
      }else{
        if(response.data.password == $scope.password){
          var d = Date.now()+1;
          $cookies.put("current",$scope.username,{"expires":d.toString()});
          $location.path('/home');
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
