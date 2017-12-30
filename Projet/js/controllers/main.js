angular.module('main-controller',[]).controller('mainController', function($route,$location,$cookies,$scope,imageService) {
  if($cookies.get("current")==null){
    $location.path('/login');
  }else{
    var currentUser = $cookies.get("current");
    imageService.getAllImages(function(res){
      $scope.images = res.data.map(function (item){
         return {user:item.username,mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data),id:item.id};
      });
  });
 $scope.result='';
 imageService.isLiked(currentUser,function(res){
      $scope.result =  res.data;
  },function(err){
      $scope.result = [];
  });

  $scope.verify = function(id){
    var res = true;
    for(i of $scope.result){
      if(i.photoId == id) res = false;
    }
    return res;
  }

  $scope.like = function(id){
    imageService.likeImage(currentUser,id,function(res){
        console.log(res);
    },function(err){
        console.log("erreur");
    },function(res){
      console.log(res);
    });
    $route.reload();
  }
}
});
