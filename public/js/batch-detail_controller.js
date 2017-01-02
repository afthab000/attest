app.controller('batchDetailCtrl', ['$scope', '$http', function ($scope, $http) {
    
     $http.get('./files').then(function(response){
        $scope.files =response.data;
    });
  
    
    $scope.addBatchRow = function(){
        $scope.files.push({
            id: 1
            , name: 'Name'
            , duedate: "25/12/2016"
            , notary: true,
            mha: true,
            mea: false,
            consulateType: "None",
            remarks:""
        })
    }

$scope.modifyArray = [];
$scope.viewArray = [];
    
			$scope.modify = function(item){
                var index = $scope.files.indexOf(item);
				$scope.modifyArray[index] = true;
				$scope.viewArray[index] = true;
			};


			$scope.update = function(item){
                var index = $scope.files.indexOf(item);
				$scope.modifyArray[index] = false;
				$scope.viewArray[index] = false;
			};
    
 $scope.removeRow = function (idx) {
                $scope.files.splice(idx, 1);
            };





		}]);


    
		