angular.module('main-controller',[]).controller('mainController', function($route,$location,$cookies,$scope,imageService) {
  $scope.disco = function(){
    return $cookies.get("current");
  }
    var currentUser = $cookies.get("current");
    imageService.getAllImages(function(res){
      $scope.images = res.data.map(function (item){
        return {user:item.username,mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data),
                date:item.publicationDate,id:item.id,like:item.like,commentaire:item.commentaire,isLiked: false };
      });
    });

    $scope.result='';
    imageService.isLiked(currentUser,function(res){
      $scope.result =  res.data;
    },function(err){
      $scope.result = [];
    });

    imageService.getComments(function(res){
      $scope.comments = res.data.map(function(item){
        return {username : item.username, id:item.photoId, comment:item.comment};
      });
    },function(err){
        console.log(err);
    });

    $scope.verify = function(id){
      var res = true;
      for(i of $scope.result){
        if(i.photoId == id) res = false;
      }
      return res;
    };

    $scope.like = function(id){
      imageService.likeImage(currentUser,id));
      $route.reload();
    };

    $scope.iscomment = function(idP,idC){
      return (idP == idC);
    }
});
