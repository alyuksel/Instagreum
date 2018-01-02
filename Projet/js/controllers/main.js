angular.module('main-controller',[]).controller('mainController', function($route,$location,$cookies,$scope,imageService) {
  $scope.disco = function(){
    return $cookies.get("current");
  }


    $scope.getAllImages = function(){
      imageService.getAllImages(function(res){
        $scope.images = {};
        angular.forEach(res.data, function(item) {
          $scope.images[item.id] = serverDataToImg(item);
      });
      });
    }

    $scope.result='';
    $scope.isLiked = function(){
      imageService.isLiked(currentUser,function(res){
        $scope.result =  res.data;
      },function(err){
        $scope.result = [];
      });
    }

    $scope.getComments =function() {
      imageService.getComments(function(res){
        $scope.comments = res.data.map(function(item){
          return {username : item.username, id:item.photoId, comment:item.comment};
        });
      },function(err){
          console.log(err);
      });
    }

    $scope.verify = function(id){
      var res = true;
      for(i of $scope.result){
        if(i.photoId == id) res = false;
      }
      return res;
    };

    $scope.like = function(id){
       if($scope.verify(id)){
         imageService.likeImage(currentUser,id,function(res){
           $scope.images[res.data.id].like = res.data.like;
           $scope.isLiked();
         },function(err){
           console.log("erreur");
         });
       }
    };

    $scope.iscomment = function(idP,idC){
      return (idP == idC);
    }

    //DEBUT
    var currentUser = $cookies.get("current");
    $scope.getAllImages();
    $scope.isLiked();
    $scope.getComments();

});
