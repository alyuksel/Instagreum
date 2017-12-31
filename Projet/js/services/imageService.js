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
	user.getAllImages = function(success,error){
				$http.get("/api/images").then(success,error);
	};

	user.deleteImage = function(username,image,success,error){
		$http.get("/api/images").then(success,error);
	}

	user.updateComment = function(user,image,success,error){
		console.log(image);
		var data = new FormData();
		data.append('comment',image.commentaire);
		$http.put("/api/images/comment/"+image.id,{"comment":image.commentaire}).then(success,error);
	};
	return user;
});
