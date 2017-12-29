angular.module('main-controller',[]).controller('mainController', function($location,$cookies,$scope,imageService) {
  if($cookies.get("current")==null){
    $location.path('/login');
  }else{
    imageService.getAllImages(function(res){
      $scope.images = res.data.map(function (item){
         return {user:item.username,mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data),id:item.id};
      });
  });
}
});
