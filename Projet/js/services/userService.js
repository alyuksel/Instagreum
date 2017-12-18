angular.module("user-service",[]).factory('userService', function($http){

	var user = {};
	user.getUserByUsername = function(username,success) {
        $http.get('/api/register/'+username).then(success);
    };
  user.createUser = function(data,success,error) {
        $http.post('/api/createUser', data).then(success,error);
    };
	return user;
});
