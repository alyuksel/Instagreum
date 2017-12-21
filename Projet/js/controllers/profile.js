angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,userService) {
    if($cookies.get("current") == null){
      $location.path("/login");
    }else{

    var currentUser = $cookies.get("current");
    $scope.user=currentUser;
    userService.getImagesByUser(currentUser,function(res){
      console.log(res);
      $scope.mimetype = res.data.img.contentType;
      console.log($scope.mimetype);
      $scope.data = _arrayBufferToBase64(res.data.img.data.data);
    },
    function(res){
      console.log("BOOOO");
    });
}
});
