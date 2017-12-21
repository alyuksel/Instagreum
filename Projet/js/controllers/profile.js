angular.module('profile-controller',[]).controller('profileController', function($location,$cookies,$scope,$sce,$http) {
    if($cookies.get("current") == null){
      $location.path("/login");
    }

    var currentUser = $cookies.get("current");
    $scope.user=currentUser;
    var get = $http.get("/api/getImage/"+currentUser);
    get.then(function(res)
    {

      console.log(res);
      $scope.mimetype=  res.data.img.contentType;
      console.log($scope.mimetype);
      $scope.data = _arrayBufferToBase64(res.data.img.data.data);


    },
    function(res){
      console.log("BOOOO");
    });

});
function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}
