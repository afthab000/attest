app.controller('loginCtrl', ['$scope','$state', '$http', function ($scope, $state,$http) {
    
    $scope.alert = true;
    
     console.log("Inside LOGIN Controller")

  

    $scope.loginSubmit = function(user){
       
        $http.post('./user/login', {user}).then(function(response){
            
        var logUser = response.data;
         console.log(response);   
            
            if(logUser.role == "user" ){
            $state.go("userHome", user);
            }
        
            else if(logUser.role == "admin"){
            $state.go("adminHome");
            }
        
            else{
             $scope.alert = false;
            }
            
            })
    }
}]);

