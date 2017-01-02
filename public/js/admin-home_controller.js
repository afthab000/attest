app.controller('adminHomeCtrl', ['$scope', '$http', function ($scope, $http) {
    

    $http.get('./files/view').then(function(response){
        $scope.currentFiles =response.data;
    });
    
   
}]);