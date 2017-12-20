angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,$http) {
    if($cookies.get("current") == null){
      $location.path("/login");
    }

    $scope.mimetype='';

    var currentUser = $cookies.get("current");
    $scope.user=currentUser;
    var get = $http.get("/api/getImage/"+currentUser);
    get.then(function(res)
    {
      console.log(res);
      $scope.mimetype=  res.data.img.contentType;
      $scope.data = res.data.img.data.data;
      // var file = new Blob([btoa(res.data.img.data.data)],{type : res.data.img.contentType});
      // console.log(file);
      // url = URL.createObjectURL(file);
      // $scope.data = $sce.trustAsResourceUrl(url);

    },
    function(res){
      console.log(res);
    });

});
