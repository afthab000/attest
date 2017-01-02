app.controller('signupCtrl', ['$scope','$state', '$http', function ($scope, $state,$http) {


$scope.confirmFlag = false; 
$scope.signupError = false; 
    
var user = $scope.user;
    console.log(user);

$scope.addUser = function(user){
    console.log(user);

    
$http.post('./user/signup', {user}).then(function(){
    
})    
}
}]);
