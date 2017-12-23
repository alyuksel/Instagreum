angular.module("image-service",[]).factory('imageService', function($http){

	var user = {};
	user.sendImageByUser = function(username,data,success,error){
				$http.post("/api/register/image/"+username,data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(success,error);
		};

	user.getImagesByUser = function(username,success,error) {
				$http.get("/api/image/"+username).then(success,error);
		};
	return user;
});
