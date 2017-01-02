
app.controller('userHomeCtrl', [ '$scope','$http',  function ($scope, $http) {
    
     $http.get('./files/view').then(function(response){
         console.log(response.data.files);
        $scope.currentFiles =response.data.files;
    });
     
    

    $scope.pending = function(file) {
        return (file.parent.toLowerCase()==='pending_files')
    };
    
    $scope.saved = function(file) {
    return (file.parent.toLowerCase()==='saved_files')
    };
    
    $scope.received = function(file) {
    return (file.parent.toLowerCase()==='received_files')
    };


    
    
}]);