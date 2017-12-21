angular.module("user-service",[]).factory('userService', function($http){

	var user = {};
	user.getUserByUsername = function(username,success) {
        $http.get('/api/register/'+username).then(success);
    };
  user.createUser = function(data,success,error) {
        $http.post('/api/createUser', data).then(success,error);
    };
	user.getPasswordByUsername = function(username,success,error) {
				$http.get('/api/login/'+username).then(success,error);
	  };
	user.getImagesByUser = function(username,success,error) {
				$http.get("/api/getImage/"+username).then(success,error);
	  };

	return user;
});
