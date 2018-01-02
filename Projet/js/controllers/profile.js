angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,userService,imageService) {

  $scope.serverResponse={};
  $scope.isEditMode = false;
  $scope.setServerLabel = function(isSucces, message){
    $scope.serverResponse.isSuccess = isSucces;
    $scope.serverResponse.message = message;
  }
  $scope.editionMessage = function(){
    return $scope.isEditMode ? "Valider" : "Edition";
  }

  $scope.changeMode = function(){
    $scope.serverResponse={};
    $scope.isEditMode = !$scope.isEditMode;
  }

  $scope.getProfileImages = function(){
    imageService.getImagesByUser(currentUser,function(res){
      $scope.images = {};
      angular.forEach(res.data, function(item) {
        $scope.images[item.id] = serverDataToImg(item);
    });
    },
    function(res){
      $scope.setServerLabel(false,"Erreur lors du chargement des images");
    });
  }

  $scope.deleteImage = function(image){
    imageService.deleteImage(image, function(){
      delete $scope.images[image.id];
      $scope.setServerLabel(true,"Image Supprimé");
    },function(err){
      $scope.setServerLabel(false,"Erreur de suppression de l'image");
    });
  }

  $scope.uploadImage = function(){
    var file = new FormData();
    file.append('img',$scope.img);
    imageService.sendImageByUser($scope.user,file,function(res){
      $scope.setServerLabel(true,"Fichier téléchargé");
      $scope.images[res.data.id] = serverDataToImg(res.data);
    },
    function(){
      $scope.setServerLabel(false,"Echec du transfert de fichier");
    });
  };

  $scope.updateComment = function(img){
    imageService.updateComment($scope.user,img,function(res){
      $scope.images[res.data.id].commentaire = res.data.commentaire;
    },
  function(err){
    $scope.setServerLabel(false,"Echec mise a jour description");
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
