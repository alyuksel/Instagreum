angular.module('home-controller',[]).controller('homeController', function($location,$cookies,$scope) {
    if($cookies.get("current") == null){
      $location.path("/login");
    }
    $scope.text = $cookies.get("current");
});
