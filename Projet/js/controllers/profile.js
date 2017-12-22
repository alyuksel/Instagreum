angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,userService,imageService) {
  if($cookies.get("current") == null){
    $location.path("/login");
  }else{

    var currentUser = $cookies.get("current");
    $scope.user=currentUser;
    imageService.getImagesByUser(currentUser,function(res){
      $scope.images = res.data.map(function (item){
         return {mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data)};
      });

    },
    function(res){
      console.log("BOOOO");
    });
    $scope.uploadFile = function(){
      var file = $scope.img;
      console.log($scope.img);
      imageService.sendImageByUser($scope.user,$scope.img,function(res){
        console.log("succes");
      },
      function(){
        console.log("echec");
      });
    };

  }
});
