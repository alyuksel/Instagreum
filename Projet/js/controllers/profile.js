angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,userService,imageService) {
  $scope.getProfileImages = function(){
    imageService.getImagesByUser(currentUser,function(res){
      $scope.images = res.data.map(function (item){
         return {mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data)};
      });
    },
    function(res){
      console.log("BOOOO");
    });
  }
  if($cookies.get("current") == null){
    $location.path("/login");
  }else{
    var currentUser = $cookies.get("current");
    $scope.user=currentUser;
    $scope.getProfileImages();
  }
  $scope.uploadFile = function(){
    var file = new FormData();
    console.log($scope.img);
    file.append('img',$scope.img);
    console.log(file);
    imageService.sendImageByUser($scope.user,file,function(res){
      $scope.getProfileImages();
      console.log("succes");
    },
    function(){
      console.log("echec");
    });
  };

});
