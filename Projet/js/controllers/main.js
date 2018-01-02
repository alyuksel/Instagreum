angular.module('main-controller',[]).controller('mainController', function($route,$location,$cookies,$scope,imageService) {
  $scope.disco = function(){
    return $cookies.get("current");
  }


    $scope.getAllImages = function(){
      imageService.getAllImages(function(res){
        $scope.images = res.data.map(function (item){
          return {user:item.username,mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data),
                  date:item.publicationDate,id:item.id,like:item.like,commentaire:item.commentaire,isLiked: false };
        });
      });
    }

    $scope.result='';
    $scope.com = '';
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

    $scope.addComment = function(pId){
      if($scope.com != ''){
        console.log($scope.com );
      var data = {username:currentUser,id:pId,comment:$scope.com};
      imageService.addComment(data,function(res){
        console.log(res);
      },function(err){
        console.log(err);
      });
      }
      $scope.com = '';
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
         imageService.addLike(currentUser,id,function(res){
           imageService.likeImage(currentUser,id,function(res){
             $scope.getAllImages();
             $scope.isLiked();
           });

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
