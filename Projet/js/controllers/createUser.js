angular.module('createUser-controller',[]).controller('createUserController', function($scope,$location,$http) {
    $scope.username ="";
    $scope.name ="";
    $scope.firstname="";
    $scope.password="";
    $scope.password2="";
    $scope.birthdate="";
    $scope.mail="";
    $scope.errors=[];

    //FIELDS CONTROLS

    function removeError(error){
      if(error in $scope.errors){
          delete $scope.errors[error];
      }
    }

    $scope.checkErrors=function(){
      var isAllFilled = $scope.username && $scope.name && $scope.firstname && $scope.password
      && $scope.password2 && $scope.birthdate && $scope.mail;
      var isAnyError = Object.keys($scope.errors).length > 0;
      return isAllFilled && !isAnyError;
    }

    $scope.checkPasswords=function(){
      if($scope.password){
        if($scope.password.length<8){
            $scope.errors["password"] = "Votre mot de passe doit contenir au moins 8 caractères";
        }else removeError("password");
        if($scope.password2 && $scope.password2!=$scope.password){
          $scope.errors["password2"] = "Vos mot de passe sont differents";
        }else removeError("password2");
      }
    }
    $scope.checkEmail = function(){
      if(!$scope.mail){
        $scope.errors["email"] = "Adresse mail invalide";
      }else {
        removeError("email");
      }
    }

    //OTHER FUNCTIONS

    $scope.valid = function()
    {
        var data = JSON.stringify({
          username:$scope.username,
          name:$scope.name,
          firstname:$scope.firstname,
          birthdate:$scope.birthdate,
          password:sha256($scope.password),
          mail:$scope.mail
        });
        var username = $scope.username;
        var get = $http.get('/api/login/'+username, data);
        get.then(function(response){

          var post = $http.post('/api/createUser', data);
          post.then(function(response){
             $location.path('/login');
          },function(response){
              $scope.error="erreur dans la saisies des informations";
          });
        }
      );

}
});
