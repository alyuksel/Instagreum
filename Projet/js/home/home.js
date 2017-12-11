angular.module('home-controller',[]).controller('homeController', function($location,$rootScope,$scope) {
    if($rootScope.loggedUser == null){
      $location.path("/login");
    }
    $scope.text = "hello world";
});
