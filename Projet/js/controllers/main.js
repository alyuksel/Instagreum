angular.module('main-controller',[]).controller('mainController', function($location,$cookies,$scope) {
  $scope.disco='';
    if($cookies.get("current") != null){
       $scope.disco='Sign Out';
     }
    $scope.logout = function(){
      console.log("cookies"+$cookies.get("current"));
      $cookies.remove("current");
      $scope.disco='';
      $location.path('/test');
    }
});
