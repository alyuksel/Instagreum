angular.module("image-service",[]).factory('imageService', function($http){

	var img = {};
	img.sendImageByUser = function(username,data,success,error){
				$http.post("/api/register/image/"+username,data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(success,error);
		};

	img.getImagesByUser = function(username,success,error) {
				$http.get("/api/image/"+username).then(success,error);
		};
	img.getAllImages = function(success,error){
				$http.get("/api/images").then(success,error);
	};

	img.deleteImage = function(image,success,error){
		$http.get("/api/images/delete/"+image.id).then(success,error);
	}

	img.updateComment = function(user,image,success,error){
		var data = new FormData();
		data.append('comment',image.commentaire);
		$http.put("/api/images/comment/"+image.id,{"comment":image.commentaire}).then(success,error);
	};

	img.isLiked = function(username,success,error){
				$http.get("api/images/like/"+username).then(success,error);
	};

	img.likeImage = function(username,id,success,error){
			$http.put("/api/images/likes/"+id+"/"+username).then(success,error);
	};

	img.unlikeImage = function(username,id,success,error){
			$http.delete("/api/images/likes/"+id+"/"+username).then(success,error);
	};

	img.getComments = function(success,error){
			$http.get("api/images/comments").then(success,error);
	};

	img.addComment = function(data,success,error){
			$http.post("api/images/comments",data).then(success,error);
	};
	return img;
});
