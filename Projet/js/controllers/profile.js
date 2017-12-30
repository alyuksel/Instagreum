angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,userService,imageService) {

  $scope.isEditMode = false;

  $scope.getProfileImages = function(){
    imageService.getImagesByUser(currentUser,function(res){
      $scope.images = res.data.map(function (item){
         return {id:item.id, mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data),
                  date:item.publicationDate,like:item.like,commentaire:item.commentaire};
      });
    },
    function(res){
      console.log("BOOOO");
    });
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

  $scope.changeMode = function(){
    $scope.isEditMode = !$scope.isEditMode;
    console.log($scope.isEditMode);
  }

  $scope.updateComment = function(img){
    imageService.updateComment($scope.user,img,function(res){
      location.reload();
      console.log("commentaire mis a jour");
    },
  function(err){
    console.log("echec commentaire");
  });
  }

  //DEBUT
  if($cookies.get("current") == null){
    $location.path("/login");
  }else{
    var currentUser = $cookies.get("current");
    $scope.user=currentUser;
    $scope.getProfileImages();
  }




});
